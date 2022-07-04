"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
const react_1 = require("react");
const utils_1 = require("../../../utils");
require("./styles.css");
function Question() {
    const { type, setType, setVisible, setCatalog, setPlaceholder, } = (0, utils_1.useSearchContext)();
    const handleQuestionEnd = (0, react_1.useCallback)((result) => {
        // Reset the type
        setType('search');
        // Submit the result to the command handler
        const ev = new CustomEvent(utils_1.QUESTION_RESULT_EVENT_KEY, {
            bubbles: false,
            detail: {
                value: result,
            },
        });
        document.dispatchEvent(ev);
        // Hide the search view
        setVisible(false);
    }, [setType, setVisible]);
    const handleCloseEvent = (0, react_1.useCallback)((ev) => {
        handleQuestionEnd(type !== 'input' ? undefined : ev.detail.value);
    }, [type, handleQuestionEnd]);
    const handleResultPicked = (0, react_1.useCallback)((result) => {
        // Return the found result key
        handleQuestionEnd(result === null || result === void 0 ? void 0 : result.key);
    }, [handleQuestionEnd]);
    const handleQuestionStart = (0, react_1.useCallback)((ev) => {
        var _a, _b;
        const formatResult = (item, parentId, parentObject) => {
            var _a, _b, _c, _d;
            const id = (0, utils_1.getUUID)();
            return {
                type: 'option',
                id,
                key: typeof item === 'string' ? item : item.key,
                label: typeof item === 'string' ? item : (_a = item.label) !== null && _a !== void 0 ? _a : item.key,
                icon: typeof item === 'string' ? undefined : item.icon,
                iconColor: typeof item === 'string' ? undefined : item.iconColor,
                category: (_c = (_b = parentObject === null || parentObject === void 0 ? void 0 : parentObject.label) !== null && _b !== void 0 ? _b : parentObject === null || parentObject === void 0 ? void 0 : parentObject.key) !== null && _c !== void 0 ? _c : ev.detail.question,
                action: handleResultPicked,
                parent: parentId,
                children: typeof item === 'string' ? undefined : (_d = item.options) === null || _d === void 0 ? void 0 : _d.map((option) => formatResult(option, id, parentObject)),
            };
        };
        // Set default values for the question input
        // eslint-disable-next-line unicorn/no-useless-undefined
        setType(((_a = ev.detail.options) === null || _a === void 0 ? void 0 : _a.length) ? 'select' : 'input');
        if ((_b = ev.detail.options) === null || _b === void 0 ? void 0 : _b.length) {
            // Create the catalog
            setCatalog(ev.detail.options.map((option) => formatResult(option)));
        }
        else {
            // If there is no answer, set the placeholder
            setPlaceholder(ev.detail.question);
        }
        setVisible(true);
    }, [setType, setVisible, handleResultPicked, setCatalog, setPlaceholder]);
    (0, react_1.useEffect)(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(utils_1.QUESTION_EVENT_KEY, handleQuestionStart);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(utils_1.SEARCH_CLOSED_EVENT_KEY, handleCloseEvent);
        return () => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(utils_1.QUESTION_EVENT_KEY, handleQuestionStart);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(utils_1.SEARCH_CLOSED_EVENT_KEY, handleCloseEvent);
        };
    }, [handleCloseEvent, handleQuestionEnd, handleQuestionStart]);
    return null;
}
exports.Question = Question;
