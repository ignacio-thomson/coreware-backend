"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const tsoa_1 = require("tsoa");
const logger_1 = require("../utils/logger");
// Import ORM
const Auth_orm_1 = require("../domain/orm/Auth.orm");
let AuthController = class AuthController {
    /**
     * Endpoint to register a new user in the User collection.
     * @param user that will be created.
     * @returns the response, which in turn confirms if the user was or not created succesfully.
     */
    registerUser(user) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let response = "";
            if (user) {
                yield ((_a = (0, Auth_orm_1.registerUser)(user)) === null || _a === void 0 ? void 0 : _a.then(() => {
                    response = {
                        message: `User registered succesfully ${user.firstName} ${user.lastName}`
                    };
                }));
                (0, logger_1.LogSuccess)(`[/api/auth/register] New user registered succesfully ${user.firstName} ${user.lastName}`);
            }
            else {
                response = {
                    message: `Failed to register a new user, please provide a valid user to create.`
                };
                (0, logger_1.LogWarning)(`[/api/auth/register] A valid user needs to be provided in order to register it.`);
            }
            return response;
        });
    }
    /**
     * Endpoint to log in, and be able to consume the different endpoints of the API that require a JWT verification.
     * @param auth -> credentials used to complete the log in. (email & password)
     * @returns the response, which in turn returns a greeting message and the token needed to consume different resources.
     */
    loginUser(auth) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            if (auth) {
                const data = yield (0, Auth_orm_1.loginUser)(auth);
                response = {
                    message: `Welcome, ${data.user.firstName}`,
                    token: data.token
                };
                (0, logger_1.LogSuccess)(`[/api/auth/login] User logged in succesfully: ${auth.email}`);
            }
            else {
                response = {
                    message: `Please provide a valid email and password to log in.`,
                    token: `Invalid token`
                };
                (0, logger_1.LogWarning)("[/api/users/login] A valid user is needed to log in.");
            }
            console.log(response);
            return response;
        });
    }
};
__decorate([
    (0, tsoa_1.Post)("/register"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerUser", null);
__decorate([
    (0, tsoa_1.Post)("/login"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginUser", null);
AuthController = __decorate([
    (0, tsoa_1.Route)("/api/auth"),
    (0, tsoa_1.Tags)("Users")
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map