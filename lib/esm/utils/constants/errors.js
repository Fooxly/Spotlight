/* eslint-disable max-len */
export const NORMAL_ERRORS = {
    UNKNOWN: 'An unknown error has occured.',
    COMMAND_FAILED: 'The shell command appears to have failed or has returned an error code.',
    TERMINAL_FAILED: 'An unknown error has occured while trying to open an external terminal, please contact the developers.',
    SERVER_DOWN: 'The local Spotlight server doesn\'t appear to be running or is running on another port than {{port}}. Please start it and try again.',
    PARENT_NOT_FOUND: 'It looks like something went wrong, we will redirect you to the beginning.',
};
export const DEV_ERRORS = {
    UNKNOWN: 'An unknown error has occured. ({{message}})',
    COMMAND_FAILED: 'The shell command appears to have failed or has returned an error code.',
    TERMINAL_FAILED: 'An unknown error has occured while trying to open an external terminal, please contact the developers.',
    SERVER_DOWN: 'The local Spotlight server doesn\'t appear to be running or is running on another port than {{port}}. Please start it and try again.',
    PARENT_NOT_FOUND: 'It looks like a command or page has been removed from the registry. We will redirect you to the beginning.',
};
export var ERRORS;
(function (ERRORS) {
    ERRORS[ERRORS["UNKNOWN"] = 'UNKNOWN'] = "UNKNOWN";
    ERRORS[ERRORS["COMMAND_FAILED"] = 'COMMAND_FAILED'] = "COMMAND_FAILED";
    ERRORS[ERRORS["TERMINAL_FAILED"] = 'TERMINAL_FAILED'] = "TERMINAL_FAILED";
    ERRORS[ERRORS["SERVER_DOWN"] = 'SERVER_DOWN'] = "SERVER_DOWN";
    ERRORS[ERRORS["PARENT_NOT_FOUND"] = 'PARENT_NOT_FOUND'] = "PARENT_NOT_FOUND";
})(ERRORS || (ERRORS = {}));
