"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Env. variables
const dotenv_1 = __importDefault(require("dotenv"));
// Server
const server_1 = __importDefault(require("./src/server"));
// Loggers
const logger_1 = require("./src/utils/logger");
// Configure .env file
dotenv_1.default.config();
const port = process.env.PORT || 8000;
// Exec server
server_1.default.listen(port, () => {
    (0, logger_1.LogSuccess)(`Server is now ON in https://coreware-backend-production.up.railway.app/api`);
});
// Log server
server_1.default.on("error", (error) => {
    (0, logger_1.LogError)(`[SERVER ERROR] = ${error}`);
});
//# sourceMappingURL=index.js.map