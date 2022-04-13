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
    slideFromRight: keyframes`
        from { transform: translate3d(100%, 0, 0) }
        to { transform: translate3d(0%, 0, 0) }
    `,
    slideFromLeft: keyframes`
        from { transform: translate3d(-100%, 0, 0) }
        to { transform: translate3d(0%, 0, 0) }
    `,
    slideFromTop: keyframes`
        from { transform: translate3d(0, 100%, 0) }
        to { transform: translate3d(0, 0%, 0) }
    `,
    slideFromBottom: keyframes`
        from { transform: translate3d(0, -100%, 0) }
        to { transform: translate3d(0, 0%, 0) }
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
