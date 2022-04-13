"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.animation = void 0;
var styled_components_1 = require("styled-components");
exports.animation = {
    fadeIn: (0, styled_components_1.keyframes)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        from { opacity: 0 }\n        to { opacity: 1 }\n    "], ["\n        from { opacity: 0 }\n        to { opacity: 1 }\n    "]))),
    fadeOut: (0, styled_components_1.keyframes)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n        from { opacity: 1 }\n        to { opacity: 0 }\n    "], ["\n        from { opacity: 1 }\n        to { opacity: 0 }\n    "]))),
    slideFromRight: (0, styled_components_1.keyframes)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n        from { transform: translate3d(100%, 0, 0) }\n        to { transform: translate3d(0%, 0, 0) }\n    "], ["\n        from { transform: translate3d(100%, 0, 0) }\n        to { transform: translate3d(0%, 0, 0) }\n    "]))),
    slideFromLeft: (0, styled_components_1.keyframes)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n        from { transform: translate3d(-100%, 0, 0) }\n        to { transform: translate3d(0%, 0, 0) }\n    "], ["\n        from { transform: translate3d(-100%, 0, 0) }\n        to { transform: translate3d(0%, 0, 0) }\n    "]))),
    slideFromTop: (0, styled_components_1.keyframes)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n        from { transform: translate3d(0, 100%, 0) }\n        to { transform: translate3d(0, 0%, 0) }\n    "], ["\n        from { transform: translate3d(0, 100%, 0) }\n        to { transform: translate3d(0, 0%, 0) }\n    "]))),
    slideFromBottom: (0, styled_components_1.keyframes)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n        from { transform: translate3d(0, -100%, 0) }\n        to { transform: translate3d(0, 0%, 0) }\n    "], ["\n        from { transform: translate3d(0, -100%, 0) }\n        to { transform: translate3d(0, 0%, 0) }\n    "]))),
    fadeInWithPulse: (0, styled_components_1.keyframes)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n        from {\n            opacity: 0;\n            transform: scale3d(0.9, 0.9, 0.9);\n        }\n        to {\n            opacity: 1;\n            transform: scale3d(1, 1, 1);\n        }\n    "], ["\n        from {\n            opacity: 0;\n            transform: scale3d(0.9, 0.9, 0.9);\n        }\n        to {\n            opacity: 1;\n            transform: scale3d(1, 1, 1);\n        }\n    "]))),
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
