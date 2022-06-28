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
export declare type ColorMode = 'hex' | 'rgba' | 'hsla';
export declare type Appearance = 'light' | 'dark' | 'auto';
export declare type Theme = 'light' | 'dark';
