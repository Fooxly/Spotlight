import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import styled from 'styled-components';
import { TimesIcon } from '../icons/line';
import { Result as ResultItem } from './result';
export function Section({ title, results, showIcons, selectedIndex, onResultSoftSelect, onResultSelect, onRemove }) {
    if (!results?.length)
        return null;
    return (_jsxs(_Fragment, { children: [_jsxs(ResultSection, { children: [_jsx(ResultSectionTitle, { children: title }), !!onRemove && (_jsx(SectionButton, { onClick: onRemove, children: _jsx(TimesIcon, { size: 7, color: 'gray10' }) }))] }), results.sort((a, b) => a.index - b.index).map((result) => {
                return (_jsx(ResultItem, { index: result.index, result: result, hasIcons: showIcons, selected: selectedIndex === result.index, onSoftSelect: onResultSoftSelect, onSelect: onResultSelect }, result.item.title));
            })] }));
}
const SectionButton = styled.button `
    ${(p) => p.theme.flex.col({ justify: 'center', align: 'center' })}
    border-radius: 100px;
    background-color: ${(p) => p.theme.color.gray2};
    position: absolute;
    right: 15px;
    width: 18px;
    height: 18px;
    cursor: pointer;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease-in-out;
    will-change: opacity, pointer-events;
`;
const ResultSection = styled.div `
    ${(p) => p.theme.flex.row({ justify: 'space-between', align: 'center' })}
    padding: 7px 5px;
    position: relative;

    :hover {
        > ${SectionButton} {
            pointer-events: auto;
            opacity: 1;
        }
    }
`;
const ResultSectionTitle = styled.p `
    ${(p) => p.theme.text.System.semibold(14, 'gray4')}
`;
