"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERRORS = void 0;
/* eslint-disable max-len */
exports.ERRORS = {
    UNKNOWN: 'An unknown error has occured. ({{error.message}})',
    COMMAND_FAILED: 'The shell command appears to have failed or has returned an error code.',
    TERMINAL_FAILED: 'An unknown error has occured while trying to open an external terminal, please contact the developers.',
    SERVER_DOWN: 'The local Spotlight server doesn\'t appear to be running or is running on another port than {{port}}. Please start it and try again.',
};
