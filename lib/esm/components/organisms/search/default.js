var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useCallback, useEffect } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { getUUID, updateCatalog, Registry, REGISTRY_UPDATE_EVENT_KEY, useSearchContext, ERRORS, } from '../../../utils';
import { getResultById } from '../../../utils/search';
import './styles.css';
const preventDefault = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
};
export function Default(props) {
    const { type, visible, selectedItem, setType, setError, setVisible, setParentId, setPlaceholder, setSelectedItem, setLoading, } = useSearchContext();
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
    const handleAction = useCallback((result, value) => __awaiter(this, void 0, void 0, function* () {
        if (result.parent) {
            yield handleAction(getResultById(result.parent), value);
            return;
        }
        // get the registry item based on the result
        const item = Registry.find((item) => item.id === result.id);
        if (!item)
            return;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const actionResult = item.action(value);
        // update loading if there is a promise
        if (actionResult instanceof Promise) {
            setLoading(true);
            void actionResult.then(() => {
                handleSpotlightResultClicked();
            }).catch((error) => {
                let errorMessage = ERRORS[error.message] || ERRORS.UNKNOWN;
                if (typeof error.port === 'number')
                    errorMessage = errorMessage.replace('{{port}}', String(error.port));
                errorMessage = errorMessage.replace('{{error.message}}', String(error.message));
                setError(errorMessage);
                setLoading(false);
            });
        }
        else {
            handleSpotlightResultClicked();
        }
    }), [handleSpotlightResultClicked, setError, setLoading]);
    const formatAnswers = useCallback((item, parentId, parentObject) => {
        var _a, _b, _c;
        // const id = `${parentId}-${typeof item === 'string' ? item : item.key}`;
        const id = getUUID();
        return {
            type: 'option',
            id,
            key: typeof item === 'string' ? item : item.key,
            label: typeof item === 'string' ? item : (_a = item.label) !== null && _a !== void 0 ? _a : item.key,
            icon: typeof item === 'string' ? undefined : item.icon,
            iconColor: typeof item === 'string' ? undefined : item.iconColor,
            category: (_b = parentObject === null || parentObject === void 0 ? void 0 : parentObject.label) !== null && _b !== void 0 ? _b : '',
            action: (result) => handleAction(result, result.key),
            parent: parentId,
            children: typeof item === 'string' ? undefined : (_c = item.options) === null || _c === void 0 ? void 0 : _c.map((option) => formatAnswers(option, id, parentObject)),
        };
    }, [handleAction]);
    const formatResult = useCallback((item) => {
        var _a;
        return {
            id: item.id,
            key: item.label,
            label: item.label,
            type: item.type,
            icon: item.icon,
            iconColor: item.iconColor,
            category: item.category,
            action: (result) => handleAction(result, result.key),
            children: (_a = item.options) === null || _a === void 0 ? void 0 : _a.map((option) => formatAnswers(option, item.id, item)),
        };
    }, [formatAnswers, handleAction]);
    const handleSpotlightUpdate = useCallback(() => {
        const newResults = Registry.map((item) => formatResult(item));
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
        document.removeEventListener(REGISTRY_UPDATE_EVENT_KEY, (() => handleSpotlightUpdate()));
        if (type === 'search') {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.addEventListener(REGISTRY_UPDATE_EVENT_KEY, (() => handleSpotlightUpdate()));
        }
        return () => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(REGISTRY_UPDATE_EVENT_KEY, (() => handleSpotlightUpdate()));
        };
    }, [handleSpotlightUpdate, type]);
    useHotkeys(props.spotlightShortcut, (ev) => {
        preventDefault(ev);
        if (!visible)
            handleSpotlightStart();
        else
            handleSpotlightEnd();
    }, {
        enabled: type === 'search',
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }, [visible, selectedItem, type]);
    return null;
}
