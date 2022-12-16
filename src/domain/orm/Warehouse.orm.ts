import { warehouseEntity } from "../entities/Warehouse.entity";
import { LogError } from "../../utils/logger";
import { IWarehouse } from "../interfaces/IWarehouse.interface";

// CRUD Requests

// Method to get all the warehouses from the Warehouses collection in MongoDB with pagination
export const getAllWarehouses = async (page: number, limit: number): Promise<any | undefined> => {

    try {

        let warehouseModel = warehouseEntity();
        let response: any = {};

        // Search all warehouses using pagination
        await warehouseModel.find({ isDeleted: false })
        .select("brand model price")
        .limit(limit)
        .skip((page - 1) * limit)
        .exec().then((warehouses: IWarehouse[]) => {
            response.warehouses = warehouses;
        });

        await warehouseModel.countDocuments().then((total: number) => {
            response.totalPages = Math.ceil(total / limit);
            response.currentPage = page;
        });

        return response;

    } catch (error) {
        LogError(`[ORM ERROR] Getting all warehouses ${error}`);
    }
}

// Get warehouse by ID
export const getWarehouseById = async(id: string): Promise<any | undefined> => {
    try {
        let warehouseModel = warehouseEntity();
        return await warehouseModel.findById(id).select("brand model price");
    } catch (error) {
        LogError(`[ORM ERROR] Getting warehouse by ID ${error}`);
    }
}

// Delete warehouse
export const deleteWarehouse = async(id: string): Promise<any | undefined> => {
    try {
        let warehouseModel = warehouseEntity();
        return await warehouseModel.deleteOne({ _id: id });
    } catch (error) {
        LogError(`[ORM ERROR] Deleting warehouse ${error}`);
    }
}

// Update warehouse by ID-
export const updateWarehouseById = async(id: string, warehouses: any): Promise<any | undefined> => {
    try {
        let warehouseModel = warehouseEntity();
        return await warehouseModel.findByIdAndUpdate(id, warehouses);
    } catch (error) {
        LogError(`[ORM ERROR] Updating warehouse by ID ${error}`);
    }
} 