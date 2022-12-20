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
exports.DistributorController = void 0;
const tsoa_1 = require("tsoa");
const logger_1 = require("../utils/logger");
// Import ORM
const Distributor_orm_1 = require("../domain/orm/Distributor.orm");
let DistributorController = class DistributorController {
    /**
     * Endpoint to retrieve all the distributors in the collection.
     * @param page Define the page that wants to be seen.
     * @param limit Define the limit of elements per page.
     * @param id Optional id param to find a particular distributors.
     */
    getDistributors(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = "";
            if (id) {
                response = yield (0, Distributor_orm_1.getDistributorById)(id);
                (0, logger_1.LogSuccess)("[/api/distributors/] GET Distributors by ID request.");
            }
            else {
                response = yield (0, Distributor_orm_1.getAllDistributors)();
                (0, logger_1.LogSuccess)("[/api/distributors/] GET Distributors request.");
            }
            return response;
        });
    }
    /**
     * Endpoint to delete a distributor from the collection.
     * @param id of the distributor thats going to be deleted.
     */
    deleteDistributor(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = "";
            if (id) {
                (0, Distributor_orm_1.deleteDistributor)(id).then(() => {
                    (0, logger_1.LogSuccess)("[/api/distributors/] DELETE Distributor by ID request.");
                    response = {
                        message: `Distributor with ID: ${id} deleted succesfully.`
                    };
                });
            }
            else {
                (0, logger_1.LogWarning)("[/api/distributors/] DELETE Distributor by ID request.");
                response = {
                    message: `Please provide a valid ID.`
                };
            }
            return response;
        });
    }
    /**
     * Endpoint to update a distributor in the collection.
     * @param id of the distributor that is being updated.
     * @param distributor that is being updated.
     */
    updateDistributor(id, distributor) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = "";
            if (id) {
                yield (0, Distributor_orm_1.updateDistributorById)(id, distributor).then(() => {
                    (0, logger_1.LogSuccess)("[/api/distributors/] UPDATE Distributor by ID request.");
                    response = {
                        message: `Distributor with ID ${id} updated successfully.`
                    };
                });
            }
            else {
                (0, logger_1.LogWarning)("[/api/distributors/] UPDATE Distributor by ID request.");
                response = {
                    message: `Please provide a valid ID.`
                };
            }
            return response;
        });
    }
    postDistributor(distributor) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = "";
            if (distributor) {
                yield (0, Distributor_orm_1.createDistributor)(distributor).then(() => {
                    response = {
                        message: `Distributor created succesfully: ${distributor.name} - ${distributor.address}`
                    };
                });
                (0, logger_1.LogSuccess)(`[/api/distributors] POST new Distributor: ${distributor.name}`);
            }
            else {
                (0, logger_1.LogWarning)("[/api/distributors] POST new Distributor");
                response = {
                    message: `Failed to create a new distributor, please provide a valid entry`
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
], DistributorController.prototype, "getDistributors", null);
__decorate([
    (0, tsoa_1.Delete)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DistributorController.prototype, "deleteDistributor", null);
__decorate([
    (0, tsoa_1.Put)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DistributorController.prototype, "updateDistributor", null);
__decorate([
    (0, tsoa_1.Post)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DistributorController.prototype, "postDistributor", null);
DistributorController = __decorate([
    (0, tsoa_1.Route)("/api/distributors"),
    (0, tsoa_1.Tags)("Distributors")
], DistributorController);
exports.DistributorController = DistributorController;
//# sourceMappingURL=DistributorsController.js.map