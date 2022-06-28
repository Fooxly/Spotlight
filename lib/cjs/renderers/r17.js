"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Setup = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_dom_1 = __importDefault(require("react-dom"));
const utils_1 = require("../utils");
const components_1 = require("../components");
function Setup(options) {
    const mainComponent = (0, utils_1.getMainComponent)();
    if (!mainComponent) {
        console.error('Spotlight was unable to create a root component.');
        return;
    }
    react_dom_1.default.render((0, jsx_runtime_1.jsx)(components_1.Master, Object.assign({}, options)), mainComponent);
}
exports.Setup = Setup;
