import { IUsersController } from "./interfaces";
import { Get, Route, Tags, Query, Delete, Put } from "tsoa";
import { LogSuccess, LogWarning } from "../utils/logger";

// Import ORM
import { getAllUsers, getUserById, deleteUser, updateUserById } from "../domain/orm/User.orm";

@Route("/api/users")
@Tags("Users")
export class UsersController implements IUsersController {

    /**
     * Endpoint to retrieve all the users in the collection.
     * @param page Define the page that wants to be seen.
     * @param limit Define the limit of elements per page.
     * @param id Optional id param to find a particular user.
     */
    @Get("/")
    public async getUsers(@Query() id?: string): Promise<any> {
        
        let response: any = "";

        if(id){
            response = await getUserById(id);
            LogSuccess("[/api/users/] GET User by ID request.");
        } else {
            response = await getAllUsers();
            LogSuccess("[/api/users/] GET User request.");
        }

        return response;
    }

    /**
     * Endpoint to delete a user from the collection.
     * @param id of the user thats going to be deleted.
     */
    @Delete("/")
    public async deleteUser(@Query() id: string | undefined): Promise<any> {
        
        let response: any = "";

        if(id){
            deleteUser(id).then(() => {
                LogSuccess("[/api/users/] DELETE User by ID request.");
                response = {
                    message: `User with ID: ${id} deleted succesfully.`
                };
            });
        } else {
            LogWarning("[/api/users/] DELETE User by ID request.");
            response = {
                message: `Please provide a valid ID.`
            };
        }

        return response;

    }

    /**
     * Endpoint to update a user in the collection.
     * @param id of the user that is being updated.
     * @param user that is being updated.
     */
    @Put("/")
    public async updateUser(@Query() id: string, user: any): Promise<any> {
        
        let response: any = "";

        if(id){
            await updateUserById(id, user).then(() => {
                LogSuccess("[/api/users/] UPDATE User by ID request.");
                response = {
                    message: `User with ID ${id} updated successfully.`
                };
            })
        } else {
            LogWarning("[/api/users/] UPDATE User by ID request.");
            response = {
                message: `Please provide a valid ID.`
            };
        }

        return response;

    }
    
}