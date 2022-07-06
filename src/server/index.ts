import { exec, ExecException } from 'node:child_process';
import { WebSocketServer } from 'ws';

import { ShellCommand, ShellCommandResponse } from '@/types';

const port = (process.argv?.[2] === '--port' || process.argv?.[2] === '-p' ? Number(process.argv?.[3]) : 1898) ?? 1898;

const wss = new WebSocketServer({ port, perMessageDeflate: false, path: '/shell' });
const currentDir = process.cwd();

console.log(`Running Spotlight server on port \u001B[32m${port}\u001B[0m`);
wss.on('connection', (ws) => {
    ws.on('message', async (data) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-base-to-string
            const val = data.toString();
            if (val === '[object Object]') return;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const json: ShellCommand = JSON.parse(val);
            if (!json.command) return;

            const result = await new Promise<string>((resolve, reject) => {
                if (json.inExternalTerminal) {
                    // TODO: code below is for macOS, add Windows/Linux support
                    exec(`
    osascript -e 'tell application "Terminal"
        activate
        do script "clear && cd \\"${currentDir}\\" && ${json.command.replaceAll('"', '\\"')} && echo Press any key to exit \\\\.\\\\.\\\\.; read -k1 -s && exit"
    end tell'
                    `, (error: ExecException | null, stdout) => {
                        if (error) return reject(new Error('TERMINAL_FAILED'));
                        resolve(stdout);
                    });
                } else {
                    exec(`cd "${currentDir}" && ${json.command}`, (error: ExecException | null, stdout) => {
                        if (error) return reject(error);
                        resolve(stdout);
                    });
                }
            });
            ws.send(JSON.stringify({
                success: true,
                result,
            } as ShellCommandResponse));
        } catch (error) {
            console.log(error);
            ws.send(JSON.stringify({
                success: false,
                error,
            } as ShellCommandResponse));
        }
    });
});
