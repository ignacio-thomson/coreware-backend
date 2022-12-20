// Env. variables
import dotenv from "dotenv";
// Server
import server from "./src/server";
// Loggers
import { LogError, LogSuccess } from "./src/utils/logger"

// Configure .env file
dotenv.config();

const port: number | string = process.env.PORT || 8000;

// Exec server
server.listen(port, () => {
    LogSuccess(`Server is now ON in http://localhost:${port}/`);
});

// Log server
server.on("error", (error) => {
    LogError(`[SERVER ERROR] = ${error}`)
})


