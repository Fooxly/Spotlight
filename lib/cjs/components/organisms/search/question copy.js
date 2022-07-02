"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
const react_1 = require("react");
const react_hotkeys_hook_1 = require("react-hotkeys-hook");
const utils_1 = require("../../../utils");
require("./styles.css");
const preventDefault = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
};
function Question() {
    const { type, visible, search, results, selectedItem, setType, setSearch, setVisible, setResults, setShowIcons, setSelectedItem, } = (0, utils_1.useSearchContext)();
    const [questionVisible, setQuestionVisible] = (0, react_1.useState)(false);
    const handleQuestionStart = (0, react_1.useCallback)((ev) => {
        var _a, _b;
        setType(((_a = ev.detail.options) === null || _a === void 0 ? void 0 : _a.length) ? 'select' : 'input');
        setVisible(true);
        setSearch('');
        setQuestionVisible(true);
        if ((_b = ev.detail.options) === null || _b === void 0 ? void 0 : _b.length) {
            let filtered = ev.detail.options;
            if (typeof ev.detail.options[0] === 'string') {
                const optionsArr = ev.detail.options;
                filtered = optionsArr.filter((option, pos) => (optionsArr === null || optionsArr === void 0 ? void 0 : optionsArr.indexOf(option)) === pos);
                setShowIcons(false);
            }
            else {
                const optionsArr = ev.detail.options;
                filtered = optionsArr.filter((option, pos) => (optionsArr === null || optionsArr === void 0 ? void 0 : optionsArr.indexOf(option)) === pos);
                setShowIcons(optionsArr.some((option) => option.icon));
            }
            if (filtered.length !== ev.detail.options.length) {
                console.warn('Spotlight', 'The options array contained duplicates which is not allowed, we filtered them out.');
            }
            const results = filtered.map((option) => {
                var _a;
                return ({
                    type: 'option',
                    id: (0, utils_1.getUUID)(),
                    key: typeof option === 'string' ? option : option.key,
                    label: typeof option === 'string' ? option : (_a = option.label) !== null && _a !== void 0 ? _a : option.key,
                    icon: typeof option === 'string' ? undefined : option.icon,
                    iconColor: typeof option === 'string' ? undefined : option.iconColor,
                    category: ev.detail.question,
                });
            });
            setResults(results);
        }
        else {
            setSelectedItem(null);
            setResults([]);
        }
    }, [setType, setVisible, setSearch, setResults, setShowIcons, setSelectedItem]);
    const handleQuestionEnd = (0, react_1.useCallback)((result) => {
        setQuestionVisible(false);
        const ev = new CustomEvent(utils_1.QUESTION_RESULT_EVENT_KEY, {
            bubbles: false,
            detail: {
                value: result,
            },
        });
        document.dispatchEvent(ev);
        setVisible(false);
    }, [setVisible]);
    const handlePickedResult = (0, react_1.useCallback)((ev) => {
        var _a, _b;
        if (!questionVisible)
            return;
        handleQuestionEnd((_b = (_a = results.find((result) => result.id === ev.detail.value)) === null || _a === void 0 ? void 0 : _a.key) !== null && _b !== void 0 ? _b : null);
    }, [handleQuestionEnd, questionVisible, results]);
    (0, react_1.useEffect)(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.removeEventListener(utils_1.PICKED_RESULT_EVENT_KEY, handlePickedResult);
        if (questionVisible) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.addEventListener(utils_1.PICKED_RESULT_EVENT_KEY, handlePickedResult);
        }
    }, [handlePickedResult, questionVisible]);
    (0, react_1.useEffect)(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(utils_1.QUESTION_EVENT_KEY, handleQuestionStart);
        return () => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(utils_1.QUESTION_EVENT_KEY, handleQuestionStart);
        };
    }, [handleQuestionStart]);
    (0, react_1.useEffect)(() => {
        if (visible)
            return;
        handleQuestionEnd(null);
    }, [handleQuestionEnd, visible]);
    (0, react_hotkeys_hook_1.useHotkeys)('enter', (ev) => {
        var _a, _b;
        preventDefault(ev);
        handleQuestionEnd(type === 'select' ? ((_b = (_a = results.find((result) => result.id === selectedItem)) === null || _a === void 0 ? void 0 : _a.key) !== null && _b !== void 0 ? _b : null) : search);
    }, {
        enabled: questionVisible,
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }, [handleQuestionEnd, search, selectedItem, type]);
    return null;
}
exports.Question = Question;
