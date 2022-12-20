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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.UsersController = void 0;
const tsoa_1 = require("tsoa");
const logger_1 = require("../utils/logger");
// Import ORM
const User_orm_1 = require("../domain/orm/User.orm");
let UsersController = class UsersController {
    /**
     * Endpoint to retrieve all the users in the collection.
     * @param page Define the page that wants to be seen.
     * @param limit Define the limit of elements per page.
     * @param id Optional id param to find a particular user.
     */
    getUsers(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = "";
            if (id) {
                response = yield (0, User_orm_1.getUserById)(id);
                (0, logger_1.LogSuccess)("[/api/users/] GET User by ID request.");
            }
            else {
                response = yield (0, User_orm_1.getAllUsers)();
                (0, logger_1.LogSuccess)("[/api/users/] GET User request.");
            }
            return response;
        });
    }
    /**
     * Endpoint to delete a user from the collection.
     * @param id of the user thats going to be deleted.
     */
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = "";
            if (id) {
                (0, User_orm_1.deleteUser)(id).then(() => {
                    (0, logger_1.LogSuccess)("[/api/users/] DELETE User by ID request.");
                    response = {
                        message: `User with ID: ${id} deleted succesfully.`
                    };
                });
            }
            else {
                (0, logger_1.LogWarning)("[/api/users/] DELETE User by ID request.");
                response = {
                    message: `Please provide a valid ID.`
                };
            }
            return response;
        });
    }
    /**
     * Endpoint to update a user in the collection.
     * @param id of the user that is being updated.
     * @param user that is being updated.
     */
    updateUser(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = "";
            if (id) {
                yield (0, User_orm_1.updateUserById)(id, user).then(() => {
                    (0, logger_1.LogSuccess)("[/api/users/] UPDATE User by ID request.");
                    response = {
                        message: `User with ID ${id} updated successfully.`
                    };
                });
            }
            else {
                (0, logger_1.LogWarning)("[/api/users/] UPDATE User by ID request.");
                response = {
                    message: `Please provide a valid ID.`
                };
            }
            return response;
        });
    }
};
__decorate([
    (0, tsoa_1.Get)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsers", null);
__decorate([
    (0, tsoa_1.Delete)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
__decorate([
    (0, tsoa_1.Put)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
UsersController = __decorate([
    (0, tsoa_1.Route)("/api/users"),
    (0, tsoa_1.Tags)("Users")
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=UsersController.js.map