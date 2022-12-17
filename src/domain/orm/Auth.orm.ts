import { userEntity } from "../entities/User.entity";
import { LogError } from "../../utils/logger";
import { IUser } from "../interfaces/IUser.interface";
import { IAuth } from "../interfaces/IAuth.interface";

import dotenv from "dotenv";

// Config .env file
dotenv.config();
const secret = process.env.SECRETKEY || "SECRETKEY";

// BCrypt to hash passwords
import bcrypt from "bcrypt";

// Jason Web Token (JWT)
import jwt from "jsonwebtoken";

// Register user method
export const registerUser = async(user: IUser): Promise<any> => {

    try {
        const userModel = userEntity();
        // Create new user
        return await userModel.create(user);

    } catch (error) {
        LogError(`[ORM ERROR] Creating new user ${error}`);
    }

}

// Authenticate/Login user
export const loginUser = async(auth: IAuth): Promise<any | undefined> => {
    
    try {

        const userModel = userEntity();

        let userFound: IUser | undefined = undefined;
        let token = undefined;

        // Check if user exists by its email
        await userModel.findOne({ email: auth.email }).then((user: IUser) => {
            userFound = user;
        }).catch((error) => {
            console.error(`[AUTH ERROR IN ORM] > User not found`);
            throw new Error(`[AUTH ERROR IN ORM] > User not found ${error}`)
        });

        let validPassword = bcrypt.compareSync(auth.password, userFound!.password);


        if(!validPassword){
            console.error(`[AUTH ERROR IN ORM] > Invalid password`);
            throw new Error(`[AUTH ERROR IN ORM] > Invalid password`);
        }

        // Generate JWT Token
        token = jwt.sign({ email: userFound!.email }, secret, {
            expiresIn: "24h"
        });

        return {
            user: userFound,
            token: token
        }

    } catch (error) {
        LogError(`[ORM ERROR] > Error while logging user in ${error}`);
    }

}

// Logout user
export const logoutUser = async(): Promise<any | undefined> => {
    return "Method not implemented yet."
}