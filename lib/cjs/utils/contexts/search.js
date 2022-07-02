"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSearchContext = exports.SearchContext = void 0;
/* eslint-disable @typescript-eslint/no-empty-function */
const react_1 = require("react");
exports.SearchContext = (0, react_1.createContext)({
    type: 'search',
    setType: () => { },
    visible: false,
    setVisible: () => { },
    search: '',
    setSearch: () => { },
    placeholder: null,
    setPlaceholder: () => { },
    results: [],
    setResults: () => { },
    showIcons: true,
    setShowIcons: () => { },
    selectedItem: null,
    setSelectedItem: () => { },
});
const useSearchContext = () => (0, react_1.useContext)(exports.SearchContext);
exports.useSearchContext = useSearchContext;
