"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.distributorEntity = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const distributorEntity = () => {
    const distributorSchema = new mongoose_1.default.Schema({
        name: { type: String, required: true },
        address: { type: String, required: true },
    });
    return mongoose_1.default.models.Distributors || mongoose_1.default.model('Distributors', distributorSchema, 'distributors');
};
exports.distributorEntity = distributorEntity;
//# sourceMappingURL=Distributor.entity.js.map