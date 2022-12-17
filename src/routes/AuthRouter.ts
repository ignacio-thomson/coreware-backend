import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import { IUser } from "../domain/interfaces/IUser.interface";
import { IAuth } from "../domain/interfaces/IAuth.interface";
import { AuthController } from "../controller/AuthController";
import bodyParser from "body-parser";
import { verifyToken } from "../middleware/verifyToken.middleware";

// Body parser
let jsonParser = bodyParser.json();

const authRouter = express.Router();

authRouter.route("/register")
    // * POST
    .post(jsonParser, async(req: Request, res: Response) => {

        // eslint-disable-next-line no-unsafe-optional-chaining
        let { firstName, lastName, age, email, password } = req?.body;
        let hashedPassword = "";

        if(firstName && lastName && age && email && password) {

            // Obtain password in the request, and hash it.
            hashedPassword = bcrypt.hashSync(password, 8);

            // Build new user with request body info.
            let newUser: IUser = {
                firstName,
                lastName,
                age,
                email,
                password: hashedPassword
            }

            // Generate new AuthController instance.
            const controller: AuthController = new AuthController();

            // Get response
            const response: any = await controller.registerUser(newUser);

            // Send response to client
            return res.status(201).send(response);

        } else {
            
            // Send response to client in case of error while registering a new user.
            return res.status(400).send({
                message: `Fields cannot be empty when trying to register a new user.`
            });

        }

    });

authRouter.route("/login")
    .post(jsonParser, async(req: Request, res: Response) => {

        // eslint-disable-next-line no-unsafe-optional-chaining
        let {email, password} = req?.body;

        if (email && password) {

            // Build new auth with request body info.
            let auth: IAuth = {
                email: email,
                password: password
            }

            // Generate new instance of AuthController.
            const controller: AuthController = new AuthController();

            // Get response
            const response = await controller.loginUser(auth);
            //console.log(response)

            // Send response to client
            return res.status(200).send(response);

        } else {

            return res.status(400).send({
                message: "[ERROR USER DATA MISSING]"
            })

        }

    });

// Route protected by Verify Token Middleware
authRouter.route("/me")
    .get(verifyToken, async (req: Request, res: Response) => {

        // Obtain ID of user to check its data
        let id: any = req?.query?.id;

        if(id){

            // Generate new instance of AuthController
            const controller: AuthController = new AuthController();

            // Obtain response
            const response: any = await controller.userData(id)

            // Send response to client
            return res.status(200).send(response);

        } else {

            // Send response to client in case of error while trying to access data unverified.
            return res.status(401).send({
                message: "Not authorized"
            });

        }

    });

export default authRouter;