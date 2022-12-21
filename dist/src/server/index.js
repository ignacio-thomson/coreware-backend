"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Express
const express_1 = __importDefault(require("express"));
// Env. variables
const dotenv_1 = __importDefault(require("dotenv"));
// Security
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
// Routes
const routes_1 = __importDefault(require("../routes"));
const mongoose_1 = __importDefault(require("mongoose"));
// Create Express APP
const server = (0, express_1.default)();
// Configure .env file
dotenv_1.default.config();
// Define base route as /api
server.use("/api", routes_1.default);
// Define static server
server.use(express_1.default.static("public"));
// Mongoose (MongoDB) connection
mongoose_1.default.connect(process.env.MONGO_URL + "/codeware").then(() => {
    console.log("Connection to database established succesfully");
}).catch((err) => {
    console.log("[ERROR] Couldn't establish connection", err);
});
// Security configuration
server.use((0, helmet_1.default)());
server.use((0, cors_1.default)());
// Define content type and size limitations
server.use(express_1.default.urlencoded({ extended: true, limit: '50mb' }));
server.use(express_1.default.json({ limit: '50mb' }));
// Configure redirections
server.get("/", (req, res) => {
    res.redirect("/api");
});
exports.default = server;
//# sourceMappingURL=index.js.map