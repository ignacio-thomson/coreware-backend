import { distributorEntity } from "../entities/Distributor.entity";
import { LogError } from "../../utils/logger";
import { IDistributor } from "../interfaces/IDistributor.interface";

// CRUD Requests

// Method to get all the distributors from the Distributors collection in MongoDB with pagination
export const getAllDistributors = async (page: number, limit: number): Promise<any | undefined> => {

    try {

        let distributorModel = distributorEntity();
        let response: any = {};

        // Search all distributors using pagination
        await distributorModel.find({ isDeleted: false })
        .select("brand model price")
        .limit(limit)
        .skip((page - 1) * limit)
        .exec().then((distributors: IDistributor[]) => {
            response.distributors = distributors;
        });

        await distributorModel.countDocuments().then((total: number) => {
            response.totalPages = Math.ceil(total / limit);
            response.currentPage = page;
        });

        return response;

    } catch (error) {
        LogError(`[ORM ERROR] Getting all distributors ${error}`);
    }
}

// Get distributors by ID
export const getDistributorById = async(id: string): Promise<any | undefined> => {
    try {
        let distributorModel = distributorEntity();
        return await distributorModel.findById(id).select("brand model price");
    } catch (error) {
        LogError(`[ORM ERROR] Getting distributor by ID ${error}`);
    }
}

// Delete distributors
export const deleteDistributor = async(id: string): Promise<any | undefined> => {
    try {
        let distributorModel = distributorEntity();
        return await distributorModel.deleteOne({ _id: id });
    } catch (error) {
        LogError(`[ORM ERROR] Deleting distributor ${error}`);
    }
}

// Update distributors by ID-
export const updateDistributorById = async(id: string, distributor: any): Promise<any | undefined> => {
    try {
        let distributorModel = distributorEntity();
        return await distributorModel.findByIdAndUpdate(id, distributor);
    } catch (error) {
        LogError(`[ORM ERROR] Updating distributor by ID ${error}`);
    }
} 