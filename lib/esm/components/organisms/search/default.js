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
import { getUUID, Registry, REGISTRY_UPDATE_EVENT_KEY, useSearchContext, } from '../../../utils';
import './styles.css';
const preventDefault = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
};
export function Default(props) {
    var _a, _b, _c;
    const { type, visible, catalog, selectedItem, setType, setVisible, getCatalog, setCatalog, setPlaceholder, setSelectedItem, setLoading, } = useSearchContext();
    const handleSpotlightEnd = useCallback(() => {
        setVisible(false);
        setLoading(false);
        // eslint-disable-next-line unicorn/no-useless-undefined
        setSelectedItem(undefined);
    }, [setLoading, setSelectedItem, setVisible]);
    console.log('up to date catalog', (_c = (_b = (_a = catalog === null || catalog === void 0 ? void 0 : catalog[0]) === null || _a === void 0 ? void 0 : _a.children) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.id);
    const handleAction = useCallback((result, value) => __awaiter(this, void 0, void 0, function* () {
        var _d, _e, _f, _g, _h, _j, _k;
        console.log((_f = (_e = (_d = catalog === null || catalog === void 0 ? void 0 : catalog[0]) === null || _d === void 0 ? void 0 : _d.children) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.id, result.id);
        console.log((_k = (_j = (_h = (_g = getCatalog()) === null || _g === void 0 ? void 0 : _g[0]) === null || _h === void 0 ? void 0 : _h.children) === null || _j === void 0 ? void 0 : _j[0]) === null || _k === void 0 ? void 0 : _k.id, result.id);
        if (result.parent) {
            // await handleAction(getResultById(catalog, result.parent)!, value);
            return;
        }
        // get the registry item based on the result
        const item = Registry.find((item) => item.id === result.id);
        console.log(result.key, value);
        if (!item)
            return;
        // update loading if there is a promise
        if (item.action instanceof Promise) {
            setLoading(true);
        }
        // TODO: handle the action from the registry item
        // const actionResult = await item?.action(value);
        setLoading(false);
        // TODO: handle errors with error widget
        handleSpotlightEnd();
    }), [catalog, getCatalog, handleSpotlightEnd, setLoading]);
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
        console.log('updating catalog');
        const newResults = Registry.map((item) => formatResult(item));
        setCatalog(newResults);
    }, [formatResult, setCatalog]);
    const handleSpotlightStart = useCallback(() => {
        handleSpotlightUpdate();
        // eslint-disable-next-line unicorn/no-useless-undefined
        setPlaceholder(undefined);
        setType('search');
        setVisible(true);
    }, [handleSpotlightUpdate, setPlaceholder, setType, setVisible]);
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
