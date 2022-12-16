import { IComponentController } from "./interfaces/index";
import { Get, Route, Tags, Query, Delete, Put } from "tsoa";
import { LogSuccess, LogWarning } from "../utils/logger";

// ! Se cambiaron datos de tipo any a unknown, probar que el funcionamiento siga siendo el correcto. QUITAR ESTA LINEA

// Import ORM
import { getAllComponents, getComponentById, deleteComponent, updateComponentById } from "../domain/orm/Component.orm";

@Route("/api/components")
@Tags("Components")
export class ComponentController implements IComponentController {

    /**
     * Endpoint to retrieve all the components in the collection.
     * @param page Define the page that wants to be seen.
     * @param limit Define the limit of elements per page.
     * @param id Optional id param to find a particular component.
     */
    @Get("/")
    public async getComponents(@Query() page: number, @Query() limit: number, @Query() id?: string): Promise<unknown> {
        
        let response: unknown = "";

        if(id){
            response = await getComponentById(id);
            LogSuccess("[/api/components/] GET Component by ID request.");
        } else {
            response = await getAllComponents(page, limit);
            LogSuccess("[/api/components/] GET Components request.");
        }

        return response;
    }

    /**
     * Endpoint to delete a component from the collection.
     * @param id of the component thats going to be deleted.
     */
    @Delete("/")
    public async deleteComponent(@Query() id: string | undefined): Promise<unknown> {
        
        let response: unknown = "";

        if(id){
            deleteComponent(id).then(() => {
                LogSuccess("[/api/components/] DELETE Component by ID request.");
                response = {
                    message: `Component with ID: ${id} deleted succesfully.`
                };
            });
        } else {
            LogWarning("[/api/components/] DELETE Component by ID request.");
            response = {
                message: `Please provide a valid ID.`
            };
        }

        return response;

    }

    /**
     * Endpoint to update a component in the collection.
     * @param id of the component that is being updated.
     * @param component that is being updated.
     */
    @Put("/")
    public async updateComponent(@Query() id: string, component: unknown): Promise<unknown> {
        
        let response: unknown = "";

        if(id){
            await updateComponentById(id, component).then(() => {
                LogSuccess("[/api/components/] UPDATE Component by ID request.");
                response = {
                    message: `Component with ID ${id} updated successfully.`
                };
            })
        } else {
            LogWarning("[/api/components/] UPDATE Component by ID request.");
            response = {
                message: `Please provide a valid ID.`
            };
        }

        return response;

    }
    
}