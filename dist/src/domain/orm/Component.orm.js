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
exports.createComponent = exports.updateComponentById = exports.deleteComponent = exports.getComponentById = exports.getAllComponents = void 0;
const Component_entity_1 = require("../entities/Component.entity");
const logger_1 = require("../../utils/logger");
// * CRUD Requests
// Method to get all the components from the Components collection in MongoDB with pagination
const getAllComponents = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const componentModel = (0, Component_entity_1.componentEntity)();
        const response = {};
        // Search all components using pagination
        yield componentModel.find({ isDeleted: false })
            .select("brand model price")
            .then((components) => {
            response.components = components;
        });
        return response;
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR] Getting all components ${error}`);
    }
});
exports.getAllComponents = getAllComponents;
// Get component by ID
const getComponentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const componentModel = (0, Component_entity_1.componentEntity)();
        return yield componentModel.findById(id).select("brand model price");
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR] Getting component by ID ${error}`);
    }
});
exports.getComponentById = getComponentById;
// Delete component
const deleteComponent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const componentModel = (0, Component_entity_1.componentEntity)();
        return yield componentModel.deleteOne({ _id: id });
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR] Deleting component ${error}`);
    }
});
exports.deleteComponent = deleteComponent;
// Update component by ID-
const updateComponentById = (id, component) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const componentModel = (0, Component_entity_1.componentEntity)();
        return yield componentModel.findByIdAndUpdate(id, component);
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR] Updating component by ID ${error}`);
    }
});
exports.updateComponentById = updateComponentById;
// Create component
const createComponent = (component) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const componentModel = (0, Component_entity_1.componentEntity)();
        return yield componentModel.create(component);
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR] Creating new component ${error}`);
    }
});
exports.createComponent = createComponent;
//# sourceMappingURL=Component.orm.js.map