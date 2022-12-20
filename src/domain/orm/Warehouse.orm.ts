import { warehouseEntity } from "../entities/Warehouse.entity";
import { LogError } from "../../utils/logger";
import { IWarehouse } from "../interfaces/IWarehouse.interface";

// * CRUD Requests

// Method to get all the warehouses from the Warehouses collection in MongoDB with pagination
export const getAllWarehouses = async (): Promise<any | undefined> => {

    try {

        const warehouseModel = warehouseEntity();
        const response: any = {};

        // Search all warehouses using pagination
        await warehouseModel.find({ isDeleted: false })
        .select("name location")
        .then((warehouses: IWarehouse[]) => {
            response.warehouses = warehouses;
        });

        return response;

    } catch (error) {
        LogError(`[ORM ERROR] Getting all warehouses ${error}`);
    }
}

// Get warehouse by ID
export const getWarehouseById = async(id: string): Promise<any | undefined> => {
    try {
        const warehouseModel = warehouseEntity();
        return await warehouseModel.findById(id).select("name location");
    } catch (error) {
        LogError(`[ORM ERROR] Getting warehouse by ID ${error}`);
    }
}

// Delete warehouse
export const deleteWarehouse = async(id: string): Promise<any | undefined> => {
    try {
        const warehouseModel = warehouseEntity();
        return await warehouseModel.deleteOne({ _id: id });
    } catch (error) {
        LogError(`[ORM ERROR] Deleting warehouse ${error}`);
    }
}

// Update warehouse by ID-
export const updateWarehouseById = async(id: string, warehouses: any): Promise<any | undefined> => {
    try {
        const warehouseModel = warehouseEntity();
        return await warehouseModel.findByIdAndUpdate(id, warehouses);
    } catch (error) {
        LogError(`[ORM ERROR] Updating warehouse by ID ${error}`);
    }
} 

// Create warehouse
export const createWarehouse = async(warehouse: any): Promise<any | undefined> => {
    try {
        const warehouseModel = warehouseEntity();
        return await warehouseModel.create(warehouse);
    } catch(error) {
        LogError(`[ORM ERROR] Creating new warehouse ${error}`);
    }
}