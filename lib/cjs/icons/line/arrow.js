"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrowIcon = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const _icon_1 = require("./_icon");
function ArrowIcon(_a) {
    var { direction } = _a, props = __rest(_a, ["direction"]);
    const [color, size] = (0, _icon_1.$icon)(props);
    switch (direction) {
        case 'left': return ((0, jsx_runtime_1.jsx)("svg", Object.assign({ width: size, height: size, className: props.className, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, { children: (0, jsx_runtime_1.jsx)("path", { d: 'M4.86572 11.6962C4.86572 11.9222 4.96366 12.1482 5.13693 12.3139L10.109 17.2785C10.2898 17.4518 10.4857 17.5347 10.7042 17.5347C11.1788 17.5347 11.5253 17.1956 11.5253 16.7361C11.5253 16.495 11.4349 16.2916 11.2767 16.141L9.58168 14.4233L7.39697 12.4269L9.15227 12.5324H18.2829C18.7801 12.5324 19.1266 12.1859 19.1266 11.6962C19.1266 11.199 18.7801 10.8525 18.2829 10.8525H9.15227L7.40451 10.9579L9.58168 8.96155L11.2767 7.24391C11.4349 7.09324 11.5253 6.88984 11.5253 6.64877C11.5253 6.18923 11.1788 5.85022 10.7042 5.85022C10.4857 5.85022 10.2823 5.93309 10.0864 6.12143L5.13693 11.0709C4.96366 11.2367 4.86572 11.4627 4.86572 11.6962Z', fill: color }) })));
        case 'up': return ((0, jsx_runtime_1.jsx)("svg", Object.assign({ width: size, height: size, className: props.className, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, { children: (0, jsx_runtime_1.jsx)("path", { d: 'M11.9998 18.8605C12.4895 18.8605 12.836 18.514 12.836 18.0168V8.71293L12.7757 7.08569L14.7269 9.26287L16.4445 10.9654C16.5952 11.1161 16.8062 11.214 17.0397 11.214C17.4992 11.214 17.8458 10.8675 17.8458 10.3929C17.8458 10.1744 17.7629 9.97102 17.5821 9.79021L12.6175 4.81812C12.4518 4.64485 12.2258 4.55444 11.9998 4.55444C11.7663 4.55444 11.5402 4.64485 11.3745 4.81812L6.41748 9.79021C6.23668 9.97102 6.15381 10.1744 6.15381 10.3929C6.15381 10.8675 6.49282 11.214 6.95236 11.214C7.19343 11.214 7.40437 11.1161 7.55504 10.9654L9.26514 9.26287L11.2238 7.07816L11.156 8.71293V18.0168C11.156 18.514 11.5026 18.8605 11.9998 18.8605Z', fill: color }) })));
        case 'down': return ((0, jsx_runtime_1.jsx)("svg", Object.assign({ width: size, height: size, className: props.className, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, { children: (0, jsx_runtime_1.jsx)("path", { d: 'M11.9998 4.55444C11.5026 4.55444 11.156 4.90098 11.156 5.39819V14.702L11.2238 16.3368L9.26514 14.1521L7.55504 12.4495C7.40437 12.2989 7.19343 12.2009 6.95236 12.2009C6.49282 12.2009 6.15381 12.5475 6.15381 13.0221C6.15381 13.2405 6.23668 13.444 6.41748 13.6248L11.3745 18.5969C11.5402 18.7701 11.7663 18.8605 11.9998 18.8605C12.2258 18.8605 12.4518 18.7701 12.6175 18.5969L17.5821 13.6248C17.7629 13.444 17.8458 13.2405 17.8458 13.0221C17.8458 12.5475 17.4992 12.2009 17.0397 12.2009C16.8062 12.2009 16.5952 12.2989 16.4445 12.4495L14.7269 14.1521L12.7757 16.3293L12.836 14.702V5.39819C12.836 4.90098 12.4895 4.55444 11.9998 4.55444Z', fill: color }) })));
        default: return ((0, jsx_runtime_1.jsx)("svg", Object.assign({ width: size, height: size, className: props.className, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, { children: (0, jsx_runtime_1.jsx)("path", { d: 'M19.1266 11.6962C19.1266 11.4627 19.0287 11.2367 18.8554 11.0709L13.9059 6.12143C13.71 5.93309 13.5066 5.85022 13.2957 5.85022C12.8135 5.85022 12.467 6.18923 12.467 6.64877C12.467 6.88984 12.5649 7.09324 12.7156 7.24391L14.4106 8.96155L16.5954 10.9579L14.8476 10.8525H5.71701C5.21226 10.8525 4.86572 11.199 4.86572 11.6962C4.86572 12.1859 5.21226 12.5324 5.71701 12.5324H14.8476L16.5954 12.4269L14.4106 14.4233L12.7156 16.141C12.5649 16.2916 12.467 16.495 12.467 16.7361C12.467 17.1956 12.8135 17.5347 13.2957 17.5347C13.5066 17.5347 13.71 17.4518 13.8908 17.2785L18.8554 12.3139C19.0287 12.1482 19.1266 11.9222 19.1266 11.6962Z', fill: color }) })));
    }
}
exports.ArrowIcon = ArrowIcon;
