"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DistributorsController_1 = require("../controller/DistributorsController");
const body_parser_1 = __importDefault(require("body-parser"));
const verifyToken_middleware_1 = require("../middleware/verifyToken.middleware");
// Router from express.
const distributorsRouter = express_1.default.Router();
const jsonParser = body_parser_1.default.json();
distributorsRouter.route("/")
    // * GET
    .get(verifyToken_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Obtain the ID from the URL
    const id = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.id;
    // Generate controller instance to execute the desired method
    const controller = new DistributorsController_1.DistributorController();
    // Get the response
    const response = yield controller.getDistributors(id);
    // Send response to client
    return res.status(200).send(response);
}))
    // * DELETE
    .delete(verifyToken_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    // Obtain the ID from the URL
    const id = (_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.id;
    // Generate controller instance to execute the desired method
    const controller = new DistributorsController_1.DistributorController();
    // Get the response
    const response = yield controller.deleteDistributor(id);
    // Send response to client
    return res.status(200).send(response);
}))
    // * PUT
    .put(jsonParser, verifyToken_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    // Obtain the ID from the URL
    const id = req.query.id;
    // Build new distributor through query params
    const distributors = {
        name: (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.name,
        address: (_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.address
    };
    // Generate controller instance to execute the desired method
    const controller = new DistributorsController_1.DistributorController();
    // Get the response
    const response = yield controller.updateDistributor(id, distributors);
    // Send response to client
    return res.status(200).send(response);
}))
    // * POST
    .post(jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    // Build new component through body params
    const distributor = {
        name: (_e = req === null || req === void 0 ? void 0 : req.body) === null || _e === void 0 ? void 0 : _e.name,
        address: (_f = req === null || req === void 0 ? void 0 : req.body) === null || _f === void 0 ? void 0 : _f.address,
    };
    // Generate controller instance to execute the desired method
    const controller = new DistributorsController_1.DistributorController();
    // Get the response
    const response = yield controller.postDistributor(distributor);
    // Send response to client
    return res.status(200).send(response);
}));
exports.default = distributorsRouter;
//# sourceMappingURL=DistributorsRoutes.js.map