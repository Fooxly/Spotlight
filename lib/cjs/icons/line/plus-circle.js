"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlusCircleIcon = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const _icon_1 = require("./_icon");
function PlusCircleIcon(props) {
    const [color, size] = (0, _icon_1.$icon)(props);
    return ((0, jsx_runtime_1.jsx)("svg", { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', children: (0, jsx_runtime_1.jsx)("path", { d: 'M11.9925 19.4933C16.264 19.4933 19.7897 15.9676 19.7897 11.7037C19.7897 7.43973 16.2565 3.91406 11.985 3.91406C7.72102 3.91406 4.20288 7.43973 4.20288 11.7037C4.20288 15.9676 7.72855 19.4933 11.9925 19.4933ZM11.9925 17.9414C8.53463 17.9414 5.76984 15.1616 5.76984 11.7037C5.76984 8.24581 8.53463 5.47349 11.985 5.47349C15.4428 5.47349 18.2227 8.24581 18.2302 11.7037C18.2378 15.1616 15.4504 17.9414 11.9925 17.9414ZM9.52152 14.8677C9.71739 14.8677 9.89066 14.7999 10.0187 14.6643L11.9925 12.6906L13.9663 14.6643C14.0943 14.7924 14.2601 14.8677 14.4635 14.8677C14.8477 14.8677 15.149 14.5664 15.149 14.1822C15.149 13.9939 15.0737 13.8281 14.9456 13.7001L12.9643 11.7188L14.9456 9.72991C15.0888 9.58677 15.1566 9.4361 15.1566 9.2553C15.1566 8.87109 14.8552 8.56975 14.471 8.56975C14.2827 8.56975 14.1245 8.63002 13.9813 8.77316L11.9925 10.7545L10.0037 8.78069C9.87559 8.64509 9.71739 8.57729 9.52152 8.57729C9.13731 8.57729 8.83597 8.87109 8.83597 9.2553C8.83597 9.44364 8.91131 9.60938 9.04691 9.73744L11.0207 11.7188L9.04691 13.7076C8.91131 13.8281 8.83597 14.0014 8.83597 14.1822C8.83597 14.5664 9.13731 14.8677 9.52152 14.8677Z', fill: color }) }));
}
exports.PlusCircleIcon = PlusCircleIcon;