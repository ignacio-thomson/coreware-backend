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
exports.createWarehouse = exports.updateWarehouseById = exports.deleteWarehouse = exports.getWarehouseById = exports.getAllWarehouses = void 0;
const Warehouse_entity_1 = require("../entities/Warehouse.entity");
const logger_1 = require("../../utils/logger");
// * CRUD Requests
// Method to get all the warehouses from the Warehouses collection in MongoDB with pagination
const getAllWarehouses = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const warehouseModel = (0, Warehouse_entity_1.warehouseEntity)();
        const response = {};
        // Search all warehouses using pagination
        yield warehouseModel.find({ isDeleted: false })
            .select("name location")
            .then((warehouses) => {
            response.warehouses = warehouses;
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
        const warehouseModel = (0, Warehouse_entity_1.warehouseEntity)();
        return yield warehouseModel.findById(id).select("name location");
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR] Getting warehouse by ID ${error}`);
    }
});
exports.getWarehouseById = getWarehouseById;
// Delete warehouse
const deleteWarehouse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const warehouseModel = (0, Warehouse_entity_1.warehouseEntity)();
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
        const warehouseModel = (0, Warehouse_entity_1.warehouseEntity)();
        return yield warehouseModel.findByIdAndUpdate(id, warehouses);
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR] Updating warehouse by ID ${error}`);
    }
});
exports.updateWarehouseById = updateWarehouseById;
// Create warehouse
const createWarehouse = (warehouse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const warehouseModel = (0, Warehouse_entity_1.warehouseEntity)();
        return yield warehouseModel.create(warehouse);
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR] Creating new warehouse ${error}`);
    }
});
exports.createWarehouse = createWarehouse;
//# sourceMappingURL=Warehouse.orm.js.map