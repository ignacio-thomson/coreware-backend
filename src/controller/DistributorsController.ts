import { IDistributorController } from "./interfaces/index";
import { Get, Route, Tags, Query, Delete, Put } from "tsoa";
import { LogSuccess, LogWarning } from "../utils/logger";

// Import ORM
import { getAllDistributors, getDistributorById, deleteDistributor, updateDistributorById } from "../domain/orm/Distributor.orm";

@Route("/api/distributors")
@Tags("Distributors")
export class DistributorController implements IDistributorController {

    /**
     * Endpoint to retrieve all the distributors in the collection.
     * @param page Define the page that wants to be seen.
     * @param limit Define the limit of elements per page.
     * @param id Optional id param to find a particular distributors.
     */
    @Get("/")
    public async getDistributors(@Query() page: number, limit: number, id?: string | undefined): Promise<any> {
        
        let response: any = "";

        if(id){
            response = await getDistributorById(id);
            LogSuccess("[/api/distributors/] GET Distributors by ID request.");
        } else {
            response = await getAllDistributors(page, limit);
            LogSuccess("[/api/distributors/] GET Distributors request.");
        }

        return response;
    }

    /**
     * Endpoint to delete a distributor from the collection.
     * @param id of the distributor thats going to be deleted.
     */
    @Delete("/")
    public async deleteDistributor(@Query() id: string | undefined): Promise<any> {
        
        let response: any = "";

        if(id){
            deleteDistributor(id).then(() => {
                LogSuccess("[/api/distributors/] DELETE Distributor by ID request.");
                response = {
                    message: `Distributor with ID: ${id} deleted succesfully.`
                };
            });
        } else {
            LogWarning("[/api/distributors/] DELETE Distributor by ID request.");
            response = {
                message: `Please provide a valid ID.`
            };
        }

        return response;

    }

    /**
     * Endpoint to update a distributor in the collection.
     * @param id of the distributor that is being updated.
     * @param distributor that is being updated.
     */
    @Put("/")
    public async updateDistributor(@Query() id: string, distributor: any): Promise<any> {
        
        let response: any = "";

        if(id){
            await updateDistributorById(id, distributor).then(() => {
                LogSuccess("[/api/distributors/] UPDATE Distributor by ID request.");
                response = {
                    message: `Distributor with ID ${id} updated successfully.`
                };
            })
        } else {
            LogWarning("[/api/distributors/] UPDATE Distributor by ID request.");
            response = {
                message: `Please provide a valid ID.`
            };
        }

        return response;

    }
    
}