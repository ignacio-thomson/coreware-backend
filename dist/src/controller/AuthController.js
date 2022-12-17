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
const User_orm_1 = require("../domain/orm/User.orm");
let AuthController = class AuthController {
    /**
     * Endpoint to retrieve all the users in the collection.
     * @param page Define the page that wants to be seen.
     * @param limit Define the limit of elements per page.
     * @param id Optional id param to find a particular user.
     */
    registerUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = "";
            if (user) {
                yield (0, Auth_orm_1.registerUser)(user).then(() => {
                    response = {
                        message: `User registered succesfully ${user.firstName} ${user.lastName}`
                    };
                });
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
     * Endpoint to delete a user from the collection.
     * @param id of the user thats going to be deleted.
     */
    loginUser(auth) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            if (auth) {
                let data = yield (0, Auth_orm_1.loginUser)(auth);
                response = {
                    message: `Bienvenido, ${data.user.firstName}`,
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
    logoutUser() {
        throw new Error("Method not implemented.");
    }
    userData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = "";
            if (id) {
                (0, logger_1.LogSuccess)(`[/api/users] Get user data by ID ${id}`);
                response = yield (0, User_orm_1.getUserById)(id);
            }
            else {
                (0, logger_1.LogWarning)("[/api/users] Get user by ID request");
                response = {
                    message: "A valid ID must be used"
                };
            }
            ;
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
__decorate([
    (0, tsoa_1.Get)("/me"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userData", null);
AuthController = __decorate([
    (0, tsoa_1.Route)("/api/auth"),
    (0, tsoa_1.Tags)("Users")
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map