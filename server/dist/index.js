#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable unicorn/no-process-exit */
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var command_line_args_1 = __importDefault(require("command-line-args"));
var body_parser_1 = require("body-parser");
var routes_1 = require("./routes");
var optionDefinitions = [
    { name: 'port', alias: 'p', type: Number },
];
var options = (0, command_line_args_1.default)(optionDefinitions);
if (!options.port)
    options.port = 1898;
var app = (0, express_1.default)();
var CORS = (0, cors_1.default)({
    optionsSuccessStatus: 204,
    origin: true,
});
app.use(CORS);
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.urlencoded)({ extended: true }));
app.use(routes_1.router);
app.options('*', CORS);
void (function () {
    try {
        console.log("Starting on PID ".concat(process.pid, " ..."));
        var connected_1 = false;
        setTimeout(function () {
            if (!connected_1)
                throw new Error('TIMEOUT');
        }, 30000);
        app.get('/health', function (_, res) {
            res.json({ status: connected_1 ? 'OK' : 'STARTING' });
        });
        app.listen(options.port, function () {
            connected_1 = true;
            console.log('Server has started on port:', options.port);
        });
    }
    catch (error) {
        console.error('Setup', error);
        process.exit(1);
    }
})();
// NOTE: only close process after cleanup
process.stdin.resume();
function cleanHandler() {
    console.log('Cleaning up ...');
    // void prisma.$disconnect();
    console.log('Done!');
}
function exitHandler(reason) {
    console.log('');
    if (!reason) {
        console.error('Exiting due to unknown reason');
        process.exit(1);
    }
    else if (reason instanceof Error) {
        console.error('Exiting due to', reason);
        process.exit(1);
    }
    else {
        if ((reason !== null && reason !== void 0 ? reason : 0) === 0) {
            console.log('Exiting ...');
            process.exit(0);
        }
        else if (typeof reason === 'number') {
            console.error('Exiting with code', reason, '...');
            process.exit(reason !== null && reason !== void 0 ? reason : 0);
        }
        else {
            console.error('Exiting with signal', reason, '...');
            process.exit(0);
        }
    }
}
process.on('exit', cleanHandler);
process.on('uncaughtException', exitHandler);
// CTRL+C
process.on('SIGINT', exitHandler);
// "kill pid" (eg.: `nodemon restart`)
process.on('SIGUSR1', exitHandler);
process.on('SIGUSR2', exitHandler);
