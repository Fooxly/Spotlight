import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import styled from 'styled-components';
import { Result as ResultItem } from './result';
import { TimesIcon } from '../../icons/line';
export function Section({ title, results, showIcons, selectedIndex, onResultSoftSelect, onResultSelect, onRemove, action, actionText, }) {
    if (!(results === null || results === void 0 ? void 0 : results.length))
        return null;
    return (_jsxs(_Fragment, { children: [_jsxs(ResultSection, { children: [_jsx(ResultSectionTitle, { children: title }), action && actionText && (
                    // eslint-disable-next-line react/jsx-handler-names
                    _jsx(SectionAction, Object.assign({ onClick: action }, { children: actionText }))), !!onRemove && (
                    // eslint-disable-next-line react/jsx-handler-names
                    _jsx(SectionButton, Object.assign({ onClick: onRemove }, { children: _jsx(TimesIcon, { size: 8, color: 'gray10' }) })))] }), results.sort((a, b) => a.index - b.index).map((result) => {
                return (_jsx(ResultItem, { index: result.index, result: result, hasIcons: showIcons, selected: selectedIndex === result.index, 
                    // eslint-disable-next-line react/jsx-handler-names
                    onSoftSelect: onResultSoftSelect, 
                    // eslint-disable-next-line react/jsx-handler-names
                    onSelect: onResultSelect }, result.item.title));
            })] }));
}
const SectionButton = styled.button `
    ${(p) => p.theme.flex.col({ justify: 'center', align: 'center' })}
    border: 0;
    outline: 0;
    border-radius: 100px;
    background-color: ${(p) => p.theme.color.gray2};
    position: absolute;
    right: 0;
    width: 18px;
    height: 18px;
    cursor: pointer;
    padding: 2px 6px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease-in-out;
    will-change: opacity, pointer-events;
`;
const SectionAction = styled.button `
    ${(p) => p.theme.flex.col({ justify: 'center', align: 'center' })}
    ${(p) => p.theme.text.System.regular(14, 'blue')}
    border: 0;
    outline: 0;
    cursor: pointer;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease-in-out, color 0.2s ease-in-out;
    will-change: opacity, color, pointer-events;

    &:hover {
        color: ${(p) => p.theme.color.teal};
    }
`;
const ResultSection = styled.div `
    ${(p) => p.theme.flex.row({ justify: 'space-between', align: 'center' })}
    padding: 7px 5px;
    position: relative;

    :hover {
        > ${SectionButton}, > ${SectionAction} {
            pointer-events: auto;
            opacity: 1;
        }
    }
`;
const ResultSectionTitle = styled.p `
    ${(p) => p.theme.text.System.semibold(14, 'gray4')}
    margin: 0;
    padding: 0;
`;
