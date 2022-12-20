import express, { Request, Response } from "express";
import { WarehouseController } from "../controller/WarehousesController";
import bodyParser from "body-parser";

import { verifyToken } from "../middleware/verifyToken.middleware";

// Router from express.
const warehousesRouter = express.Router();

// Body parser
const jsonParser = bodyParser.json();

warehousesRouter.route("/")
    // * GET
    .get(verifyToken, async (req: Request, res: Response) => {

        // Obtain the ID from the URL
        const id: any = req?.query?.id;

        // Generate controller instance to execute the desired method
        const controller: WarehouseController = new WarehouseController();

        // Get the response
        const response: any = await controller.getWarehouses(id);

        // Send response to client
        return res.status(200).send(response);

    })
    // * DELETE
    .delete(verifyToken, async (req: Request, res: Response) => {

        // Obtain the ID from the URL
        const id: any = req?.query?.id;

        // Generate controller instance to execute the desired method
        const controller: WarehouseController = new WarehouseController();

        // Get the response
        const response: any = await controller.deleteWarehouse(id);

        // Send response to client
        return res.status(200).send(response);

    })
    // * PUT
    .put(jsonParser, verifyToken, async (req: Request, res: Response) => {

        // Obtain the ID from the URL
        const id: any = req.query.id;

        // Build new warehouse through query params
        const warehouse = {
            name: req?.body?.name,
            location: req?.body?.location,
        }

        // Generate controller instance to execute the desired method
        const controller: WarehouseController = new WarehouseController();

        // Get the response
        const response: any = await controller.updateWarehouse(id, warehouse);

        // Send response to client
        return res.status(200).send(response);

    })
    // * POST
    .post(jsonParser, async (req: Request, res: Response) => {

        // Build new component through body
        const warehouse = {
            name: req?.body?.name,
            location: req?.body?.location,
        } 

        // Generate controller instance to execute the desired method
        const controller: WarehouseController = new WarehouseController();

        // Get the response
        const response: any = await controller.postWarehouse(warehouse);

        // Send response to client
        return res.status(200).send(response);

    });

export default warehousesRouter;