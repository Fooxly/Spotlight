"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const ws = new ws_1.default('ws://localhost:1898/shell');
ws.on('open', () => {
    ws.send(JSON.stringify({
        command: 'echo Hello World!',
        inExternalTerminal: false,
    }));
});
ws.on('message', (data) => {
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    const val = data.toString();
    if (val === '[object Object]')
        return;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const json = JSON.parse(val);
    if (!json.success)
        return;
    console.log('received', json);
});
