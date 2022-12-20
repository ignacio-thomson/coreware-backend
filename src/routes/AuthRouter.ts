import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import { IUser } from "../domain/interfaces/IUser.interface";
import { IAuth } from "../domain/interfaces/IAuth.interface";
import { AuthController } from "../controller/AuthController";
import bodyParser from "body-parser";

// Router from express
const authRouter = express.Router();

// Body parser
const jsonParser = bodyParser.json();

authRouter.route("/register")
    // * POST
    .post(jsonParser, async(req: Request, res: Response) => {

        // eslint-disable-next-line no-unsafe-optional-chaining
        const { firstName, lastName, age, email, password } = req?.body;
        let hashedPassword = "";

        if(firstName && lastName && age && email && password) {

            // Obtain password in the request, and hash it.
            hashedPassword = bcrypt.hashSync(password, 8);

            // Build new user with request body info.
            const newUser: IUser = {
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
    //* POST
    .post(jsonParser, async(req: Request, res: Response) => {

        // eslint-disable-next-line no-unsafe-optional-chaining
        const {email, password} = req?.body;

        if (email && password) {

            // Build new auth with request body info.
            const auth: IAuth = {
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

export default authRouter;