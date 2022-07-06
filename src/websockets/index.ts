import WebSocket from 'ws';

import { ShellCommand, ShellCommandResponse } from '@/types';

const ws = new WebSocket('ws://localhost:1898/shell');

ws.on('open', () => {
    ws.send(JSON.stringify({
        command: 'echo Hello World!',
        inExternalTerminal: false,
    } as ShellCommand));
});

ws.on('message', (data) => {
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    const val = data.toString();
    if (val === '[object Object]') return;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const json: ShellCommandResponse = JSON.parse(val);
    if (!json.success) return;

    console.log('received', json);
});
