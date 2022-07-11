import { ShellCommand, ShellCommandResponse, ShellOptions } from '@/types';
import { ERRORS } from '@/utils';

export function shell (command: string, options?: ShellOptions): Promise<string | null> {
    const port = options?.port ?? 1898;
    return new Promise<string | null>((resolve, reject) => {
        const ws = new WebSocket('ws://localhost:1898/shell');
        ws.addEventListener('open', () => {
            ws.send(JSON.stringify({
                command,
                inExternalTerminal: options?.inExternalTerminal ?? false,
            } as ShellCommand));
        });
        ws.addEventListener('message', (ev) => {
            // eslint-disable-next-line @typescript-eslint/no-base-to-string
            const val = (ev.data as string);
            if (val === '[object Object]') return;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const json: ShellCommandResponse = JSON.parse(val);
            if (!json.success) {
                // eslint-disable-next-line prefer-promise-reject-errors
                reject({
                    message: ERRORS.COMMAND_FAILED,
                    port,
                    reason: json.error,
                    result: json.result,
                });
            }
            resolve(json.result ?? null);
            ws.close();
        });

        ws.addEventListener('error', () => {
            if (ws.readyState === WebSocket.CLOSED) {
                // eslint-disable-next-line prefer-promise-reject-errors
                reject({
                    message: ERRORS.SERVER_DOWN,
                    port,
                });
                return;
            }
            ws.close();
            // eslint-disable-next-line prefer-promise-reject-errors
            reject({
                message: ERRORS.UNKNOWN,
                port,
            });
        });
    });
}
