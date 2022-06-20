"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Section = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const styled_components_1 = __importDefault(require("styled-components"));
const result_1 = require("./result");
const line_1 = require("@/icons/line");
function Section({ title, results, showIcons, selectedIndex, onResultSoftSelect, onResultSelect, onRemove, action, actionText, }) {
    if (!(results === null || results === void 0 ? void 0 : results.length))
        return null;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(ResultSection, { children: [(0, jsx_runtime_1.jsx)(ResultSectionTitle, { children: title }), action && actionText && (
                    // eslint-disable-next-line react/jsx-handler-names
                    (0, jsx_runtime_1.jsx)(SectionAction, Object.assign({ onClick: action }, { children: actionText }))), !!onRemove && (
                    // eslint-disable-next-line react/jsx-handler-names
                    (0, jsx_runtime_1.jsx)(SectionButton, Object.assign({ onClick: onRemove }, { children: (0, jsx_runtime_1.jsx)(line_1.TimesIcon, { size: 8, color: 'gray10' }) })))] }), results.sort((a, b) => a.index - b.index).map((result) => {
                return ((0, jsx_runtime_1.jsx)(result_1.Result, { index: result.index, result: result, hasIcons: showIcons, selected: selectedIndex === result.index, 
                    // eslint-disable-next-line react/jsx-handler-names
                    onSoftSelect: onResultSoftSelect, 
                    // eslint-disable-next-line react/jsx-handler-names
                    onSelect: onResultSelect }, result.item.title));
            })] }));
}
exports.Section = Section;
const SectionButton = styled_components_1.default.button `
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
const SectionAction = styled_components_1.default.button `
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
const ResultSection = styled_components_1.default.div `
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
const ResultSectionTitle = styled_components_1.default.p `
    ${(p) => p.theme.text.System.semibold(14, 'gray4')}
    margin: 0;
    padding: 0;
`;
