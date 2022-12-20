import { IUser } from "src/domain/interfaces/IUser.interface";
import { IAuth } from "src/domain/interfaces/IAuth.interface";
import { IComponent } from "src/domain/interfaces/IComponent.intefarce";
import { IWarehouse } from "src/domain/interfaces/IWarehouse.interface";
import { IDistributor } from "src/domain/interfaces/IDistributor.interface";

export interface IComponentController {
    // Get components
    getComponents(id?: string): Promise<any>;
    // Post components
    postComponents(component: IComponent): Promise<any>;
    // Delete component
    deleteComponent(id: string): Promise<any>;
    // Update component by ID
    updateComponent(id: string, component: any): Promise<any>;
}

export interface IWarehouseController {
    // Get warehouses
    getWarehouses(id?: string): Promise<any>;
    // Post warehouse
    postWarehouse(warehouse: IWarehouse): Promise<any>;
    // Delete warehouse
    deleteWarehouse(id: string): Promise<any>;
    // Update warehouse by ID
    updateWarehouse(id: string, warehouse: any): Promise<any>;
}

export interface IDistributorController {
    // Get distributors
    getDistributors(id?: string): Promise<any>;
    // Post distributor
    postDistributor(distributor: IDistributor): Promise<any>;
    // Delete distributor
    deleteDistributor(id: string): Promise<any>;
    // Update distributor by ID
    updateDistributor(id: string, distributor: any): Promise<any>;
}

export interface IUsersController {
    // Get users
    getUsers(id?: string): Promise<any>;
    // Delete user
    deleteUser(id: string): Promise<any>;
    // Update user by ID
    updateUser(id: string, warehouse: any): Promise<any>;
}

export interface IAuthController {
    // Register new users
    registerUser(user: IUser): Promise<any>;
    // User login
    loginUser(auth: IAuth): Promise<any>;
}