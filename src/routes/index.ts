/**
 * Root router
 * In charge of handling redirections and determines which route will follow a request.
 */
import express, { Request, Response } from "express";
import { LogInfo } from "../utils/logger";
import componentsRouter from "./ComponentsRouter";
import warehousesRouter from "./WarehousesRouter";
import distributorsRouter from "./DistributorsRoutes";

// Generate the server instance
const server = express();

// Generate a router instance
const rootRouter = express.Router();

// Get base URL
rootRouter.get("/", (req: Request, res: Response) => {
    LogInfo("GET: http://localhost:8000/api");
    res.send("Welcome to my API RESTful, Coreware.");
});

server.use("/", rootRouter);
server.use("/components", componentsRouter);
server.use("/warehouses", warehousesRouter);
server.use("/distributors", distributorsRouter);

export default server;