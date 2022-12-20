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
exports.ComponentController = void 0;
const tsoa_1 = require("tsoa");
const logger_1 = require("../utils/logger");
// Import ORM
const Component_orm_1 = require("../domain/orm/Component.orm");
let ComponentController = class ComponentController {
    /**
     * Endpoint to retrieve all the components in the collection.
     * @param id Optional id param to find a particular component.
     */
    getComponents(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = "";
            if (id) {
                response = yield (0, Component_orm_1.getComponentById)(id);
                (0, logger_1.LogSuccess)("[/api/components/] GET Component by ID request.");
            }
            else {
                response = yield (0, Component_orm_1.getAllComponents)();
                (0, logger_1.LogSuccess)("[/api/components/] GET Components request.");
            }
            return response;
        });
    }
    /**
     * Endpoint to delete a component from the collection.
     * @param id of the component thats going to be deleted.
     */
    deleteComponent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = "";
            if (id) {
                (0, Component_orm_1.deleteComponent)(id).then(() => {
                    (0, logger_1.LogSuccess)("[/api/components/] DELETE Component by ID request.");
                    response = {
                        message: `Component with ID: ${id} deleted succesfully.`
                    };
                });
            }
            else {
                (0, logger_1.LogWarning)("[/api/components/] DELETE Component by ID request.");
                response = {
                    message: `Please provide a valid ID.`
                };
            }
            return response;
        });
    }
    /**
     * Endpoint to update a component in the collection.
     * @param id of the component that is being updated.
     * @param component that is being updated.
     */
    updateComponent(id, component) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = "";
            if (id) {
                yield (0, Component_orm_1.updateComponentById)(id, component).then(() => {
                    (0, logger_1.LogSuccess)("[/api/components/] UPDATE Component by ID request.");
                    response = {
                        message: `Component with ID ${id} updated successfully.`
                    };
                });
            }
            else {
                (0, logger_1.LogWarning)("[/api/components/] UPDATE Component by ID request.");
                response = {
                    message: `Please provide a valid ID.`
                };
            }
            return response;
        });
    }
    /**
     * Endpoint to generate new document.
     * @param component that is being created in the Database
     */
    postComponents(component) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = "";
            if (component) {
                yield (0, Component_orm_1.createComponent)(component).then(() => {
                    response = {
                        message: `Component created succesfully: ${component.brand} - ${component.model}`
                    };
                });
                (0, logger_1.LogSuccess)(`[/api/components] POST new Component: ${component.brand}`);
            }
            else {
                (0, logger_1.LogWarning)("[/api/components] POST new Component");
                response = {
                    message: `Failed to create a new component, please provide a valid entry`
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
], ComponentController.prototype, "getComponents", null);
__decorate([
    (0, tsoa_1.Delete)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ComponentController.prototype, "deleteComponent", null);
__decorate([
    (0, tsoa_1.Put)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ComponentController.prototype, "updateComponent", null);
__decorate([
    (0, tsoa_1.Post)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ComponentController.prototype, "postComponents", null);
ComponentController = __decorate([
    (0, tsoa_1.Route)("/api/components"),
    (0, tsoa_1.Tags)("Components")
], ComponentController);
exports.ComponentController = ComponentController;
//# sourceMappingURL=ComponentsController.js.map