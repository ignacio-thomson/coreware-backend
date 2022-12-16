import { IUser } from "src/domain/interfaces/IUser.interface";
import { IAuth } from "src/domain/interfaces/IAuth.interface";

export interface IComponentController {
    // Get components
    getComponents(page: number, limit: number, id?: string): Promise<any>;
    // Delete component
    deleteComponent(id: string): Promise<any>;
    // Update component by ID
    updateComponent(id: string, component: any): Promise<any>;
}

export interface IWarehouseController {
    // Get components
    getWarehouses(page: number, limit: number, id?: string): Promise<any>;
    // Delete component
    deleteWarehouse(id: string): Promise<any>;
    // Update component by ID
    updateWarehouse(id: string, warehouse: any): Promise<any>;
}

export interface IDistributorController {
    // Get components
    getDistributors(page: number, limit: number, id?: string): Promise<any>;
    // Delete component
    deleteDistributor(id: string): Promise<any>;
    // Update component by ID
    updateDistributor(id: string, distributor: any): Promise<any>;
}

export interface IAuthController {
    // Register new users
    registerUser(user: IUser): Promise<any>;
    // User login
    loginUser(auth: IAuth): Promise<any>;
    // Logout user
    logoutUser(): Promise<any>;
}