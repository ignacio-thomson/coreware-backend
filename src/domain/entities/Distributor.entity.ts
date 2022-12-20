import mongoose from "mongoose";
import { IDistributor } from "../interfaces/IDistributor.interface";

export const distributorEntity = () => {

    const distributorSchema = new mongoose.Schema<IDistributor>(
        {
            name: {type: String, required: true},
            address: {type: String, required: true},
        }
    );

    return mongoose.models.Distributors || mongoose.model<IDistributor>('Distributors', distributorSchema, 'distributors');

}