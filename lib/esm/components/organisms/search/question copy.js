import { useCallback, useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { getUUID, PICKED_RESULT_EVENT_KEY, QUESTION_EVENT_KEY, QUESTION_RESULT_EVENT_KEY, useSearchContext, } from '../../../utils';
import './styles.css';
const preventDefault = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
};
export function Question() {
    const { type, visible, search, results, selectedItem, setType, setSearch, setVisible, setResults, setShowIcons, setSelectedItem, } = useSearchContext();
    const [questionVisible, setQuestionVisible] = useState(false);
    const handleQuestionStart = useCallback((ev) => {
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
                    id: getUUID(),
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
    const handleQuestionEnd = useCallback((result) => {
        setQuestionVisible(false);
        const ev = new CustomEvent(QUESTION_RESULT_EVENT_KEY, {
            bubbles: false,
            detail: {
                value: result,
            },
        });
        document.dispatchEvent(ev);
        setVisible(false);
    }, [setVisible]);
    const handlePickedResult = useCallback((ev) => {
        var _a, _b;
        if (!questionVisible)
            return;
        handleQuestionEnd((_b = (_a = results.find((result) => result.id === ev.detail.value)) === null || _a === void 0 ? void 0 : _a.key) !== null && _b !== void 0 ? _b : null);
    }, [handleQuestionEnd, questionVisible, results]);
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.removeEventListener(PICKED_RESULT_EVENT_KEY, handlePickedResult);
        if (questionVisible) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.addEventListener(PICKED_RESULT_EVENT_KEY, handlePickedResult);
        }
    }, [handlePickedResult, questionVisible]);
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(QUESTION_EVENT_KEY, handleQuestionStart);
        return () => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(QUESTION_EVENT_KEY, handleQuestionStart);
        };
    }, [handleQuestionStart]);
    useEffect(() => {
        if (visible)
            return;
        handleQuestionEnd(null);
    }, [handleQuestionEnd, visible]);
    useHotkeys('enter', (ev) => {
        var _a, _b;
        preventDefault(ev);
        handleQuestionEnd(type === 'select' ? ((_b = (_a = results.find((result) => result.id === selectedItem)) === null || _a === void 0 ? void 0 : _a.key) !== null && _b !== void 0 ? _b : null) : search);
    }, {
        enabled: questionVisible,
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }, [handleQuestionEnd, search, selectedItem, type]);
    return null;
}
