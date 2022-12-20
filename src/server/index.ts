// Express
import express, { Express, Request, Response } from "express";

// Security
import cors from "cors";
import helmet from "helmet";

// Routes
import routes from "../routes";
import mongoose from "mongoose";

// Create Express APP
const server: Express = express();

// Define base route as /api
server.use("/api", routes);

// Define static server
server.use(express.static("public"));

// Mongoose (MongoDB) connection
mongoose.connect("mongodb://127.0.0.1:27017/codeware").then(() => {
    console.log("Connection to database established succesfully");
}).catch((err) => {
    console.log("[ERROR] Couldn't establish connection", err);
});

// Security configuration
server.use(helmet());
server.use(cors());

// Define content type and size limitations
server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));

// Configure redirections
server.get("/", (req: Request, res: Response) => {
    res.redirect("/api");
});

export default server;