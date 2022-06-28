export interface HSVA {
    h: number;
    s: number;
    v: number;
    a: number;
}

export interface HSLA {
    h: number;
    s: number;
    l: number;
    a: number;
}

export interface RGBA {
    r: number;
    g: number;
    b: number;
    a: number;
}

export type ColorMode = 'hex' | 'rgba' | 'hsla';

export type Appearance = 'light' | 'dark' | 'auto';

export type Theme = 'light' | 'dark';
