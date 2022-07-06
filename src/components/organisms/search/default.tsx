import { useCallback, useEffect } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import {
    getUUID,
    updateCatalog,
    Registry,
    REGISTRY_UPDATE_EVENT_KEY,
    useSearchContext,
    ERRORS,
} from '@/utils';
import { Answer, RegistryItem, Result, SpotlightOptions } from '@/types';
import { getResultById } from '@/utils/search';

import './styles.css';

const preventDefault = (ev: KeyboardEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
};

export function Default (props: SpotlightOptions): null {
    const {
        type,
        visible,
        selectedItem,
        setType,
        setError,
        setVisible,
        setParentId,
        setPlaceholder,
        setSelectedItem,
        setLoading,
    } = useSearchContext();

    const handleSpotlightEnd = useCallback(() => {
        setVisible(false);
        setLoading(false);
        // eslint-disable-next-line unicorn/no-useless-undefined
        setError(undefined);
        // eslint-disable-next-line unicorn/no-useless-undefined
        setSelectedItem(undefined);
    }, [setError, setLoading, setSelectedItem, setVisible]);

    const handleSpotlightResultClicked = useCallback(() => {
        setLoading(false);
        // eslint-disable-next-line unicorn/no-useless-undefined
        setParentId(undefined);
        handleSpotlightEnd();
    }, [handleSpotlightEnd, setLoading, setParentId]);

    const handleAction = useCallback(async (result: Result, value?: string) => {
        // eslint-disable-next-line unicorn/no-useless-undefined
        setError(undefined);
        if (result.parent) {
            await handleAction(getResultById(result.parent)!, value);
            return;
        }
        // get the registry item based on the result
        const item = Registry.find((item) => item.id === result.id);
        if (!item) return;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const actionResult = item.action(value);
        // update loading if there is a promise
        if (actionResult instanceof Promise) {
            setLoading(true);
            void actionResult.then(() => {
                handleSpotlightResultClicked();
            }).catch((error: { message: string; port: number; reason?: string | Error }) => {
                let errorMessage = ERRORS[error.message] || ERRORS.UNKNOWN;
                if (typeof error.port === 'number') errorMessage = errorMessage.replace('{{port}}', String(error.port));
                errorMessage = errorMessage.replace('{{error.message}}', String(error.message));

                setError(errorMessage);
                setLoading(false);
            });
        } else {
            handleSpotlightResultClicked();
        }
    }, [handleSpotlightResultClicked, setError, setLoading]);

    const formatAnswers = useCallback((item: Answer | string, parentId: string, parentObject?: Answer | RegistryItem): Result => {
        // const id = `${parentId}-${typeof item === 'string' ? item : item.key}`;
        const id = getUUID();
        return {
            type: 'option',
            id,
            key: typeof item === 'string' ? item : item.key,
            label: typeof item === 'string' ? item : item.label ?? item.key,
            icon: typeof item === 'string' ? undefined : item.icon,
            iconColor: typeof item === 'string' ? undefined : item.iconColor,
            category: parentObject?.label ?? '',
            action: (result) => handleAction(result, result.key),
            parent: parentId,
            children:
                typeof item === 'string' ? undefined : item.options?.map((option) => formatAnswers(option, id, parentObject)),
        };
    }, [handleAction]);

    const formatResult = useCallback((item: RegistryItem): Result => {
        return {
            id: item.id,
            key: item.label,
            label: item.label,
            type: item.type,
            icon: item.icon,
            iconColor: item.iconColor,
            category: item.category,
            action: (result) => handleAction(result, result.key),
            children: item.options?.map((option) => formatAnswers(option, item.id, item)),
        };
    }, [formatAnswers, handleAction]);

    const handleSpotlightUpdate = useCallback(() => {
        const newResults: Result[] = Registry.map((item) => formatResult(item));
        updateCatalog(newResults);
    }, [formatResult]);

    const handleSpotlightStart = useCallback(() => {
        handleSpotlightUpdate();
        // eslint-disable-next-line unicorn/no-useless-undefined
        setError(undefined);
        // eslint-disable-next-line unicorn/no-useless-undefined
        setPlaceholder(undefined);
        setType('search');
        setVisible(true);
    }, [handleSpotlightUpdate, setError, setPlaceholder, setType, setVisible]);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.removeEventListener(REGISTRY_UPDATE_EVENT_KEY, (() => handleSpotlightUpdate()) as any);
        if (type === 'search') {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.addEventListener(REGISTRY_UPDATE_EVENT_KEY, (() => handleSpotlightUpdate()) as any);
        }
        return () => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(REGISTRY_UPDATE_EVENT_KEY, (() => handleSpotlightUpdate()) as any);
        };
    }, [handleSpotlightUpdate, type]);

    useHotkeys(props.spotlightShortcut!, (ev) => {
        preventDefault(ev);
        if (!visible) handleSpotlightStart();
        else handleSpotlightEnd();
    }, {
        enabled: type === 'search',
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }, [visible, selectedItem, type]);

    return null;
}
