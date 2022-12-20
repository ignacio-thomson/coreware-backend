import mongoose from "mongoose";
import { IWarehouse } from "../interfaces/IWarehouse.interface";

export const warehouseEntity = () => {

    const warehouseSchema = new mongoose.Schema<IWarehouse>(
        {
            name: {type: String, required: true},
            location: {type: String, required: true},
        }
    );

    return mongoose.models.Warehouses || mongoose.model<IWarehouse>('Warehouses', warehouseSchema, 'warehouses');
    
}