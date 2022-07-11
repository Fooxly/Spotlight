export interface ShellOptions {
    port?: number;
    inExternalTerminal: boolean;
}
export interface ShellCommand {
    command: string;
    inExternalTerminal: boolean;
}
export interface ShellCommandResponse {
    success: boolean;
    result?: string;
    error?: string;
}
