import express, { Request, Response } from "express";
import { ComponentController } from "../controller/ComponentsController";
import bodyParser from "body-parser";

import { verifyToken } from "../middleware/verifyToken.middleware";

// Router from express.
const componentsRouter = express.Router();

// Body parser
const jsonParser = bodyParser.json();

componentsRouter.route("/")
    // * GET
    .get(verifyToken, async (req: Request, res: Response) => {

        // Obtain the ID from the URL
        const id: any = req?.query?.id;

        // Generate controller instance to execute the desired method
        const controller: ComponentController = new ComponentController();

        // Get the response
        const response: any = await controller.getComponents(id);

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
    .put(jsonParser, verifyToken, async (req: Request, res: Response) => {

        // Obtain the ID from the URL
        const id: any = req.query.id;

        // Build new component through body params
        const component = {
            brand: req?.body?.brand,
            model: req?.body?.model,
            price: req?.body?.price
        }

        // Generate controller instance to execute the desired method
        const controller: ComponentController = new ComponentController();

        // Get the response
        const response: any = await controller.updateComponent(id, component);

        // Send response to client
        return res.status(200).send(response);

    })
    // * POST
    .post(jsonParser, async (req: Request, res: Response) => {

        // Build new component through body
        const component = {
            brand: req?.body?.brand,
            model: req?.body?.model,
            price: req?.body?.price
        } 

        // Generate controller instance to execute the desired method
        const controller: ComponentController = new ComponentController();

        // Get the response
        const response: any = await controller.postComponents(component);

        // Send response to client
        return res.status(200).send(response);

    });

export default componentsRouter;