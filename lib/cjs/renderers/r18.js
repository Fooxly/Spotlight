"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setup = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const client_1 = require("react-dom/client");
const utils_1 = require("../utils");
const components_1 = require("../components");
let root = null;
function setup(options) {
    var _a;
    const mainComponent = (0, utils_1.getMainComponent)();
    if (!mainComponent) {
        console.error('Spotlight was unable to create a root component.');
        void ((_a = options === null || options === void 0 ? void 0 : options.onLoadFailed) === null || _a === void 0 ? void 0 : _a.call(options, new Error('SPOTLIGHT_NO_ROOT_COMPONENT')));
        return;
    }
    if (!root) {
        root = (0, client_1.createRoot)(mainComponent);
    }
    root.render((0, jsx_runtime_1.jsx)(components_1.Master, Object.assign({}, options)));
}
exports.setup = setup;
