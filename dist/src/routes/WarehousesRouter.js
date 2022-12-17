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
const WarehousesController_1 = require("../controller/WarehousesController");
const verifyToken_middleware_1 = require("../middleware/verifyToken.middleware");
// Router from express.
const warehousesRouter = express_1.default.Router();
warehousesRouter.route("/")
    // * GET
    .get(verifyToken_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    // Obtain the ID from the URL
    const id = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.id;
    // Pagination
    const page = ((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.page) || 1;
    const limit = ((_c = req === null || req === void 0 ? void 0 : req.query) === null || _c === void 0 ? void 0 : _c.limit) || 10;
    // Generate controller instance to execute the desired method
    const controller = new WarehousesController_1.WarehouseController();
    // Get the response
    const response = yield controller.getWarehouses(page, limit, id);
    // Send response to client
    return res.status(200).send(response);
}))
    // * DELETE
    .delete(verifyToken_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    // Obtain the ID from the URL
    const id = (_d = req === null || req === void 0 ? void 0 : req.query) === null || _d === void 0 ? void 0 : _d.id;
    // Generate controller instance to execute the desired method
    const controller = new WarehousesController_1.WarehouseController();
    // Get the response
    const response = yield controller.deleteWarehouse(id);
    // Send response to client
    return res.status(200).send(response);
}))
    // * PUT
    .put(verifyToken_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f, _g;
    // Obtain the ID from the URL
    const id = req.query.id;
    // Build new warehouse through query params
    const warehouse = {
        brand: (_e = req === null || req === void 0 ? void 0 : req.query) === null || _e === void 0 ? void 0 : _e.name,
        model: (_f = req === null || req === void 0 ? void 0 : req.query) === null || _f === void 0 ? void 0 : _f.location,
        price: (_g = req === null || req === void 0 ? void 0 : req.query) === null || _g === void 0 ? void 0 : _g.stockAvailable
    };
    // Generate controller instance to execute the desired method
    const controller = new WarehousesController_1.WarehouseController();
    // Get the response
    const response = yield controller.updateWarehouse(id, warehouse);
    // Send response to client
    return res.status(204).send(response);
}));
exports.default = warehousesRouter;
//# sourceMappingURL=WarehousesRouter.js.map