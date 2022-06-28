"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/brace-style */
const react_1 = __importDefault(require("react"));
const utils_1 = require("./utils");
const commands_1 = require("./commands");
const DefaultConfig = {
    devMode: false,
    appearance: 'auto',
    spotlightShortcut: 'cmd+shift+k, ctrl+shift+k',
    colorPickerShortcut: undefined,
    showRecentlyUsed: 5,
    showTips: true,
};
let lastConfigSettings = DefaultConfig;
function Config(options) {
    // Merge the default options (or last chosen options) with the new user chosen ones
    lastConfigSettings = Object.assign(Object.assign({}, lastConfigSettings), options);
    // Get the major react version the project is running on
    const majorReactVersion = Number(react_1.default.version.split('.')[0]);
    // #region React 18 and above
    if (majorReactVersion >= 18) {
        void (() => __awaiter(this, void 0, void 0, function* () {
            const { Setup } = yield Promise.resolve().then(() => __importStar(require('./renderers/r18')));
            Setup(lastConfigSettings);
        }))();
    }
    // #endregion
    // #region React 15 - 17
    else if (majorReactVersion >= 15 && majorReactVersion <= 17) {
        void (() => __awaiter(this, void 0, void 0, function* () {
            const { Setup } = yield Promise.resolve().then(() => __importStar(require('./renderers/r17')));
            Setup(lastConfigSettings);
        }))();
    }
    // #endregion
    // #region Older React Versions
    else {
        console.error(`Spotlight was not able to start. Your current React version is not supported. Please refer to our Readme for the available versions. (Found React version: ${react_1.default.version})`);
    }
    // #endregion
}
function SetAppearance(appearance) {
    if (typeof window === 'undefined') {
        console.error('Unable to set appearance. Window is not defined.');
        return;
    }
    const ev = new CustomEvent(utils_1.THEME_UPDATE_EVENT_KEY, {
        bubbles: false,
        detail: {
            appearance,
        },
    });
    document.dispatchEvent(ev);
}
__exportStar(require("./commands"), exports);
exports.default = {
    Config,
    SetAppearance,
    registerPage: commands_1.registerPage,
    registerCommand: commands_1.registerCommand,
    unregister: commands_1.unregister,
    question: commands_1.question,
    shell: commands_1.shell,
    toast: commands_1.toast,
    pickColor: commands_1.pickColor,
};
