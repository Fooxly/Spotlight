"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Search = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const molecules_1 = require("../../../components/molecules");
require("./styles.css");
function Search() {
    // TODO: give the correct items to the search input
    // TODO: add support for pressing backspace to go back (function)
    // TODO: forward props from the search input
    return ((0, jsx_runtime_1.jsx)(molecules_1.Search, { type: 'input' }));
}
exports.Search = Search;
