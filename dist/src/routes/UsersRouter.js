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
const UsersController_1 = require("../controller/UsersController");
const body_parser_1 = __importDefault(require("body-parser"));
const verifyToken_middleware_1 = require("../middleware/verifyToken.middleware");
// Router from express.
const usersRouter = express_1.default.Router();
const jsonParser = body_parser_1.default.json();
usersRouter.route("/")
    // * GET
    .get(verifyToken_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Obtain the ID from the URL
    const id = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.id;
    // Generate controller instance to execute the desired method
    const controller = new UsersController_1.UsersController();
    // Get the response
    const response = yield controller.getUsers(id);
    // Send response to client
    return res.status(200).send(response);
}))
    // * DELETE
    .delete(verifyToken_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    // Obtain the ID from the URL
    const id = (_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.id;
    // Generate controller instance to execute the desired method
    const controller = new UsersController_1.UsersController();
    // Get the response
    const response = yield controller.deleteUser(id);
    // Send response to client
    return res.status(200).send(response);
}))
    // * PUT
    .put(jsonParser, verifyToken_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: ANALIZAR SI ESTE MÉTODO SE CONSERVA. MODIFICAR USUARIOS?
    var _c, _d, _e;
    // Obtain the ID from the URL
    const id = req.query.id;
    // Build new component through query params
    const component = {
        brand: (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.brand,
        model: (_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.model,
        price: (_e = req === null || req === void 0 ? void 0 : req.body) === null || _e === void 0 ? void 0 : _e.price
    };
    // Generate controller instance to execute the desired method
    const controller = new UsersController_1.UsersController();
    // Get the response
    const response = yield controller.updateUser(id, component);
    // Send response to client
    return res.status(200).send(response);
}));
exports.default = usersRouter;
//# sourceMappingURL=UsersRouter.js.map