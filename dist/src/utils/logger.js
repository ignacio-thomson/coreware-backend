"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogWarning = exports.LogInfo = exports.LogError = exports.LogSuccess = void 0;
const LogSuccess = (message) => {
    console.log("[SUCCESS]: " + message);
};
exports.LogSuccess = LogSuccess;
const LogError = (message) => {
    console.log("[ERROR]: " + message);
};
exports.LogError = LogError;
const LogInfo = (message) => {
    console.log("[INFO]: " + message);
};
exports.LogInfo = LogInfo;
const LogWarning = (message) => {
    console.log("[WARNING]: " + message);
};
exports.LogWarning = LogWarning;
//# sourceMappingURL=logger.js.map