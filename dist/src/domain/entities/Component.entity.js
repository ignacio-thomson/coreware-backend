"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentEntity = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const componentEntity = () => {
    const componentSchema = new mongoose_1.default.Schema({
        brand: { type: String, required: true },
        model: { type: String, required: true },
        price: { type: Number, required: true }
    });
    return mongoose_1.default.models.Components || mongoose_1.default.model('Components', componentSchema, 'components');
};
exports.componentEntity = componentEntity;
//# sourceMappingURL=Component.entity.js.map