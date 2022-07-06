import { useCallback, useEffect } from 'react';

import {
    getUUID,
    QUESTION_EVENT_KEY,
    QUESTION_RESULT_EVENT_KEY,
    SEARCH_CLOSED_EVENT_KEY,
    updateCatalog,
    useSearchContext,
} from '@/utils';
import { Answer, QuestionEvent, QuestionResponseEvent, Result, SearchCloseEvent } from '@/types';

import './styles.css';

export function Question (): null {
    const {
        type,
        setType,
        setError,
        setVisible,
        setPlaceholder,
    } = useSearchContext();

    const handleQuestionEnd = useCallback((result?: string) => {
        // eslint-disable-next-line unicorn/no-useless-undefined
        setError(undefined);
        // Reset the type
        setType('search');
        // Submit the result to the command handler
        const ev = new CustomEvent(QUESTION_RESULT_EVENT_KEY, {
            bubbles: false,
            detail: {
                value: result,
            } as QuestionResponseEvent,
        });
        document.dispatchEvent(ev);
        // Hide the search view
        setVisible(false);
    }, [setError, setType, setVisible]);

    const handleCloseEvent = useCallback((ev: CustomEvent<SearchCloseEvent>) => {
        handleQuestionEnd(type !== 'input' ? undefined : ev.detail.value);
    }, [type, handleQuestionEnd]);

    const handleResultPicked = useCallback((result: Result) => {
        // Return the found result key
        handleQuestionEnd(result?.key);
    }, [handleQuestionEnd]);

    const handleQuestionStart = useCallback((ev: CustomEvent<QuestionEvent>) => {
        const formatResult = (item: Answer | string, parentId?: string, parentObject?: Answer): Result => {
            const id = getUUID();
            return {
                type: 'option',
                id,
                key: typeof item === 'string' ? item : item.key,
                label: typeof item === 'string' ? item : item.label ?? item.key,
                icon: typeof item === 'string' ? undefined : item.icon,
                iconColor: typeof item === 'string' ? undefined : item.iconColor,
                category: parentObject?.label ?? parentObject?.key ?? ev.detail.question,
                action: handleResultPicked,
                parent: parentId,
                children:
                    typeof item === 'string' ? undefined : item.options?.map((option) => formatResult(option, id, parentObject)),
            };
        };

        // Set default values for the question input
        // eslint-disable-next-line unicorn/no-useless-undefined
        setType(ev.detail.options?.length ? 'select' : 'input');
        if (ev.detail.options?.length) {
            // Create the catalog
            updateCatalog(ev.detail.options.map((option) => formatResult(option)));
        } else {
            // If there is no answer, set the placeholder
            setPlaceholder(ev.detail.question);
        }
        // eslint-disable-next-line unicorn/no-useless-undefined
        setError(undefined);
        setVisible(true);
    }, [setType, setError, setVisible, handleResultPicked, setPlaceholder]);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(QUESTION_EVENT_KEY, handleQuestionStart as any);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(SEARCH_CLOSED_EVENT_KEY, handleCloseEvent as any);
        return () => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(QUESTION_EVENT_KEY, handleQuestionStart as any);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(SEARCH_CLOSED_EVENT_KEY, handleCloseEvent as any);
        };
    }, [handleCloseEvent, handleQuestionEnd, handleQuestionStart]);

    return null;
}
