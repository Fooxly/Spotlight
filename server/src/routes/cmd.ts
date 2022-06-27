import { exec, ExecException } from 'node:child_process';
import type { Request, Response } from 'express';

const currentDir = process.cwd();

export async function cmd (req: Request, res: Response) {
    try {
        req.on('close', () => {
            // TODO: force stop command below
        });

        const { command, inTerminal = false } = req.body as { command: string; inTerminal?: boolean };

        const result = await new Promise<string>((resolve, reject) => {
            if (inTerminal) {
                // TODO: code below is for macOS, add Windows/Linux support
                exec(`
osascript -e 'tell application "Terminal"
    activate
    do script "clear && cd \\"${currentDir}\\" && ${command} && echo Press any key to exit \\\\.\\\\.\\\\.; read -k1 -s && exit"
end tell'
                `, (error: ExecException | null, stdout) => {
                    if (error) return reject(new Error('TERMINAL_FAILED'));
                    resolve(stdout);
                });
            } else {
                exec(`cd "${currentDir}" && ${command}`, (error: ExecException | null, stdout) => {
                    if (error) return reject(error);
                    resolve(stdout);
                });
            }
        });

        res.json({ success: true, result });
    } catch (error) {
        res.json({ success: false, error });
    }
}
