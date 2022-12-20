import { IComponentController } from "./interfaces/index";
import { Get, Route, Tags, Query, Delete, Put, Post } from "tsoa";
import { LogSuccess, LogWarning } from "../utils/logger";

// Import ORM
import { getAllComponents, getComponentById, deleteComponent, updateComponentById, createComponent } from "../domain/orm/Component.orm";

@Route("/api/components")
@Tags("Components")
export class ComponentController implements IComponentController {

    /**
     * Endpoint to retrieve all the components in the collection.
     * @param id Optional id param to find a particular component.
     */
    @Get("/")
    public async getComponents(@Query() id?: string): Promise<any> {
        
        let response: any = "";

        if(id){
            response = await getComponentById(id);
            LogSuccess("[/api/components/] GET Component by ID request.");
        } else {
            response = await getAllComponents();
            LogSuccess("[/api/components/] GET Components request.");
        }

        return response;
    }

    /**
     * Endpoint to delete a component from the collection.
     * @param id of the component thats going to be deleted.
     */
    @Delete("/")
    public async deleteComponent(@Query() id: string | undefined): Promise<any> {
        
        let response: any = "";

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
    public async updateComponent(@Query() id: string, component: any): Promise<any> {
        
        let response: any = "";

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

    /**
     * Endpoint to generate new document.
     * @param component that is being created in the Database
     */
    @Post("/")
    public async postComponents(component: any): Promise<any> {

        let response: any = "";

        if(component){
            await createComponent(component).then(() => {
                response = {
                    message: `Component created succesfully: ${component.brand} - ${component.model}`
                }
            });
            LogSuccess(`[/api/components] POST new Component: ${component.brand}`);
        } else {
            LogWarning("[/api/components] POST new Component");
            response = {
                message: `Failed to create a new component, please provide a valid entry`
            }
        }

        return response;

    }
    
}