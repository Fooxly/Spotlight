"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSpotlightContext = exports.SpotlightContext = void 0;
const react_1 = require("react");
exports.SpotlightContext = (0, react_1.createContext)({
    type: 'search',
});
const useSpotlightContext = () => (0, react_1.useContext)(exports.SpotlightContext);
exports.useSpotlightContext = useSpotlightContext;
