"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setup = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_dom_1 = __importDefault(require("react-dom"));
const utils_1 = require("../utils");
const components_1 = require("../components");
function setup(options) {
    var _a;
    const mainComponent = (0, utils_1.getMainComponent)();
    if (!mainComponent) {
        if (typeof window !== 'undefined') {
            console.error('Spotlight was unable to create a root component.');
            void ((_a = options === null || options === void 0 ? void 0 : options.onLoadFailed) === null || _a === void 0 ? void 0 : _a.call(options, new Error('SPOTLIGHT_NO_ROOT_COMPONENT')));
        }
        return;
    }
    react_dom_1.default.render((0, jsx_runtime_1.jsx)(components_1.Master, Object.assign({}, options)), mainComponent);
}
exports.setup = setup;
