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
exports.WarehouseController = void 0;
const tsoa_1 = require("tsoa");
const logger_1 = require("../utils/logger");
// Import ORM
const Warehouse_orm_1 = require("../domain/orm/Warehouse.orm");
let WarehouseController = class WarehouseController {
    /**
     * Endpoint to retrieve all the warehouses in the collection.
     * @param page Define the page that wants to be seen.
     * @param limit Define the limit of elements per page.
     * @param id Optional id param to find a particular warehouse.
     */
    getWarehouses(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = "";
            if (id) {
                response = yield (0, Warehouse_orm_1.getWarehouseById)(id);
                (0, logger_1.LogSuccess)("[/api/warehouses/] GET Warehouse by ID request.");
            }
            else {
                response = yield (0, Warehouse_orm_1.getAllWarehouses)();
                (0, logger_1.LogSuccess)("[/api/warehouses/] GET Warehouses request.");
            }
            return response;
        });
    }
    /**
     * Endpoint to delete a warehouse from the collection.
     * @param id of the warehouse thats going to be deleted.
     */
    deleteWarehouse(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = "";
            if (id) {
                (0, Warehouse_orm_1.deleteWarehouse)(id).then(() => {
                    (0, logger_1.LogSuccess)("[/api/warehouses/] DELETE Warehouse by ID request.");
                    response = {
                        message: `Warehouse with ID: ${id} deleted succesfully.`
                    };
                });
            }
            else {
                (0, logger_1.LogWarning)("[/api/warehouses/] DELETE Warehouse by ID request.");
                response = {
                    message: `Please provide a valid ID.`
                };
            }
            return response;
        });
    }
    /**
     * Endpoint to update a warehouse in the collection.
     * @param id of the warehouse that is being updated.
     * @param warehouse that is being updated.
     */
    updateWarehouse(id, warehouse) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = "";
            if (id) {
                yield (0, Warehouse_orm_1.updateWarehouseById)(id, warehouse).then(() => {
                    (0, logger_1.LogSuccess)("[/api/warehouses/] UPDATE Warehouse by ID request.");
                    response = {
                        message: `Warehouse with ID ${id} updated successfully.`
                    };
                });
            }
            else {
                (0, logger_1.LogWarning)("[/api/warehouses/] UPDATE Warehouse by ID request.");
                response = {
                    message: `Please provide a valid ID.`
                };
            }
            return response;
        });
    }
    /**
     * Endpoint to generate new document.
     * @param warehouse that is going to be created in the Database.
     */
    postWarehouse(warehouse) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = "";
            if (warehouse) {
                yield (0, Warehouse_orm_1.createWarehouse)(warehouse).then(() => {
                    response = {
                        message: `Warehouse created succesfully: ${warehouse.name} - ${warehouse.location}`
                    };
                });
                (0, logger_1.LogSuccess)(`[/api/warehouses] POST new Warehouse: ${warehouse.name}`);
            }
            else {
                (0, logger_1.LogWarning)("[/api/warehouses] POST new Warehouse");
                response = {
                    message: `Failed to create a new warehouse, please provide a valid entry`
                };
            }
            return response;
        });
    }
};
__decorate([
    (0, tsoa_1.Get)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WarehouseController.prototype, "getWarehouses", null);
__decorate([
    (0, tsoa_1.Delete)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WarehouseController.prototype, "deleteWarehouse", null);
__decorate([
    (0, tsoa_1.Put)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], WarehouseController.prototype, "updateWarehouse", null);
__decorate([
    (0, tsoa_1.Post)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WarehouseController.prototype, "postWarehouse", null);
WarehouseController = __decorate([
    (0, tsoa_1.Route)("/api/warehouses"),
    (0, tsoa_1.Tags)("Warehouses")
], WarehouseController);
exports.WarehouseController = WarehouseController;
//# sourceMappingURL=WarehousesController.js.map