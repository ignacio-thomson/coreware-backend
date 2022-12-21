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
const AuthRouter_1 = __importDefault(require("./AuthRouter"));
const UsersRouter_1 = __importDefault(require("./UsersRouter"));
// Generate the server instance
const server = (0, express_1.default)();
// Generate a router instance
const rootRouter = express_1.default.Router();
// Get base URL
rootRouter.get("/", (req, res) => {
    (0, logger_1.LogInfo)("GET: https://coreware-backend-production.up.railway.app/api");
    res.send("Codeware root directory. You shouldn't be seeing this!");
});
server.use("/", rootRouter);
server.use("/components", ComponentsRouter_1.default);
server.use("/warehouses", WarehousesRouter_1.default);
server.use("/distributors", DistributorsRoutes_1.default);
server.use("/auth", AuthRouter_1.default);
server.use("/users", UsersRouter_1.default);
exports.default = server;
//# sourceMappingURL=index.js.map