"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Setup = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const client_1 = require("react-dom/client");
const utils_1 = require("../utils");
const components_1 = require("../components");
let root = null;
function Setup(options) {
    const mainComponent = (0, utils_1.getMainComponent)();
    if (!mainComponent) {
        console.error('Spotlight was unable to create a root component.');
        return;
    }
    if (!root) {
        root = (0, client_1.createRoot)(mainComponent);
    }
    root.render((0, jsx_runtime_1.jsx)(components_1.Master, Object.assign({}, options)));
}
exports.Setup = Setup;
