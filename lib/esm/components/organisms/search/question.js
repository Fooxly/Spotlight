import { useCallback, useEffect } from 'react';
import { getUUID, QUESTION_EVENT_KEY, QUESTION_RESULT_EVENT_KEY, SEARCH_CLOSED_EVENT_KEY, updateCatalog, useSearchContext, } from '../../../utils';
export function Question() {
    const { type, setType, setError, setLoading, setVisible, setPlaceholder, } = useSearchContext();
    const handleQuestionEnd = useCallback((result) => {
        // eslint-disable-next-line unicorn/no-useless-undefined
        setError(undefined);
        // Reset the type
        setType('search');
        // Submit the result to the command handler
        const ev = new CustomEvent(QUESTION_RESULT_EVENT_KEY, {
            bubbles: false,
            detail: {
                value: result,
            },
        });
        document.dispatchEvent(ev);
        // Hide the search view
        setVisible(false);
    }, [setError, setType, setVisible]);
    const handleCloseEvent = useCallback((ev) => {
        handleQuestionEnd(type !== 'input' ? undefined : ev.detail.value);
    }, [type, handleQuestionEnd]);
    const handleResultPicked = useCallback((result) => {
        // Return the found result key
        handleQuestionEnd(result === null || result === void 0 ? void 0 : result.key);
    }, [handleQuestionEnd]);
    const handleQuestionStart = useCallback((ev) => {
        var _a, _b;
        const formatResult = (item, parentId, parentObject) => {
            var _a, _b, _c, _d;
            const id = getUUID();
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
        if ((_a = ev.detail.options) === null || _a === void 0 ? void 0 : _a.length) {
            // Create the catalog
            updateCatalog(ev.detail.options.map((option) => formatResult(option)));
        }
        else {
            // If there is no answer, set the placeholder
            setPlaceholder(ev.detail.question);
            updateCatalog([]);
        }
        setLoading(false);
        // eslint-disable-next-line unicorn/no-useless-undefined
        setError(undefined);
        // eslint-disable-next-line unicorn/no-useless-undefined
        setType(((_b = ev.detail.options) === null || _b === void 0 ? void 0 : _b.length) ? 'select' : 'input');
        setVisible(true);
    }, [setType, setLoading, setError, setVisible, handleResultPicked, setPlaceholder]);
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(QUESTION_EVENT_KEY, handleQuestionStart);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(SEARCH_CLOSED_EVENT_KEY, handleCloseEvent);
        return () => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(QUESTION_EVENT_KEY, handleQuestionStart);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(SEARCH_CLOSED_EVENT_KEY, handleCloseEvent);
        };
    }, [handleCloseEvent, handleQuestionEnd, handleQuestionStart]);
    return null;
}
