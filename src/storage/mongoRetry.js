const TRANSIENT_NAMES = new Set([
  "MongoNetworkError",
  "MongoNetworkTimeoutError",
  "MongoServerSelectionError",
  "MongoTopologyClosedError",
  "MongooseServerSelectionError",
]);

export function isTransientMongoError(error) {
  if (!error) return false;
  if (TRANSIENT_NAMES.has(error.name)) return true;
  if ([6, 7, 89, 91, 189, 262, 9001].includes(Number(error.code))) return true;
  return /EAI_AGAIN|ECONNRESET|ECONNREFUSED|ETIMEDOUT|server selection|buffering timed out|connection.*closed|topology.*closed/i
    .test(String(error.message || error));
}

export async function withMongoRetry(operation, {
  attempts = 5,
  baseDelayMs = 1_000,
  maxDelayMs = 30_000,
  sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds)),
  onRetry = () => {},
} = {}) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await operation(attempt);
    } catch (error) {
      lastError = error;
      if (!isTransientMongoError(error) || attempt >= attempts) throw error;
      const delayMs = Math.min(maxDelayMs, baseDelayMs * (2 ** (attempt - 1)));
      await onRetry({ attempt, nextAttempt: attempt + 1, delayMs, error });
      await sleep(delayMs);
    }
  }
  throw lastError;
}
