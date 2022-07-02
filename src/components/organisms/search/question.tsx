import { useCallback, useEffect } from 'react';

import {
    getUUID,
    PICKED_RESULT_EVENT_KEY,
    QUESTION_EVENT_KEY,
    QUESTION_RESULT_EVENT_KEY,
    SEARCH_CLOSED_EVENT_KEY,
    useSearchContext,
} from '@/utils';
import { Answer, QuestionEvent, QuestionResponseEvent, Result, ResultPickedEvent } from '@/types';

import './styles.css';

export function Question (): null {
    const {
        type,
        results,
        setType,
        setSearch,
        setVisible,
        setResults,
        setShowIcons,
        setPlaceholder,
        setSelectedItem,
    } = useSearchContext();

    const handleQuestionStart = useCallback((ev: CustomEvent<QuestionEvent>) => {
        console.log(ev.detail.options);
        const formatResult = (item: Answer | string, parent?: Answer): Result => {
            return {
                type: 'option',
                id: getUUID(),
                key: typeof item === 'string' ? item : item.key,
                label: typeof item === 'string' ? item : item.label ?? item.key,
                icon: typeof item === 'string' ? undefined : item.icon,
                iconColor: typeof item === 'string' ? undefined : item.iconColor,
                category: parent?.label ?? parent?.key ?? ev.detail.question,
                children: typeof item === 'string' ? undefined : item.options?.map((option) => formatResult(option, item)),
            };
        };

        setType(ev.detail.options?.length ? 'select' : 'input');
        setSearch('');
        if (ev.detail.options?.length) {
            console.log(ev.detail.options.map((option) => formatResult(option)));

            let filtered = ev.detail.options;
            if (typeof ev.detail.options[0] === 'string') {
                const optionsArr = (ev.detail.options as string[]);
                filtered = optionsArr.filter((option, pos) => optionsArr?.indexOf(option) === pos);
                setShowIcons(false);
            } else {
                const optionsArr = (ev.detail.options as Answer[]);
                filtered = optionsArr.filter((option, pos) => optionsArr?.indexOf(option) === pos);
                setShowIcons(optionsArr.some((option) => option.icon));
            }

            if (filtered.length !== ev.detail.options.length) {
                console.warn('Spotlight', 'The options array contained duplicates which is not allowed, we filtered them out.');
            }

            const results: Result[] = filtered.map((option) => ({
                type: 'option',
                id: getUUID(),
                key: typeof option === 'string' ? option : option.key,
                label: typeof option === 'string' ? option : option.label ?? option.key,
                icon: typeof option === 'string' ? undefined : option.icon,
                iconColor: typeof option === 'string' ? undefined : option.iconColor,
                category: ev.detail.question,
            }));
            setPlaceholder(null);
            setResults(results);
        } else {
            setPlaceholder(ev.detail.question);
            setSelectedItem(null);
            setResults([]);
        }
        setVisible(true);
    }, [setType, setSearch, setVisible, setPlaceholder, setResults, setShowIcons, setSelectedItem]);

    const handleQuestionEnd = useCallback((result?: string) => {
        setSearch('');
        setType('search');
        const ev = new CustomEvent(QUESTION_RESULT_EVENT_KEY, {
            bubbles: false,
            detail: {
                value: result,
            } as QuestionResponseEvent,
        });
        document.dispatchEvent(ev);
        setVisible(false);
    }, [setSearch, setType, setVisible]);

    const handlePickedResult = useCallback((ev: CustomEvent<ResultPickedEvent>) => {
        if (type !== 'input' && type !== 'select') return;
        if (type === 'input') {
            handleQuestionEnd(ev.detail.value);
            return;
        }
        handleQuestionEnd(results.find((result) => result.id === ev.detail.value)?.key);
    }, [handleQuestionEnd, type, results]);

    useEffect(() => {
        if (type === 'input' || type === 'select') {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.addEventListener(PICKED_RESULT_EVENT_KEY, handlePickedResult as any);
        } else {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(PICKED_RESULT_EVENT_KEY, handlePickedResult as any);
        }
        return () => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(PICKED_RESULT_EVENT_KEY, handlePickedResult as any);
        };
    }, [handlePickedResult, type]);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(QUESTION_EVENT_KEY, handleQuestionStart as any);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(SEARCH_CLOSED_EVENT_KEY, handleQuestionEnd as any);
        return () => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(QUESTION_EVENT_KEY, handleQuestionStart as any);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(SEARCH_CLOSED_EVENT_KEY, handleQuestionEnd as any);
        };
    }, [handleQuestionEnd, handleQuestionStart]);

    // useEffect(() => {
    //     if (visible || (type !== 'input' && type !== 'select')) return;
    //     handleQuestionEnd();
    // }, [handleQuestionEnd, visible, type]);

    return null;
}
