import { userEntity } from "../entities/User.entity";
import { LogError } from "../../utils/logger";
import { IUser } from "../interfaces/IUser.interface";

// * CRUD Requests

// Method to get all the users from the Users collection in MongoDB with pagination
export const getAllUsers = async (): Promise<any | undefined> => {

    try {

        const usersModel = userEntity();
        const response: any = {};

        // Search all users using pagination
        await usersModel.find({ isDeleted: false })
        .select("firstName lastName age email")
        .then((users: IUser[]) => {
            response.users = users;
        });

        return response;

    } catch (error) {
        LogError(`[ORM ERROR] Getting all users ${error}`);
    }
}

// Get user by ID
export const getUserById = async(id: string): Promise<any | undefined> => {
    try {
        const usersModel = userEntity();
        return await usersModel.findById(id).select("brand model price");
    } catch (error) {
        LogError(`[ORM ERROR] Getting user by ID ${error}`);
    }
}

// Delete user
export const deleteUser = async(id: string): Promise<any | undefined> => {
    try {
        const usersModel = userEntity();
        return await usersModel.deleteOne({ _id: id });
    } catch (error) {
        LogError(`[ORM ERROR] Deleting user ${error}`);
    }
}

// Update user by ID-
export const updateUserById = async(id: string, user: any): Promise<any | undefined> => {
    try {
        const usersModel = userEntity();
        return await usersModel.findByIdAndUpdate(id, user);
    } catch (error) {
        LogError(`[ORM ERROR] Updating user by ID ${error}`);
    }
} 