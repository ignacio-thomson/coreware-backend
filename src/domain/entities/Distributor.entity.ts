import mongoose from "mongoose";
import { IDistributor } from "../interfaces/IDistributor.interface";

export const distributorEntity = () => {

    let distributorSchema = new mongoose.Schema<IDistributor>(
        {
            name: {type: String, required: true},
            address: {type: String, required: true},
            officialdistributor: {type: Boolean, required: true}
        }
    );

    return mongoose.models.Distributors || mongoose.model<IDistributor>('Distributors', distributorSchema, 'distributors');

}