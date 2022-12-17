"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userEntity = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userEntity = () => {
    const userSchema = new mongoose_1.default.Schema({
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        age: { type: Number, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true }
    });
    return mongoose_1.default.models.Users || mongoose_1.default.model('Users', userSchema, 'users');
};
exports.userEntity = userEntity;
//# sourceMappingURL=User.entity.js.map