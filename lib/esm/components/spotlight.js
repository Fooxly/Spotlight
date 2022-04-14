var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createRef, useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { useHotkeys } from 'react-hotkeys-hook';
import { SearchIcon, TimesIcon } from '../icons/line';
import { Result } from './result';
import { getCommandIcon } from '../utils/get-command-icon';
import { COMMANDS } from '../utils';
// create the spotlight wrapper if this is not already created
var wrapper = document.querySelector('#spotlight');
if (!wrapper) {
    wrapper = document.createElement('div');
    wrapper.id = 'spotlight';
    document.body.append(wrapper);
}
export function SpotlightComponent() {
    var _a = __read(useState(false), 2), visible = _a[0], setVisible = _a[1];
    var _b = __read(useState(-1), 2), selectedIndex = _b[0], setSelectedIndex = _b[1];
    var _c = __read(useState(''), 2), search = _c[0], setSearch = _c[1];
    var inputRef = createRef();
    var HOTKEY_OPTIONS = {
        enabled: visible,
        enableOnTags: ['INPUT', 'TEXTAREA'],
    };
    // TODO: update the search algorithm to be more efficient and sort based on most likely match
    var indexedResults = useMemo(function () { return search.trim().length === 0 ? COMMANDS.slice(0, 8) : COMMANDS.filter(function (cmd) {
        var _a, _b;
        var fullSearch = search.trim().toLowerCase();
        var words = fullSearch.split(' ').filter(function (word) { return word.length > 1; });
        // check the title for keywords
        var title = cmd.title.toLowerCase();
        if (title.includes(fullSearch))
            return true;
        // check the keywords
        var keywords = (_b = (_a = cmd.options) === null || _a === void 0 ? void 0 : _a.keywords) === null || _b === void 0 ? void 0 : _b.map(function (kw) { return kw.toLowerCase(); });
        if (keywords === null || keywords === void 0 ? void 0 : keywords.filter(function (kw) { return words.filter(function (word) { return kw.includes(word); }).length > 0; }).length)
            return true;
    }); }, [search]);
    var hasIcons = useMemo(function () { return indexedResults.filter(function (cmd) { var _a; return !!getCommandIcon((_a = cmd.options) === null || _a === void 0 ? void 0 : _a.icon); }).length > 0; }, [indexedResults]);
    useEffect(function () {
        if (!inputRef.current)
            return;
        else
            inputRef.current.focus();
    }, [selectedIndex, inputRef]);
    var toggleVisible = function () {
        setSearch('');
        setVisible(function (last) { return !last; });
    };
    var handleInputChange = function (e) {
        setSearch(e.target.value);
        setSelectedIndex(-1);
    };
    useHotkeys('cmd+shift+k, ctrl+shift_k', function (e) {
        e.preventDefault();
        e.stopPropagation();
        toggleVisible();
    }, {
        enableOnTags: ['INPUT', 'TEXTAREA'],
    });
    useHotkeys('esc', function (e) {
        e.preventDefault();
        e.stopPropagation();
        setVisible(false);
    }, HOTKEY_OPTIONS);
    useHotkeys('up', function (e) {
        e.preventDefault();
        e.stopPropagation();
        setSelectedIndex(function (last) {
            var _a;
            var newIndex = Math.max(-1, last - 1);
            if (newIndex < 0)
                return -1;
            (_a = document.getElementById("command-".concat(indexedResults[newIndex].id))) === null || _a === void 0 ? void 0 : _a.scrollIntoView({
                behavior: 'smooth',
                block: newIndex <= 0 ? 'center' : 'nearest',
            });
            return newIndex;
        });
    }, HOTKEY_OPTIONS);
    useHotkeys('down', function (e) {
        e.preventDefault();
        e.stopPropagation();
        setSelectedIndex(function (last) {
            var _a;
            var newIndex = Math.min(indexedResults.length - 1, last + 1);
            (_a = document.getElementById("command-".concat(indexedResults[newIndex].id))) === null || _a === void 0 ? void 0 : _a.scrollIntoView({
                behavior: 'smooth',
                block: newIndex === (indexedResults.length - 1) ? 'center' : 'nearest',
            });
            return newIndex;
        });
    }, HOTKEY_OPTIONS);
    useHotkeys('enter', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (selectedIndex < 0)
            return;
        indexedResults[selectedIndex].action();
        toggleVisible();
    }, HOTKEY_OPTIONS);
    var handleClearSearch = function () { return setSearch(''); };
    return ReactDOM.createPortal(!visible ? null : (_jsxs(Container, { children: [_jsx(Background, { onClick: toggleVisible }), _jsxs(Content, { children: [_jsxs(SearchBar, __assign({ "$hasResults": !!(indexedResults === null || indexedResults === void 0 ? void 0 : indexedResults.length) }, { children: [_jsx(SearchInput, { onFocus: function () { return setSelectedIndex(-1); }, autoFocus: true, ref: inputRef, placeholder: 'Search or jump to...', value: search, onChange: handleInputChange }), _jsx(SearchIcon, { size: 24, color: 'gray4' }), (search === null || search === void 0 ? void 0 : search.length) > 0 && (_jsx(CloseButton, __assign({ onClick: handleClearSearch }, { children: _jsx(TimesIcon, { size: 8, color: 'gray10' }) })))] })), !!indexedResults.length && (_jsx(Results, { children: indexedResults.map(function (command, index) { return (_jsx(Result, { hasIcons: hasIcons, command: command, index: index, selected: selectedIndex === index, onSoftSelect: setSelectedIndex, onComplete: toggleVisible }, command.id)); }) }))] })] })), wrapper);
}
var Container = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    ", "\n    position: fixed;\n    left: 0;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    z-index: 99997;\n    transform: translate3d(0, 0, 99999px);\n"], ["\n    ", "\n    position: fixed;\n    left: 0;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    z-index: 99997;\n    transform: translate3d(0, 0, 99999px);\n"])), function (p) { return p.theme.flex.col({ justify: 'center', align: 'center' }); });
var Background = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    position: fixed;\n    left: 0;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    z-index: 99998;\n    background-color: rgba(0, 0, 0, 0.7);\n    animation: ", " 0.2s ease-in-out;\n"], ["\n    position: fixed;\n    left: 0;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    z-index: 99998;\n    background-color: rgba(0, 0, 0, 0.7);\n    animation: ", " 0.2s ease-in-out;\n"])), function (p) { return p.theme.animation.fadeIn; });
var Content = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    width: 60%;\n    max-width: 650px;\n    background-color: ", ";\n    border-radius: 10px;\n    border: 2px solid ", ";\n    overflow: hidden;\n    animation: ", " 0.4s ease-in-out;\n    z-index: 99999;\n\n    @media(max-width: 900px) {\n        width: 70%;\n    }\n\n    @media(max-width: 700px) {\n        width: 85%;\n    }\n"], ["\n    width: 60%;\n    max-width: 650px;\n    background-color: ", ";\n    border-radius: 10px;\n    border: 2px solid ", ";\n    overflow: hidden;\n    animation: ", " 0.4s ease-in-out;\n    z-index: 99999;\n\n    @media(max-width: 900px) {\n        width: 70%;\n    }\n\n    @media(max-width: 700px) {\n        width: 85%;\n    }\n"])), function (p) { return p.theme.color.gray10; }, function (p) { return p.theme.light ? p.theme.color.gray4 : p.theme.color.gray8; }, function (p) { return p.theme.animation.fadeInWithPulse; });
var SearchBar = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    position: relative;\n    ", "\n\n    ", "\n\n    > svg {\n        position: absolute;\n        left: 15px;\n        margin-bottom: 2px;\n    }\n"], ["\n    position: relative;\n    ", "\n\n    ", "\n\n    > svg {\n        position: absolute;\n        left: 15px;\n        margin-bottom: 2px;\n    }\n"])), function (p) { return p.theme.flex.row({ align: 'center' }); }, function (p) { return p.$hasResults && "\n        border-bottom: 1px solid ".concat(p.theme.color.gray8, ";\n    "); });
var SearchInput = styled.input(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    ", "\n    flex: 1;\n    height: 55px;\n    padding: 0 50px;\n\n    ::placeholder {\n        color: ", " !important;\n    }\n"], ["\n    ", "\n    flex: 1;\n    height: 55px;\n    padding: 0 50px;\n\n    ::placeholder {\n        color: ", " !important;\n    }\n"])), function (p) { return p.theme.text.System.regular(18, 'gray1'); }, function (p) { return p.theme.color.gray6; });
var Results = styled.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    ", ";\n    height: auto;\n    overflow-y: auto;\n    max-height: 400px;\n    padding: 8px;\n\n    @media(max-height: 600px) {\n        max-height: 100%;\n    }\n"], ["\n    ", ";\n    height: auto;\n    overflow-y: auto;\n    max-height: 400px;\n    padding: 8px;\n\n    @media(max-height: 600px) {\n        max-height: 100%;\n    }\n"])), function (p) { return p.theme.flex.col(); });
var CloseButton = styled.button(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n    ", "\n    border-radius: 100px;\n    background-color: ", ";\n    position: absolute;\n    right: 15px;\n    width: 22px;\n    height: 22px;\n    cursor: pointer;\n"], ["\n    ", "\n    border-radius: 100px;\n    background-color: ", ";\n    position: absolute;\n    right: 15px;\n    width: 22px;\n    height: 22px;\n    cursor: pointer;\n"])), function (p) { return p.theme.flex.col({ justify: 'center', align: 'center' }); }, function (p) { return p.theme.color.gray2; });
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
