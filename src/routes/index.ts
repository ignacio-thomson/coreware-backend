/**
 * Root router
 * In charge of handling redirections and determines which route will follow a request.
 */
import express, { Request, Response } from "express";
import { LogInfo } from "../utils/logger";
import componentsRouter from "./ComponentsRouter";
import warehousesRouter from "./WarehousesRouter";
import distributorsRouter from "./DistributorsRoutes";
import authRouter from "./AuthRouter";
import usersRouter from "./UsersRouter";

// Generate the server instance
const server = express();

// Generate a router instance
const rootRouter = express.Router();

// Get base URL
rootRouter.get("/", (req: Request, res: Response) => {
    LogInfo("GET: http://localhost:8000/api");
    res.send("Codeware root directory. You shouldn't be seeing this!");
});

server.use("/", rootRouter);
server.use("/components", componentsRouter);
server.use("/warehouses", warehousesRouter);
server.use("/distributors", distributorsRouter);
server.use("/auth", authRouter);
server.use("/users", usersRouter)


export default server;