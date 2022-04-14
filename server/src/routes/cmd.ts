import { exec, ExecException } from 'node:child_process';
import type { Request, Response } from 'express';

const currentDir = process.cwd();

export async function cmd (req: Request, res: Response) {
    try {
        req.on('close', () => {
            // TODO: force stop command below
        });

        const { command, inTerminal = false } = req.body as { command: string; inTerminal?: boolean };

        await new Promise<void>((resolve, reject) => {
            const callback = (error: ExecException | null) => {
                if (error) return reject(error);
                resolve();
            };

            if (inTerminal) {
                // TODO: code below is for macOS, add Windows/Linux support
                exec(`
osascript -e 'tell application "Terminal"
    activate
    do script "clear && cd \\"${currentDir}\\" && ${command} && echo Press any key to exit \\\\.\\\\.\\\\.; read -k1 -s && exit"
end tell'
                `, callback);
            } else {
                exec(`cd "${currentDir}" && ${command}`, callback);
            }
        });

        res.json({ success: true });
    } catch (error) {
        console.error('cmd', error);
        res.json({ success: false });
    }
}
