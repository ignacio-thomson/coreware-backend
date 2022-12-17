import mongoose from "mongoose";
import { IUser } from "../interfaces/IUser.interface";

export const userEntity = () => {

    const userSchema = new mongoose.Schema<IUser>(
        {
            firstName: {type: String, required: true},
            lastName: {type: String, required: true},
            age: {type: Number, required: true},
            email: {type: String, required: true},
            password: {type: String, required: true}
        }
    )

    return mongoose.models.Users || mongoose.model<IUser>('Users', userSchema, 'users');

}