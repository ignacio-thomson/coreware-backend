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
exports.createDistributor = exports.updateDistributorById = exports.deleteDistributor = exports.getDistributorById = exports.getAllDistributors = void 0;
const Distributor_entity_1 = require("../entities/Distributor.entity");
const logger_1 = require("../../utils/logger");
// * CRUD Requests
// Method to get all the distributors from the Distributors collection in MongoDB with pagination
const getAllDistributors = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const distributorModel = (0, Distributor_entity_1.distributorEntity)();
        const response = {};
        // Search all distributors using pagination
        yield distributorModel.find({ isDeleted: false })
            .select("name address")
            .then((distributors) => {
            response.distributors = distributors;
        });
        return response;
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR] Getting all distributors ${error}`);
    }
});
exports.getAllDistributors = getAllDistributors;
// Get distributors by ID
const getDistributorById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const distributorModel = (0, Distributor_entity_1.distributorEntity)();
        return yield distributorModel.findById(id).select("name address");
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR] Getting distributor by ID ${error}`);
    }
});
exports.getDistributorById = getDistributorById;
// Delete distributors
const deleteDistributor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const distributorModel = (0, Distributor_entity_1.distributorEntity)();
        return yield distributorModel.deleteOne({ _id: id });
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR] Deleting distributor ${error}`);
    }
});
exports.deleteDistributor = deleteDistributor;
// Update distributors by ID-
const updateDistributorById = (id, distributor) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const distributorModel = (0, Distributor_entity_1.distributorEntity)();
        return yield distributorModel.findByIdAndUpdate(id, distributor);
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR] Updating distributor by ID ${error}`);
    }
});
exports.updateDistributorById = updateDistributorById;
// Create distributor
const createDistributor = (distributor) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const distributorModel = (0, Distributor_entity_1.distributorEntity)();
        return yield distributorModel.create(distributor);
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR] Creating new distributor ${error}`);
    }
});
exports.createDistributor = createDistributor;
//# sourceMappingURL=Distributor.orm.js.map