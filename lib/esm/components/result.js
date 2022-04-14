import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from 'styled-components';
import { getCommandIcon } from '../utils/get-command-icon';
export function Result({ hasIcons, item, index, selected, onSoftSelect, onComplete }) {
    const enableFocus = () => onSoftSelect(index);
    const Icon = getCommandIcon(item.options?.icon);
    const handleAction = () => {
        if (item.type === 'command') {
            item.action();
        }
        else {
            window.location.href = item.page;
        }
        onComplete();
    };
    return (_jsxs(Container, { id: `command-${item.id}`, "$selected": selected, onClick: handleAction, onMouseMove: enableFocus, onFocus: enableFocus, children: [_jsxs(Left, { children: [hasIcons && (_jsx(IconWrapper, { children: !!Icon && _jsx(Icon, { size: 24, color: 'gray4' }) })), _jsx(Title, { children: item.title })] }), selected && (_jsx(Type, { children: item.type === 'command' ? 'Run command' : 'Jump to' }))] }));
}
const Container = styled.button `
    ${(p) => p.theme.flex.row({ align: 'center' })}
    height: 45px;
    min-height: 45px;
    border-radius: 10px;
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
`;
const Type = styled.p `
    ${(p) => p.theme.text.System.regular(15, 'gray5')}
    animation: ${(p) => p.theme.animation.fadeIn} 0.2s ease-in-out;
`;
