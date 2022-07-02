"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Search = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const search_input_1 = require("../search-input");
const atoms_1 = require("../../../components/atoms");
require("./styles.css");
function Search(props) {
    const [visible, setVisible] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        setVisible(true);
    }, []);
    return ((0, jsx_runtime_1.jsx)(atoms_1.Overlay, Object.assign({ visible: visible, setVisible: setVisible }, { children: (0, jsx_runtime_1.jsx)(atoms_1.Container, Object.assign({ className: 'spotlight-search-box' }, { children: (0, jsx_runtime_1.jsx)(search_input_1.SearchInput, Object.assign({}, props)) })) })));
}
exports.Search = Search;
