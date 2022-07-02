"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
const react_1 = require("react");
const utils_1 = require("../../../utils");
require("./styles.css");
function Question() {
    const { type, results, setType, setSearch, setVisible, setResults, setShowIcons, setPlaceholder, setSelectedItem, } = (0, utils_1.useSearchContext)();
    const handleQuestionStart = (0, react_1.useCallback)((ev) => {
        var _a, _b;
        console.log(ev.detail.options);
        const formatResult = (item, parent) => {
            var _a, _b, _c, _d;
            return {
                type: 'option',
                id: (0, utils_1.getUUID)(),
                key: typeof item === 'string' ? item : item.key,
                label: typeof item === 'string' ? item : (_a = item.label) !== null && _a !== void 0 ? _a : item.key,
                icon: typeof item === 'string' ? undefined : item.icon,
                iconColor: typeof item === 'string' ? undefined : item.iconColor,
                category: (_c = (_b = parent === null || parent === void 0 ? void 0 : parent.label) !== null && _b !== void 0 ? _b : parent === null || parent === void 0 ? void 0 : parent.key) !== null && _c !== void 0 ? _c : ev.detail.question,
                children: typeof item === 'string' ? undefined : (_d = item.options) === null || _d === void 0 ? void 0 : _d.map((option) => formatResult(option, item)),
            };
        };
        setType(((_a = ev.detail.options) === null || _a === void 0 ? void 0 : _a.length) ? 'select' : 'input');
        setSearch('');
        if ((_b = ev.detail.options) === null || _b === void 0 ? void 0 : _b.length) {
            console.log(ev.detail.options.map((option) => formatResult(option)));
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
            setPlaceholder(null);
            setResults(results);
        }
        else {
            setPlaceholder(ev.detail.question);
            setSelectedItem(null);
            setResults([]);
        }
        setVisible(true);
    }, [setType, setSearch, setVisible, setPlaceholder, setResults, setShowIcons, setSelectedItem]);
    const handleQuestionEnd = (0, react_1.useCallback)((result) => {
        setSearch('');
        setType('search');
        const ev = new CustomEvent(utils_1.QUESTION_RESULT_EVENT_KEY, {
            bubbles: false,
            detail: {
                value: result,
            },
        });
        document.dispatchEvent(ev);
        setVisible(false);
    }, [setSearch, setType, setVisible]);
    const handlePickedResult = (0, react_1.useCallback)((ev) => {
        var _a;
        if (type !== 'input' && type !== 'select')
            return;
        if (type === 'input') {
            handleQuestionEnd(ev.detail.value);
            return;
        }
        handleQuestionEnd((_a = results.find((result) => result.id === ev.detail.value)) === null || _a === void 0 ? void 0 : _a.key);
    }, [handleQuestionEnd, type, results]);
    (0, react_1.useEffect)(() => {
        if (type === 'input' || type === 'select') {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.addEventListener(utils_1.PICKED_RESULT_EVENT_KEY, handlePickedResult);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(utils_1.PICKED_RESULT_EVENT_KEY, handlePickedResult);
        }
        return () => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(utils_1.PICKED_RESULT_EVENT_KEY, handlePickedResult);
        };
    }, [handlePickedResult, type]);
    (0, react_1.useEffect)(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(utils_1.QUESTION_EVENT_KEY, handleQuestionStart);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(utils_1.SEARCH_CLOSED_EVENT_KEY, handleQuestionEnd);
        return () => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(utils_1.QUESTION_EVENT_KEY, handleQuestionStart);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(utils_1.SEARCH_CLOSED_EVENT_KEY, handleQuestionEnd);
        };
    }, [handleQuestionEnd, handleQuestionStart]);
    // useEffect(() => {
    //     if (visible || (type !== 'input' && type !== 'select')) return;
    //     handleQuestionEnd();
    // }, [handleQuestionEnd, visible, type]);
    return null;
}
exports.Question = Question;
