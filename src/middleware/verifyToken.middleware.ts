import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import dotenv from "dotenv";

// Config to read environment variables
dotenv.config();

const secretKey = process.env.SECRETKEY || "SECRETKEY";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {

    // Check Request headers to find "x-access-token"
    const jwtToken: any = req.headers["x-access-token"];

    // Verify if the JSON Web Token is present.
    if(!jwtToken){
        return res.status(403).send({
            authenticationError: "Failed to authenticate",
            message: "You're not authorized to consume this endpoint."
        });
    }

    // Verify the obtained token, and then we pass it the 'secret' key.
    jwt.verify(jwtToken, secretKey, (error: any) => {
        
        if(error){
            return res.status(500).send({
                authenticationError: "Verification has failed",
                message: "You're not authorized to consume this endpoint."
            });
        }

        next();

    });

};