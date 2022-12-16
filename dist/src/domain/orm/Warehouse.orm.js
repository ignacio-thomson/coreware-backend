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
exports.updateWarehouseById = exports.deleteWarehouse = exports.getWarehouseById = exports.getAllWarehouses = void 0;
const Warehouse_entity_1 = require("../entities/Warehouse.entity");
const logger_1 = require("../../utils/logger");
// CRUD Requests
// Method to get all the warehouses from the Warehouses collection in MongoDB with pagination
const getAllWarehouses = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let warehouseModel = (0, Warehouse_entity_1.warehouseEntity)();
        let response = {};
        // Search all warehouses using pagination
        yield warehouseModel.find({ isDeleted: false })
            .select("brand model price")
            .limit(limit)
            .skip((page - 1) * limit)
            .exec().then((warehouses) => {
            response.warehouses = warehouses;
        });
        yield warehouseModel.countDocuments().then((total) => {
            response.totalPages = Math.ceil(total / limit);
            response.currentPage = page;
        });
        return response;
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR] Getting all warehouses ${error}`);
    }
});
exports.getAllWarehouses = getAllWarehouses;
// Get warehouse by ID
const getWarehouseById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let warehouseModel = (0, Warehouse_entity_1.warehouseEntity)();
        return yield warehouseModel.findById(id).select("brand model price");
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR] Getting warehouse by ID ${error}`);
    }
});
exports.getWarehouseById = getWarehouseById;
// Delete warehouse
const deleteWarehouse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let warehouseModel = (0, Warehouse_entity_1.warehouseEntity)();
        return yield warehouseModel.deleteOne({ _id: id });
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR] Deleting warehouse ${error}`);
    }
});
exports.deleteWarehouse = deleteWarehouse;
// Update warehouse by ID-
const updateWarehouseById = (id, warehouses) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let warehouseModel = (0, Warehouse_entity_1.warehouseEntity)();
        return yield warehouseModel.findByIdAndUpdate(id, warehouses);
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR] Updating warehouse by ID ${error}`);
    }
});
exports.updateWarehouseById = updateWarehouseById;
//# sourceMappingURL=Warehouse.orm.js.map