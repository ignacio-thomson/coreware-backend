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
const bcrypt_1 = __importDefault(require("bcrypt"));
const AuthController_1 = require("../controller/AuthController");
const body_parser_1 = __importDefault(require("body-parser"));
const verifyToken_middleware_1 = require("../middleware/verifyToken.middleware");
// Body parser
const jsonParser = body_parser_1.default.json();
const authRouter = express_1.default.Router();
authRouter.route("/register")
    // * POST
    .post(jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const { firstName, lastName, age, email, password } = req === null || req === void 0 ? void 0 : req.body;
    let hashedPassword = "";
    if (firstName && lastName && age && email && password) {
        // Obtain password in the request, and hash it.
        hashedPassword = bcrypt_1.default.hashSync(password, 8);
        // Build new user with request body info.
        const newUser = {
            firstName,
            lastName,
            age,
            email,
            password: hashedPassword
        };
        // Generate new AuthController instance.
        const controller = new AuthController_1.AuthController();
        // Get response
        const response = yield controller.registerUser(newUser);
        // Send response to client
        return res.status(201).send(response);
    }
    else {
        // Send response to client in case of error while registering a new user.
        return res.status(400).send({
            message: `Fields cannot be empty when trying to register a new user.`
        });
    }
}));
authRouter.route("/login")
    .post(jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const { email, password } = req === null || req === void 0 ? void 0 : req.body;
    if (email && password) {
        // Build new auth with request body info.
        const auth = {
            email: email,
            password: password
        };
        // Generate new instance of AuthController.
        const controller = new AuthController_1.AuthController();
        // Get response
        const response = yield controller.loginUser(auth);
        //console.log(response)
        // Send response to client
        return res.status(200).send(response);
    }
    else {
        return res.status(400).send({
            message: "[ERROR USER DATA MISSING]"
        });
    }
}));
// Route protected by Verify Token Middleware
authRouter.route("/me")
    .get(verifyToken_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Obtain ID of user to check its data
    const id = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.id;
    if (id) {
        // Generate new instance of AuthController
        const controller = new AuthController_1.AuthController();
        // Obtain response
        const response = yield controller.userData(id);
        // Send response to client
        return res.status(200).send(response);
    }
    else {
        // Send response to client in case of error while trying to access data unverified.
        return res.status(401).send({
            message: "Not authorized"
        });
    }
}));
exports.default = authRouter;
//# sourceMappingURL=AuthRouter.js.map