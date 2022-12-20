import express, { Request, Response } from "express";
import { DistributorController } from "../controller/DistributorsController";
import bodyParser from "body-parser";

import { verifyToken } from "../middleware/verifyToken.middleware";

// Router from express.
const distributorsRouter = express.Router();


// Body parser
const jsonParser = bodyParser.json();

distributorsRouter.route("/")
    // * GET
    .get(verifyToken, async (req: Request, res: Response) => {

        // Obtain the ID from the URL
        const id: any = req?.query?.id;

        // Generate controller instance to execute the desired method
        const controller: DistributorController = new DistributorController();

        // Get the response
        const response: any = await controller.getDistributors(id);

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
    .put(jsonParser, verifyToken, async (req: Request, res: Response) => {

        // Obtain the ID from the URL
        const id: any = req.query.id;

        // Build new distributor through query params
        const distributors = {
            name: req?.body?.name,
            address: req?.body?.address
        }

        // Generate controller instance to execute the desired method
        const controller: DistributorController = new DistributorController();

        // Get the response
        const response: any = await controller.updateDistributor(id, distributors);

        // Send response to client
        return res.status(200).send(response);

    })
    // * POST
    .post(jsonParser, async (req: Request, res: Response) => {

        // Build new component through body
        const distributor = {
            name: req?.body?.name,
            address: req?.body?.address,
        } 

        // Generate controller instance to execute the desired method
        const controller: DistributorController = new DistributorController();

        // Get the response
        const response: any = await controller.postDistributor(distributor);

        // Send response to client
        return res.status(200).send(response);

    });

export default distributorsRouter;