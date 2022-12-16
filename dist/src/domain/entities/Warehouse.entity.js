"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.warehouseEntity = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const warehouseEntity = () => {
    let warehouseSchema = new mongoose_1.default.Schema({
        name: { type: String, required: true },
        location: { type: String, required: true },
        stockavailable: { type: Boolean, required: true }
    });
    return mongoose_1.default.models.Warehouses || mongoose_1.default.model('Warehouses', warehouseSchema, 'warehouses');
};
exports.warehouseEntity = warehouseEntity;
//# sourceMappingURL=Warehouse.entity.js.map