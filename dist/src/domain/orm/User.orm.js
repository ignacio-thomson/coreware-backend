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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserById = exports.deleteUser = exports.getUserById = exports.getAllUsers = void 0;
const User_entity_1 = require("../entities/User.entity");
const logger_1 = require("../../utils/logger");
// * CRUD Requests
// Method to get all the users from the Users collection in MongoDB with pagination
const getAllUsers = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersModel = (0, User_entity_1.userEntity)();
        const response = {};
        // Search all users using pagination
        yield usersModel.find({ isDeleted: false })
            .select("firstName lastName age email")
            .limit(limit)
            .skip((page - 1) * limit)
            .exec().then((users) => {
            response.users = users;
        });
        yield usersModel.countDocuments().then((total) => {
            response.totalPages = Math.ceil(total / limit);
            response.currentPage = page;
        });
        return response;
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR] Getting all users ${error}`);
    }
});
exports.getAllUsers = getAllUsers;
// Get user by ID
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersModel = (0, User_entity_1.userEntity)();
        return yield usersModel.findById(id).select("brand model price");
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR] Getting user by ID ${error}`);
    }
});
exports.getUserById = getUserById;
// Delete user
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersModel = (0, User_entity_1.userEntity)();
        return yield usersModel.deleteOne({ _id: id });
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR] Deleting user ${error}`);
    }
});
exports.deleteUser = deleteUser;
// Update user by ID-
const updateUserById = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersModel = (0, User_entity_1.userEntity)();
        return yield usersModel.findByIdAndUpdate(id, user);
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR] Updating user by ID ${error}`);
    }
});
exports.updateUserById = updateUserById;
//# sourceMappingURL=User.orm.js.map