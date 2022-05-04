import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import styled from 'styled-components';
import { getCommandIcon } from '../utils/get-command-icon';
import { useSpotlightContext } from '../utils';
let lastMouseX = 0;
let lastMouseY = 0;
export function Result({ hasIcons, result, index, selected, onSoftSelect, onSelect }) {
    var _a, _b;
    const spotlight = useSpotlightContext();
    const enableFocus = () => onSoftSelect(index);
    const Icon = ((_a = result.item.options) === null || _a === void 0 ? void 0 : _a.icon) ? getCommandIcon((_b = result.item.options) === null || _b === void 0 ? void 0 : _b.icon) : null;
    const TypeText = useMemo(() => {
        if (spotlight.type === 'question')
            return 'Select option';
        if (result.item.type === 'command') {
            if (result.item.parentCommand)
                return 'Select option';
            return 'Run command';
        }
        return 'Jump to';
    }, [spotlight, result]);
    const handleAction = () => {
        onSelect(result);
    };
    const handleMouseMove = (e) => {
        if (e.clientX === lastMouseX && e.clientY === lastMouseY)
            return;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
        enableFocus();
    };
    return (
    // eslint-disable-next-line react/jsx-handler-names
    _jsxs(Container, Object.assign({ id: `command-${index}`, "$selected": selected, onClick: handleAction, onMouseMove: handleMouseMove, onFocus: enableFocus }, { children: [_jsxs(Left, { children: [hasIcons && (_jsx(IconWrapper, { children: !!Icon && _jsx(Icon, { size: 24, color: 'gray4' }) })), _jsx(Title, { children: result.item.title })] }), selected && (_jsx(Type, { children: TypeText }))] })));
}
const Container = styled.button `
    ${(p) => p.theme.flex.row({ align: 'center' })}
    height: 45px;
    min-height: 45px;
    border-radius: 10px;
    border: 0;
    outline: 0;
    padding: 0 15px;
    background-color: transparent;
    cursor: pointer;
    overflow: hidden;

    transition: background-color 0.2s ease-in-out;
    will-change: background-color;

    ${(p) => p.$selected && `
        background-color: ${p.theme.color.gray9};
    `}

    @media(max-width: 600px) {
        height: 35px;
    }
`;
const Left = styled.div `
    ${(p) => p.theme.flex.row({ align: 'center' })}
    flex: 1;
`;
const IconWrapper = styled.div `
    ${(p) => p.theme.flex.row({ justify: 'center', align: 'center' })}
    width: 24px;
    height: 24px;
    margin-right: 15px;
`;
const Title = styled.p `
    ${(p) => p.theme.text.System.regular(15, 'gray1')}
    margin: 0;
    padding: 0;
    white-space: nowrap;
    overflow: hidden;
    display: block;
    text-overflow: ellipsis;
`;
const Type = styled.p `
    ${(p) => p.theme.text.System.regular(15, 'gray5')}
    animation: ${(p) => p.theme.animation.fadeIn} 0.2s ease-in-out;
    margin: 0;
    padding: 0;
    text-align: right;

    @media(max-width: 450px) {
        display: none;
    }
`;
