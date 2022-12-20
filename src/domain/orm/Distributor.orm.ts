import { distributorEntity } from "../entities/Distributor.entity";
import { LogError } from "../../utils/logger";
import { IDistributor } from "../interfaces/IDistributor.interface";

// * CRUD Requests

// Method to get all the distributors from the Distributors collection in MongoDB with pagination
export const getAllDistributors = async (): Promise<any | undefined> => {

    try {

        const distributorModel = distributorEntity();
        const response: any = {};

        // Search all distributors using pagination
        await distributorModel.find({ isDeleted: false })
        .select("name address")
        .then((distributors: IDistributor[]) => {
            response.distributors = distributors;
        });

        return response;

    } catch (error) {
        LogError(`[ORM ERROR] Getting all distributors ${error}`);
    }
}

// Get distributors by ID
export const getDistributorById = async(id: string): Promise<any | undefined> => {
    try {
        const distributorModel = distributorEntity();
        return await distributorModel.findById(id).select("name address");
    } catch (error) {
        LogError(`[ORM ERROR] Getting distributor by ID ${error}`);
    }
}

// Delete distributors
export const deleteDistributor = async(id: string): Promise<any | undefined> => {
    try {
        const distributorModel = distributorEntity();
        return await distributorModel.deleteOne({ _id: id });
    } catch (error) {
        LogError(`[ORM ERROR] Deleting distributor ${error}`);
    }
}

// Update distributors by ID-
export const updateDistributorById = async(id: string, distributor: any): Promise<any | undefined> => {
    try {
        const distributorModel = distributorEntity();
        return await distributorModel.findByIdAndUpdate(id, distributor);
    } catch (error) {
        LogError(`[ORM ERROR] Updating distributor by ID ${error}`);
    }
} 

// Create distributor
export const createDistributor = async(distributor: any): Promise<any | undefined> => {
    try {
        const distributorModel = distributorEntity();
        return await distributorModel.create(distributor);
    } catch(error) {
        LogError(`[ORM ERROR] Creating new distributor ${error}`);
    }
}