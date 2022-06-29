"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Search = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const atoms_1 = require("../../../components/atoms");
require("./styles.css");
function Search() {
    const [visible, setVisible] = (0, react_1.useState)(false);
    return ((0, jsx_runtime_1.jsx)(atoms_1.Overlay, Object.assign({ visible: visible, setVisible: setVisible }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ id: 'spotlight-search' }, { children: (0, jsx_runtime_1.jsx)(atoms_1.Container, { children: "spotlight" }) })) })));
}
exports.Search = Search;
