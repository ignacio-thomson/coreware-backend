import { componentEntity } from "../entities/Component.entity";
import { LogError } from "../../utils/logger";
import { IComponent } from "../interfaces/IComponent.intefarce";

// * CRUD Requests

// Method to get all the components from the Components collection in MongoDB with pagination
export const getAllComponents = async (): Promise<any | undefined> => {

    try {

        const componentModel = componentEntity();
        const response: any = {};

        // Search all components using pagination
        await componentModel.find({ isDeleted: false })
        .select("brand model price")
        .then((components: IComponent[]) => {
            response.components = components;
        });

        return response;

    } catch (error) {
        LogError(`[ORM ERROR] Getting all components ${error}`);
    }
}

// Get component by ID
export const getComponentById = async(id: string): Promise<any | undefined> => {
    try {
        const componentModel = componentEntity();
        return await componentModel.findById(id).select("brand model price");
    } catch (error) {
        LogError(`[ORM ERROR] Getting component by ID ${error}`);
    }
}

// Delete component
export const deleteComponent = async(id: string): Promise<any | undefined> => {
    try {
        const componentModel = componentEntity();
        return await componentModel.deleteOne({ _id: id });
    } catch (error) {
        LogError(`[ORM ERROR] Deleting component ${error}`);
    }
}

// Update component by ID-
export const updateComponentById = async(id: string, component: any): Promise<any | undefined> => {
    try {
        const componentModel = componentEntity();
        return await componentModel.findByIdAndUpdate(id, component);
    } catch (error) {
        LogError(`[ORM ERROR] Updating component by ID ${error}`);
    }
} 

// Create component
export const createComponent = async(component: any): Promise<any | undefined> => {
    try {
        const componentModel = componentEntity();
        return await componentModel.create(component);
    } catch(error) {
        LogError(`[ORM ERROR] Creating new component ${error}`);
    }
}