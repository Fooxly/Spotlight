/* eslint-disable max-len */
export const ERRORS: { [key: string]: string } = {
    UNKNOWN: 'An unknown error has occured.',
    COMMAND_FAILED: 'The shell command appears to have failed or has returned an error code.',
    TERMINAL_FAILED: 'An unknown error has occured while trying to open an external terminal, please contact the developers.',
    SERVER_DOWN: 'The local Spotlight server doesn\'t appear to be running or is running on another port than {{port}}. Please start it and try again.',
};
