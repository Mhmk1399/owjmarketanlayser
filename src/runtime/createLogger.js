import { config } from "../config.js";
import { StructuredLogger } from "../logging/logger.js";

export async function createLogger(role = config.processRole) {
  const logger = new StructuredLogger({
    file: config.logToFile ? config.paths.logFile : null,
    level: config.logLevel,
    maxBytes: config.retention.maxLogBytes,
    archives: config.retention.logArchives,
    processRole: role,
  });
  await logger.init();
  return logger;
}
