"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
// Config to read environment variables
dotenv_1.default.config();
const secretKey = process.env.SECRETKEY || "SECRETKEY";
const verifyToken = (req, res, next) => {
    // Check Request headers to find "x-access-token"
    const jwtToken = req.headers["x-access-token"];
    // Verify if the JSON Web Token is present.
    if (!jwtToken) {
        return res.status(403).send({
            authenticationError: "Failed to authenticate",
            message: "You're not authorized to consume this endpoint."
        });
    }
    // Verify the obtained token, and then we pass it the 'secret' key.
    jsonwebtoken_1.default.verify(jwtToken, secretKey, (error) => {
        if (error) {
            return res.status(500).send({
                authenticationError: "Verification has failed",
                message: "You're not authorized to consume this endpoint."
            });
        }
        next();
    });
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=verifyToken.middleware.js.map