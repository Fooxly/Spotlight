export declare const base: {
    light: boolean;
    animation: {
        fadeIn: import("styled-components").Keyframes;
        fadeOut: import("styled-components").Keyframes;
        slideFromBottom: import("styled-components").Keyframes;
        fadeInWithPulse: import("styled-components").Keyframes;
    };
    color: ((color?: import("./color").Color | undefined, fallback?: import("./color").Color | undefined) => string) & {
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
    flex: {
        row: ({ reverse, align, fullWidth, ...props }?: import("./flex").FlexProps) => import("styled-components").FlattenSimpleInterpolation;
        col: ({ reverse, ...props }?: import("./flex").FlexProps) => import("styled-components").FlattenSimpleInterpolation;
    };
    shadow: {
        header: string;
        footer: string;
    };
    text: {
        System: Record<"family", string> & {
            light: import("./text").TextFunction;
            thin: import("./text").TextFunction;
            extralight: import("./text").TextFunction;
            regular: import("./text").TextFunction;
            medium: import("./text").TextFunction;
            semibold: import("./text").TextFunction;
            bold: import("./text").TextFunction;
            extrabold: import("./text").TextFunction;
            black: import("./text").TextFunction;
        };
        SourceCodePro: Record<"family", string> & {
            light: import("./text").TextFunction;
            extralight: import("./text").TextFunction;
            regular: import("./text").TextFunction;
            medium: import("./text").TextFunction;
            semibold: import("./text").TextFunction;
            bold: import("./text").TextFunction;
            black: import("./text").TextFunction;
        };
    };
};
