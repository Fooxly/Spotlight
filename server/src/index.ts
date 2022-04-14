#!/usr/bin/env node
/* eslint-disable unicorn/no-process-exit */
import cors from 'cors';
import express from 'express';
import cmdargs from 'command-line-args';
import { json, urlencoded } from 'body-parser';

import { router } from '@/routes';

const optionDefinitions = [
    { name: 'port', alias: 'p', type: Number },
];
const options = cmdargs(optionDefinitions);
if (!options.port) options.port = 1898;

const app = express();

const CORS = cors({
    optionsSuccessStatus: 204,
    origin: true,
});

app.use(CORS);
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(router);
app.options('*', CORS);

void (() => {
    try {
        console.log(`Starting on PID ${process.pid} ...`);

        let connected = false;
        setTimeout(() => {
            if (!connected) throw new Error('TIMEOUT');
        }, 30_000);

        app.get('/health', (_, res) => {
            res.json({ status: connected ? 'OK' : 'STARTING' });
        });

        app.listen(options.port, () => {
            connected = true;
            console.log('Server has started on port:', options.port);
        });
    } catch (error) {
        console.error('Setup', error);
        process.exit(1);
    }
})();

// NOTE: only close process after cleanup
process.stdin.resume();

function cleanHandler (): void {
    console.log('Cleaning up ...');
    // void prisma.$disconnect();
    console.log('Done!');
}

function exitHandler (reason?: string | number | Error): void {
    console.log('');
    if (!reason) {
        console.error('Exiting due to unknown reason');
        process.exit(1);
    } else if (reason instanceof Error) {
        console.error('Exiting due to', reason);
        process.exit(1);
    } else {
        if ((reason ?? 0) === 0) {
            console.log('Exiting ...');
            process.exit(0);
        } else if (typeof reason === 'number') {
            console.error('Exiting with code', reason, '...');
            process.exit(reason ?? 0);
        } else {
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
