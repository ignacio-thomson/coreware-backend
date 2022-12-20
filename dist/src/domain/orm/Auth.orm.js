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
exports.loginUser = exports.registerUser = void 0;
const User_entity_1 = require("../entities/User.entity");
const logger_1 = require("../../utils/logger");
const dotenv_1 = __importDefault(require("dotenv"));
// Config .env file
dotenv_1.default.config();
const secret = process.env.SECRETKEY || "SECRETKEY";
// BCrypt to hash passwords
const bcrypt_1 = __importDefault(require("bcrypt"));
// Jason Web Token (JWT)
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Register user method
const registerUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userModel = (0, User_entity_1.userEntity)();
        // Create new user
        return yield userModel.create(user);
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR] Creating new user ${error}`);
    }
});
exports.registerUser = registerUser;
// Authenticate/Login user
const loginUser = (auth) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userModel = (0, User_entity_1.userEntity)();
        let userFound = undefined;
        let token = undefined;
        // Check if user exists by its email
        yield userModel.findOne({ email: auth.email }).then((user) => {
            userFound = user;
        }).catch((error) => {
            console.error(`[AUTH ERROR IN ORM] User not found`);
            throw new Error(`[AUTH ERROR IN ORM] User not found ${error}`);
        });
        const validPassword = bcrypt_1.default.compareSync(auth.password, userFound.password);
        if (!validPassword) {
            console.error(`[AUTH ERROR IN ORM] > Invalid password`);
            throw new Error(`[AUTH ERROR IN ORM] > Invalid password`);
        }
        // Generate JWT Token
        token = jsonwebtoken_1.default.sign({ email: userFound.email }, secret, {
            expiresIn: "24h"
        });
        return {
            user: userFound,
            token: token
        };
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR] > Error while logging user in ${error}`);
    }
});
exports.loginUser = loginUser;
//# sourceMappingURL=Auth.orm.js.map