"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Search = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const question_1 = require("./question");
const default_1 = require("./default");
const molecules_1 = require("../../../components/molecules");
const utils_1 = require("../../../utils");
require("./styles.css");
function Search(props) {
    const [type, setType] = (0, react_1.useState)('search');
    const [visible, setVisible] = (0, react_1.useState)(false);
    const [search, setSearch] = (0, react_1.useState)('');
    const [placeholder, setPlaceholder] = (0, react_1.useState)(null);
    const [results, setResults] = (0, react_1.useState)([]);
    const [showIcons, setShowIcons] = (0, react_1.useState)(true);
    const [selectedItem, setSelectedItem] = (0, react_1.useState)(null);
    return ((0, jsx_runtime_1.jsxs)(utils_1.SearchContext.Provider, Object.assign({ value: {
            type,
            setType,
            visible,
            setVisible,
            search,
            setSearch,
            placeholder,
            setPlaceholder,
            results,
            setResults,
            showIcons,
            setShowIcons,
            selectedItem,
            setSelectedItem,
        } }, { children: [(0, jsx_runtime_1.jsx)(molecules_1.SearchBase, {}), (0, jsx_runtime_1.jsx)(question_1.Question, {}), (0, jsx_runtime_1.jsx)(default_1.Default, Object.assign({}, props))] })));
}
exports.Search = Search;
