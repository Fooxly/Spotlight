export declare const dark: {
    light: boolean;
    color: ((color?: import("../base/color").Color | undefined, fallback?: import("../base/color").Color | undefined) => string) & {
        green: `#${string}`;
        yellow: `#${string}`;
        orange: `#${string}`;
        red: `#${string}`;
        teal: `#${string}`;
        blue: `#${string}`;
        indigo: `#${string}`;
        purple: `#${string}`;
        pink: `#${string}`;
        gray10: `#${string}`;
        gray9: `#${string}`;
        gray8: `#${string}`;
        gray7: `#${string}`;
        gray6: `#${string}`;
        gray5: `#${string}`;
        gray4: `#${string}`;
        gray3: `#${string}`;
        gray2: `#${string}`;
        gray1: `#${string}`;
    } & {
        colors: {
            green: `#${string}`;
            yellow: `#${string}`;
            orange: `#${string}`;
            red: `#${string}`;
            teal: `#${string}`;
            blue: `#${string}`;
            indigo: `#${string}`;
            purple: `#${string}`;
            pink: `#${string}`;
            gray10: `#${string}`;
            gray9: `#${string}`;
            gray8: `#${string}`;
            gray7: `#${string}`;
            gray6: `#${string}`;
            gray5: `#${string}`;
            gray4: `#${string}`;
            gray3: `#${string}`;
            gray2: `#${string}`;
            gray1: `#${string}`;
        };
    };
    shadow: {
        header: string;
        footer: string;
    };
    animation: {
        fadeIn: import("styled-components").Keyframes;
        fadeOut: import("styled-components").Keyframes;
        slideFromBottom: import("styled-components").Keyframes;
        fadeInWithPulse: import("styled-components").Keyframes;
    };
    flex: {
        row: ({ reverse, align, fullWidth, ...props }?: import("../base/flex").FlexProps) => import("styled-components").FlattenSimpleInterpolation;
        col: ({ reverse, ...props }?: import("../base/flex").FlexProps) => import("styled-components").FlattenSimpleInterpolation;
    };
    text: {
        System: Record<"family", string> & {
            light: import("../base/text").TextFunction;
            thin: import("../base/text").TextFunction;
            extralight: import("../base/text").TextFunction;
            regular: import("../base/text").TextFunction;
            medium: import("../base/text").TextFunction;
            semibold: import("../base/text").TextFunction;
            bold: import("../base/text").TextFunction;
            extrabold: import("../base/text").TextFunction;
            black: import("../base/text").TextFunction;
        };
        SourceCodePro: Record<"family", string> & {
            light: import("../base/text").TextFunction;
            extralight: import("../base/text").TextFunction;
            regular: import("../base/text").TextFunction;
            medium: import("../base/text").TextFunction;
            semibold: import("../base/text").TextFunction;
            bold: import("../base/text").TextFunction;
            black: import("../base/text").TextFunction;
        };
    };
};
