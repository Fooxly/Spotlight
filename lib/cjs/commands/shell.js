"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shell = void 0;
const utils_1 = require("../utils");
function shell(command, options) {
    var _a;
    const port = (_a = options === null || options === void 0 ? void 0 : options.port) !== null && _a !== void 0 ? _a : 1898;
    return new Promise((resolve, reject) => {
        const ws = new WebSocket('ws://localhost:1898/shell');
        ws.addEventListener('open', () => {
            var _a;
            ws.send(JSON.stringify({
                command,
                inExternalTerminal: (_a = options === null || options === void 0 ? void 0 : options.inExternalTerminal) !== null && _a !== void 0 ? _a : false,
            }));
        });
        ws.addEventListener('message', (ev) => {
            var _a;
            // eslint-disable-next-line @typescript-eslint/no-base-to-string
            const val = ev.data;
            if (val === '[object Object]')
                return;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const json = JSON.parse(val);
            if (!json.success) {
                // eslint-disable-next-line prefer-promise-reject-errors
                reject({
                    message: utils_1.ERRORS.COMMAND_FAILED,
                    port,
                    reason: json.error,
                    result: json.result,
                });
            }
            resolve((_a = json.result) !== null && _a !== void 0 ? _a : null);
            ws.close();
        });
        ws.addEventListener('error', () => {
            if (ws.readyState === WebSocket.CLOSED) {
                // eslint-disable-next-line prefer-promise-reject-errors
                reject({
                    message: utils_1.ERRORS.SERVER_DOWN,
                    port,
                });
                return;
            }
            ws.close();
            // eslint-disable-next-line prefer-promise-reject-errors
            reject({
                message: utils_1.ERRORS.UNKNOWN,
                port,
            });
        });
    });
}
exports.shell = shell;
