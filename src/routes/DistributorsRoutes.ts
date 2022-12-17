import express, { Request, Response } from "express";
import { DistributorController } from "../controller/DistributorsController";

import { verifyToken } from "../middleware/verifyToken.middleware";

// Router from express.
const distributorsRouter = express.Router();

distributorsRouter.route("/")
    // * GET
    .get(verifyToken, async (req: Request, res: Response) => {

        // Obtain the ID from the URL
        const id: any = req?.query?.id;

        // Pagination
        const page: any = req?.query?.page || 1;
        const limit: any = req?.query?.limit || 10;

        // Generate controller instance to execute the desired method
        const controller: DistributorController = new DistributorController();

        // Get the response
        const response: any = await controller.getDistributors(page, limit, id);

        // Send response to client
        return res.status(200).send(response);

    })
    // * DELETE
    .delete(verifyToken, async (req: Request, res: Response) => {

        // Obtain the ID from the URL
        const id: any = req?.query?.id;

        // Generate controller instance to execute the desired method
        const controller: DistributorController = new DistributorController();

        // Get the response
        const response: any = await controller.deleteDistributor(id);

        // Send response to client
        return res.status(200).send(response);

    })
    // * PUT
    .put(verifyToken, async (req: Request, res: Response) => {

        // Obtain the ID from the URL
        const id: any = req.query.id;

        // Build new distributor through query params
        const distributors = {
            brand: req?.query?.brand,
            model: req?.query?.adress,
            price: req?.query?.officialDistributor
        }

        // Generate controller instance to execute the desired method
        const controller: DistributorController = new DistributorController();

        // Get the response
        const response: any = await controller.updateDistributor(id, distributors);

        // Send response to client
        return res.status(204).send(response);

    });

export default distributorsRouter;