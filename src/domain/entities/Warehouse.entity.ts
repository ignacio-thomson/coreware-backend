import mongoose, { mongo } from "mongoose";
import { IWarehouse } from "../interfaces/IWarehouse.interface";

export const warehouseEntity = () => {

    let warehouseSchema = new mongoose.Schema<IWarehouse>(
        {
            name: {type: String, required: true},
            location: {type: String, required: true},
            stockavailable: {type: Boolean, required: true}
        }
    );

    return mongoose.models.Warehouses || mongoose.model<IWarehouse>('Warehouses', warehouseSchema, 'warehouses');
    
}