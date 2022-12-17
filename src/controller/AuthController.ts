import { IAuthController } from "./interfaces";
import { Get, Route, Tags, Post } from "tsoa";
import { LogSuccess, LogWarning } from "../utils/logger";
import { IUser } from "../domain/interfaces/IUser.interface";
import { IAuth } from "../domain/interfaces/IAuth.interface";

// Import ORM
import { registerUser, loginUser  } from "../domain/orm/Auth.orm";
import { AuthResponse } from "./responses";
import { getUserById } from "../domain/orm/User.orm";

@Route("/api/auth")
@Tags("Users")
export class AuthController implements IAuthController {
    
    /**
     * Endpoint to register a new user in the User collection.
     * @param user that will be created.
     * @returns the response, which in turn confirms if the user was or not created succesfully.
     */
    @Post("/register")
    public async registerUser(user: IUser): Promise<any> {
        
        let response: any = "";

        if(user){
            await registerUser(user)!.then(() => {
                response = {
                    message: `User registered succesfully ${user.firstName} ${user.lastName}`
                }
            })
            LogSuccess(`[/api/auth/register] New user registered succesfully ${user.firstName} ${user.lastName}`);
        } else {
            response = {
                message: `Failed to register a new user, please provide a valid user to create.`
            }
            LogWarning(`[/api/auth/register] A valid user needs to be provided in order to register it.`);
        }

        return response;
    }

    /**
     * Endpoint to log in, and be able to consume the different endpoints of the API that require a JWT verification.
     * @param auth -> credentials used to complete the log in. (email & password)
     * @returns the response, which in turn returns a greeting message and the token needed to consume different resources.
     */
    @Post("/login")
    public async loginUser(auth: IAuth): Promise<any> {
        
        let response: AuthResponse | undefined;

        if(auth){
            let data = await loginUser(auth);
            response = {
                message: `Bienvenido/a, ${data.user.firstName}`,
                token: data.token
            }
            LogSuccess(`[/api/auth/login] User logged in succesfully: ${auth.email}`);
        } else {
            response = {
                message: `Please provide a valid email and password to log in.`,
                token: `Invalid token`
            };  
            LogWarning("[/api/users/login] A valid user is needed to log in.");
        }

        console.log(response)
        return response;

    }

    /**
     * Method to log out the user, still not implemented.
     */
    logoutUser(): Promise<any> {
        throw new Error("Method not implemented.");
    }

    /**
     * Endpoint to check our user details.
     * @param id - self ID to check our account details
     * @returns the response which confirms if the user information was found or not.
     */
    @Get("/me")
    public async userData(id: string): Promise<any> {
        let response: any = "";
        if(id){
            response = await getUserById(id);
            LogSuccess(`[/api/auth/me] Get account details of ID: ${id}`);
        } else {
            response = {
                message: "A valid ID must be used"
            }
            LogWarning("[/api/auth/me] Not able to retrieve the user information.");
        }
        return response;
    }
    
}