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
exports.shell = exports.question = exports.registerCommand = exports.registerPage = exports.unregister = void 0;
const utils_1 = require("../utils");
function updateSpotlightRegistry() {
    const ev = new CustomEvent(utils_1.UPDATE_SPOTLIGHT_EVENT_KEY, {
        bubbles: false,
    });
    // Add a small timeout to wait for possible rerenders inside the spotlight
    setTimeout(() => {
        document.dispatchEvent(ev);
    }, 10);
}
function unregister(title) {
    const commandIndex = utils_1.COMMANDS.findIndex((command) => command.title === title);
    if (commandIndex !== -1) {
        utils_1.COMMANDS.splice(commandIndex, 1);
    }
    const pagesIndex = utils_1.PAGES.findIndex((page) => page.title === title);
    if (pagesIndex !== -1) {
        utils_1.PAGES.splice(pagesIndex, 1);
    }
}
exports.unregister = unregister;
function registerPage(title, page, options) {
    const oldIndex = utils_1.PAGES.findIndex(({ title: oldTitle }) => oldTitle === title);
    if (oldIndex > -1)
        utils_1.PAGES.splice(oldIndex, 1);
    const oldCommandIndex = utils_1.COMMANDS.findIndex(({ title: oldTitle }) => oldTitle === title);
    if (oldCommandIndex > -1)
        utils_1.COMMANDS.splice(oldCommandIndex, 1);
    utils_1.PAGES.push({
        title,
        page,
        type: 'jump-to',
        options: Object.assign({ icon: 'redirect' }, options),
    });
    updateSpotlightRegistry();
    return () => unregister(title);
}
exports.registerPage = registerPage;
function registerCommand(title, action, options) {
    const oldIndex = utils_1.COMMANDS.findIndex(({ title: oldTitle }) => oldTitle === title);
    if (oldIndex > -1)
        utils_1.COMMANDS.splice(oldIndex, 1);
    const oldPageIndex = utils_1.PAGES.findIndex(({ title: oldTitle }) => oldTitle === title);
    if (oldPageIndex > -1)
        utils_1.PAGES.splice(oldPageIndex, 1);
    utils_1.COMMANDS.push({
        title,
        action,
        type: 'command',
        options,
    });
    updateSpotlightRegistry();
    return () => unregister(title);
}
exports.registerCommand = registerCommand;
function question(question, answers) {
    return new Promise((resolve) => {
        const handleRequest = (ev) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(utils_1.TEXT_INPUT_RESULT_EVENT_KEY, handleRequest);
            resolve(ev.detail.value);
        };
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(utils_1.TEXT_INPUT_RESULT_EVENT_KEY, handleRequest);
        const ev = new CustomEvent(utils_1.INPUT_TYPE_EVENT_KEY, {
            bubbles: false,
            detail: {
                type: ((answers === null || answers === void 0 ? void 0 : answers.length) ? 'question' : 'input'),
                question,
                answers,
            },
        });
        // Add a small timeout to wait for possible rerenders inside the spotlight
        setTimeout(() => {
            document.dispatchEvent(ev);
        }, 10);
    });
}
exports.question = question;
/* eslint-disable @typescript-eslint/no-throw-literal */
function shell(command, options) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const port = (_a = options === null || options === void 0 ? void 0 : options.port) !== null && _a !== void 0 ? _a : 1898;
        try {
            const raw = yield fetch(`http://localhost:${port}/cmd`, {
                method: 'POST',
                body: JSON.stringify({
                    command,
                    inTerminal: options === null || options === void 0 ? void 0 : options.externalTerminal,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const response = (yield raw.json());
            if (!response.success)
                throw { message: 'COMMAND_FAILED', port, reason: response.error, result: response.result };
            return (_b = response.result) !== null && _b !== void 0 ? _b : null;
        }
        catch (error) {
            if (error.message === 'Load failed')
                throw { message: 'SERVER_DOWN', port };
            throw { message: 'UNKNOWN', port, reason: error };
        }
    });
}
exports.shell = shell;
