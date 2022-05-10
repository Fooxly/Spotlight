"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.animation = void 0;
const styled_components_1 = require("styled-components");
exports.animation = {
    fadeIn: (0, styled_components_1.keyframes) `
        from { opacity: 0 }
        to { opacity: 1 }
    `,
    fadeOut: (0, styled_components_1.keyframes) `
        from { opacity: 1 }
        to { opacity: 0 }
    `,
    slideFromBottom: (0, styled_components_1.keyframes) `
        from {
            opacity: 0;
            transform: translate3d(0, 100%, 0);
        }
        to {
            opacity: 1;
            transform: translate3d(0, 0%, 0);
        }
    `,
    fadeInWithPulse: (0, styled_components_1.keyframes) `
        from {
            opacity: 0;
            transform: scale3d(0.9, 0.9, 0.9);
        }
        to {
            opacity: 1;
            transform: scale3d(1, 1, 1);
        }
    `,
};
