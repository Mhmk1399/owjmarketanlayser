import "dotenv/config";
import mongoose from "mongoose";
import { config } from "../src/config.js";
import { buildBuyerMongoFilter, normalizeBuyerMatchRequest } from "../src/search/buyerMatcher.js";

if (!config.mongoUri) throw new Error("MONGODB_URI is required");
const requirement = normalizeBuyerMatchRequest({
  transactionType: "buy",
  propertyTypes: ["buy-residential-apartment"],
  locations: process.argv.slice(2).filter((value) => !value.startsWith("--")),
  minArea: 70,
  maxArea: 150,
  minRooms: 2,
});

await mongoose.connect(config.mongoUri, {
  dbName: config.mongoDbName,
  autoIndex: false,
  serverSelectionTimeoutMS: 30_000,
});
try {
  const explanation = await mongoose.connection.collection("listings")
    .find(buildBuyerMongoFilter(requirement), {
      projection: { token: 1, neighborhood: 1, "pricing.price": 1, "property.area": 1 },
      sort: { lastSeenAt: -1, token: 1 },
      limit: 30,
      maxTimeMS: config.search.queryMaxTimeMs,
    }).explain("executionStats");
  const stats = explanation.executionStats;
  process.stdout.write(`${JSON.stringify({
    requirement,
    executionTimeMillis: stats.executionTimeMillis,
    totalKeysExamined: stats.totalKeysExamined,
    totalDocsExamined: stats.totalDocsExamined,
    returned: stats.nReturned,
    examinedPerReturned: stats.nReturned ? Number((stats.totalDocsExamined / stats.nReturned).toFixed(2)) : null,
    winningPlan: explanation.queryPlanner.winningPlan,
  }, null, 2)}\n`);
} finally {
  await mongoose.disconnect();
}
