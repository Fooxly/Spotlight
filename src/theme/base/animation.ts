import { keyframes } from 'styled-components';

export const animation = {
    fadeIn: keyframes`
        from { opacity: 0 }
        to { opacity: 1 }
    `,
    fadeOut: keyframes`
        from { opacity: 1 }
        to { opacity: 0 }
    `,
    slideFromBottom: keyframes`
        from {
            opacity: 0;
            transform: translate3d(0, 100%, 0);
        }
        to {
            opacity: 1;
            transform: translate3d(0, 0%, 0);
        }
    `,
    fadeInWithPulse: keyframes`
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
