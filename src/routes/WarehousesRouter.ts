import express, { Request, Response } from "express";
import { WarehouseController } from "../controller/WarehousesController";

import { verifyToken } from "src/middleware/verifyToken.middleware";

// Router from express.
const warehousesRouter = express.Router();

warehousesRouter.route("/")
    // * GET
    .get(verifyToken, async (req: Request, res: Response) => {

        // Obtain the ID from the URL
        const id: any = req?.query?.id;

        // Pagination
        const page: any = req?.query?.page || 1;
        const limit: any = req?.query?.limit || 10;

        // Generate controller instance to execute the desired method
        const controller: WarehouseController = new WarehouseController();

        // Get the response
        const response: any = await controller.getWarehouses(page, limit, id);

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
    .put(verifyToken, async (req: Request, res: Response) => {

        // Obtain the ID from the URL
        const id: any = req.query.id;

        // Build new warehouse through query params
        const warehouse = {
            brand: req?.query?.brand,
            model: req?.query?.model,
            price: req?.query?.price
        }

        // Generate controller instance to execute the desired method
        const controller: WarehouseController = new WarehouseController();

        // Get the response
        const response: any = await controller.updateWarehouse(id, warehouse);

        // Send response to client
        return res.status(204).send(response);

    });

export default warehousesRouter;