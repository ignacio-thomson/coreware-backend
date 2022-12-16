import { IWarehouseController } from "./interfaces/index";
import { Get, Route, Tags, Query, Delete, Put } from "tsoa";
import { LogSuccess, LogWarning } from "../utils/logger";

// Import ORM
import { getAllWarehouses, getWarehouseById, deleteWarehouse, updateWarehouseById } from "../domain/orm/Warehouse.orm";

@Route("/api/warehouses")
@Tags("Warehouses")
export class WarehouseController implements IWarehouseController {

    /**
     * Endpoint to retrieve all the warehouses in the collection.
     * @param page Define the page that wants to be seen.
     * @param limit Define the limit of elements per page.
     * @param id Optional id param to find a particular warehouse.
     */
    @Get("/")
    public async getWarehouses(@Query() page: number, limit: number, id?: string | undefined): Promise<any> {
        
        let response: any = "";

        if(id){
            response = await getWarehouseById(id);
            LogSuccess("[/api/warehouses/] GET Warehouse by ID request.");
        } else {
            response = await getAllWarehouses(page, limit);
            LogSuccess("[/api/warehouses/] GET Warehouses request.");
        }

        return response;
    }

    /**
     * Endpoint to delete a warehouse from the collection.
     * @param id of the warehouse thats going to be deleted.
     */
    @Delete("/")
    public async deleteWarehouse(@Query() id: string | undefined): Promise<any> {
        
        let response: any = "";

        if(id){
            deleteWarehouse(id).then(() => {
                LogSuccess("[/api/warehouses/] DELETE Warehouse by ID request.");
                response = {
                    message: `Warehouse with ID: ${id} deleted succesfully.`
                };
            });
        } else {
            LogWarning("[/api/warehouses/] DELETE Warehouse by ID request.");
            response = {
                message: `Please provide a valid ID.`
            };
        }

        return response;

    }

    /**
     * Endpoint to update a warehouse in the collection.
     * @param id of the warehouse that is being updated.
     * @param warehouse that is being updated.
     */
    @Put("/")
    public async updateWarehouse(@Query() id: string, warehouse: any): Promise<any> {
        
        let response: any = "";

        if(id){
            await updateWarehouseById(id, warehouse).then(() => {
                LogSuccess("[/api/warehouses/] UPDATE Warehouse by ID request.");
                response = {
                    message: `Warehouse with ID ${id} updated successfully.`
                };
            })
        } else {
            LogWarning("[/api/warehouses/] UPDATE Warehouse by ID request.");
            response = {
                message: `Please provide a valid ID.`
            };
        }

        return response;

    }
    
}