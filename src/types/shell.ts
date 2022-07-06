export interface ShellCommand {
    command: string;
    inExternalTerminal: boolean;
}

export interface ShellCommandResponse {
    success: boolean;
    result?: string;
    error?: string;
}
