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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
const node_child_process_1 = require("node:child_process");
const ws_1 = require("ws");
const port = (_d = (((_a = process.argv) === null || _a === void 0 ? void 0 : _a[2]) === '--port' || ((_b = process.argv) === null || _b === void 0 ? void 0 : _b[2]) === '-p' ? Number((_c = process.argv) === null || _c === void 0 ? void 0 : _c[3]) : 1898)) !== null && _d !== void 0 ? _d : 1898;
const wss = new ws_1.WebSocketServer({ port, perMessageDeflate: false, path: '/shell' });
const currentDir = process.cwd();
console.log(`Running Spotlight server on port \u001B[32m${port}\u001B[0m`);
wss.on('connection', (ws) => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    ws.on('message', (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // eslint-disable-next-line @typescript-eslint/no-base-to-string
            const val = data.toString();
            if (val === '[object Object]')
                return;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const json = JSON.parse(val);
            if (!json.command)
                return;
            const result = yield new Promise((resolve, reject) => {
                if (json.inExternalTerminal) {
                    // TODO: code below is for macOS, add Windows/Linux support
                    (0, node_child_process_1.exec)(`
    osascript -e 'tell application "Terminal"
        activate
        do script "clear && cd \\"${currentDir}\\" && ${json.command.replace(/"/gm, '\\"')} && echo Press any key to exit \\\\.\\\\.\\\\.; read -k1 -s && exit"
    end tell'
                    `, (error, stdout) => {
                        if (error)
                            return reject(new Error('TERMINAL_FAILED'));
                        resolve(stdout);
                    });
                }
                else {
                    (0, node_child_process_1.exec)(`cd "${currentDir}" && ${json.command}`, (error, stdout) => {
                        if (error)
                            return reject(error);
                        resolve(stdout);
                    });
                }
            });
            ws.send(JSON.stringify({
                success: true,
                result,
            }));
        }
        catch (error) {
            ws.send(JSON.stringify({
                success: false,
                error,
            }));
        }
    }));
});
