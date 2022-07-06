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
    var _a, _b;
    const [type, setType] = (0, react_1.useState)('search');
    const [visible, setVisible] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)();
    const [catalog, setCatalog] = (0, react_1.useState)([]);
    const [parentId, setParentId] = (0, react_1.useState)();
    const [placeholder, setPlaceholder] = (0, react_1.useState)();
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [selectedItem, setSelectedItem] = (0, react_1.useState)();
    return ((0, jsx_runtime_1.jsxs)(utils_1.SearchContext.Provider, Object.assign({ value: {
            devMode: (_a = props.devMode) !== null && _a !== void 0 ? _a : false,
            showTips: (_b = props.showTips) !== null && _b !== void 0 ? _b : true,
            type,
            setType,
            visible,
            setVisible,
            error,
            setError,
            catalog,
            setCatalog,
            parentId,
            setParentId,
            placeholder,
            setPlaceholder,
            loading,
            setLoading,
            selectedItem,
            setSelectedItem,
        } }, { children: [(0, jsx_runtime_1.jsx)(molecules_1.SearchBase, {}), (0, jsx_runtime_1.jsx)(question_1.Question, {}), (0, jsx_runtime_1.jsx)(default_1.Default, Object.assign({}, props))] })));
}
exports.Search = Search;
