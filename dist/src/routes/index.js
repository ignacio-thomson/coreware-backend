"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Root router
 * In charge of handling redirections and determines which route will follow a request.
 */
const express_1 = __importDefault(require("express"));
const logger_1 = require("../utils/logger");
const ComponentsRouter_1 = __importDefault(require("./ComponentsRouter"));
const WarehousesRouter_1 = __importDefault(require("./WarehousesRouter"));
const DistributorsRoutes_1 = __importDefault(require("./DistributorsRoutes"));
// Generate the server instance
const server = (0, express_1.default)();
// Generate a router instance
const rootRouter = express_1.default.Router();
// Get base URL
rootRouter.get("/", (req, res) => {
    (0, logger_1.LogInfo)("GET: http://localhost:8000/api");
    res.send("Welcome to my API RESTful, Coreware.");
});
server.use("/", rootRouter);
server.use("/components", ComponentsRouter_1.default);
server.use("/warehouses", WarehousesRouter_1.default);
server.use("/distributors", DistributorsRoutes_1.default);
exports.default = server;
//# sourceMappingURL=index.js.map