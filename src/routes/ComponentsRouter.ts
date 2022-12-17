import express, { Request, Response } from "express";
import { ComponentController } from "../controller/ComponentsController";

import { verifyToken } from "../middleware/verifyToken.middleware";

// Router from express.
const componentsRouter = express.Router();

componentsRouter.route("/")
    // * GET
    .get(verifyToken, async (req: Request, res: Response) => {

        // Obtain the ID from the URL
        const id: any = req?.query?.id;

        // Pagination
        const page: any = req?.query?.page || 1;
        const limit: any = req?.query?.limit || 10;

        // Generate controller instance to execute the desired method
        const controller: ComponentController = new ComponentController();

        // Get the response
        const response: any = await controller.getComponents(page, limit, id);

        // Send response to client
        return res.status(200).send(response);

    })
    // * DELETE
    .delete(verifyToken, async (req: Request, res: Response) => {

        // Obtain the ID from the URL
        const id: any = req?.query?.id;

        // Generate controller instance to execute the desired method
        const controller: ComponentController = new ComponentController();

        // Get the response
        const response: any = await controller.deleteComponent(id);

        // Send response to client
        return res.status(200).send(response);

    })
    // * PUT
    .put(verifyToken, async (req: Request, res: Response) => {

        // Obtain the ID from the URL
        const id: any = req.query.id;

        // Build new component through query params
        const component = {
            brand: req?.query?.brand,
            model: req?.query?.model,
            price: req?.query?.price
        }

        // Generate controller instance to execute the desired method
        const controller: ComponentController = new ComponentController();

        // Get the response
        const response: any = await controller.updateComponent(id, component);

        // Send response to client
        return res.status(204).send(response);

    });

export default componentsRouter;