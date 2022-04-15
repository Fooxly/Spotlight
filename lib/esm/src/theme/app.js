import { createGlobalStyle, css } from 'styled-components';
import { SourceCodePro } from './fonts';
// NOTE: background-color transition for theme switch
export const AppStyles = createGlobalStyle `
    ${SourceCodePro}

    #fooxly-spotlight {
        font-family: ${(p) => p.theme.text.System.family};
        line-height: 1.3;
        letter-spacing: .02em;
        ${(p) => p.$animations ? '' : css `
            animation-delay: 0s !important;
            animation-duration: 0s !important;
            transition-delay: 0s !important;
            transition-duration: 0s !important;

            ::after,
            ::before {
                animation-delay: 0s !important;
                animation-duration: 0s !important;
                transition-delay: 0s !important;
                transition-duration: 0s !important;
            }
        `}
    }

    #fooxly-spotlight pre, kbd, code, samp {
        font-family: ${(p) => p.theme.text.SourceCodePro.family};
    }

    #fooxly-spotlight *::placeholder {
        font-weight: 400;
        color: ${(p) => p.theme.color.gray3} !important;
    }

    #fooxly-spotlight input[type="password"]::placeholder {
        font-weight: 700;
        letter-spacing: .4em;
    }
`;
