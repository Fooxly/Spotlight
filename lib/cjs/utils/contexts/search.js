"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSearchContext = exports.SearchContext = void 0;
/* eslint-disable @typescript-eslint/no-empty-function */
const react_1 = require("react");
exports.SearchContext = (0, react_1.createContext)({
    devMode: false,
    showTips: false,
    customTips: [],
    type: 'search',
    setType: () => { },
    visible: false,
    setVisible: () => { },
    error: undefined,
    setError: () => { },
    parentId: undefined,
    setParentId: () => { },
    catalog: [],
    setCatalog: () => { },
    placeholder: undefined,
    setPlaceholder: () => { },
    loading: false,
    setLoading: () => { },
    selectedItem: undefined,
    setSelectedItem: () => { },
});
const useSearchContext = () => (0, react_1.useContext)(exports.SearchContext);
exports.useSearchContext = useSearchContext;
