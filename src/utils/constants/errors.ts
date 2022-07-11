/* eslint-disable max-len */
export const NORMAL_ERRORS: { [key: string]: string } = {
    UNKNOWN: 'An unknown error has occured.',
    COMMAND_FAILED: 'The shell command appears to have failed or has returned an error code.',
    TERMINAL_FAILED: 'An unknown error has occured while trying to open an external terminal, please contact the developers.',
    SERVER_DOWN: 'The local Spotlight server doesn\'t appear to be running or is running on another port than {{port}}. Please start it and try again.',
    PARENT_NOT_FOUND: 'It looks like something went wrong, we will redirect you to the beginning.',
};

export const DEV_ERRORS: { [key: string]: string } = {
    UNKNOWN: 'An unknown error has occured. ({{message}})',
    COMMAND_FAILED: 'The shell command appears to have failed or has returned an error code.',
    TERMINAL_FAILED: 'An unknown error has occured while trying to open an external terminal, please contact the developers.',
    SERVER_DOWN: 'The local Spotlight server doesn\'t appear to be running or is running on another port than {{port}}. Please start it and try again.',
    PARENT_NOT_FOUND: 'It looks like a command or page has been removed from the registry. We will redirect you to the beginning.',
};

export enum ERRORS {
    UNKNOWN = <any>'UNKNOWN',
    COMMAND_FAILED = <any>'COMMAND_FAILED',
    TERMINAL_FAILED = <any>'TERMINAL_FAILED',
    SERVER_DOWN = <any>'SERVER_DOWN',
    PARENT_NOT_FOUND = <any>'PARENT_NOT_FOUND',
}
