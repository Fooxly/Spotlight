import { ColorMode } from '@/types';
import { HSLA, HSVA, RGBA } from '@/types/colors';

let ctx: CanvasRenderingContext2D | null;
if (typeof window !== 'undefined') {
    ctx = document.createElement('canvas').getContext('2d');
}

export function RGBAToLuma (color: RGBA): number {
    return (0.2126 * color.r) + (0.7152 * color.g) + (0.0722 * color.b);
}

export function HexToLuma (color: string): number {
    const rgb = HexToRGBA(color);
    return (0.2126 * rgb.r) + (0.7152 * rgb.g) + (0.0722 * rgb.b);
}

export function combineHexColors (hex1: string, hex2: string): string {
    const base = HexToRGBA(hex1);
    const added = HexToRGBA(hex2);

    const mix: RGBA = {
        r: 0,
        g: 0,
        b: 0,
        a: 0,
    };
    mix.a = 1 - (1 - added.a) * (1 - base.a); // alpha
    mix.r = Math.round((added.r * added.a / mix.a) + (base.r * base.a * (1 - added.a) / mix.a)); // red
    mix.g = Math.round((added.g * added.a / mix.a) + (base.g * base.a * (1 - added.a) / mix.a)); // green
    mix.b = Math.round((added.b * added.a / mix.a) + (base.b * base.a * (1 - added.a) / mix.a)); // blue

    return RGBAToHex(mix);
}

export function getColorFromHex (mode: ColorMode, hex: string, alpha = true): RGBA | HSLA | string {
    switch (mode) {
        case 'hex': return strToHex(hex, alpha);
        case 'rgba': return HexToRGBA(hex);
        case 'hsla': return HexToHSLA(hex);
    }
}

export function getColorStringForMode (mode: ColorMode, hex: string, alpha = true): string {
    const startHex = hex.toUpperCase();
    switch (mode) {
        case 'hex': return strToHex(startHex, alpha);
        case 'rgba': {
            const rgba = HexToRGBA(startHex);
            return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
        }
        case 'hsla': {
            const hsla = HexToHSLA(startHex);
            return `hsla(${hsla.h}, ${hsla.s}%, ${hsla.l}%, ${hsla.a})`;
        }
    }
}

export function strToHex (str: string, alpha = true): string {
    const startHex = str.toUpperCase();
    const showAlpha = alpha
        ? !((startHex.charAt(7) === 'F' && startHex.charAt(8) === 'F'))
        : false;
    return startHex.slice(0, showAlpha ? 9 : 7);
}

// Convert a hex string to RGBA object
export function HexToRGBA (str: string): RGBA {
    const regex = /^((rgba)|rgb)\D+([\d.]+)\D+([\d.]+)\D+([\d.]+)\D*?([\d.]+|$)/i;
    let match, rgba;

    if (ctx !== null) {
        // Default to black for invalid color strings
        ctx.fillStyle = '#000';

        // Use canvas to convert the string to a valid color string
        ctx.fillStyle = str;
        match = regex.exec(ctx.fillStyle);

        if (match) {
            rgba = {
                r: Number(match[3]) * 1,
                g: Number(match[4]) * 1,
                b: Number(match[5]) * 1,
                a: Number(match[6]) * 1,
            };

            // Workaround to mitigate a Chromium bug where the alpha value is rounded incorrectly
            rgba.a = +rgba.a.toFixed(2);
        } else {
            match = ctx.fillStyle.replace('#', '').match(/.{2}/g)?.map((h) => Number.parseInt(h, 16));
            if (match) {
                rgba = {
                    r: match[0],
                    g: match[1],
                    b: match[2],
                    a: 1,
                };
            }
        }
        return rgba ?? { r: 0, g: 0, b: 0, a: 0 };
    }
    return { r: 0, g: 0, b: 0, a: 0 };
}

// Convert a hex string to HSLA object
export function HexToHSLA (str: string): HSLA {
    return HSVAtoHSLA(RGBAtoHSVA(HexToRGBA(str)));
}

export function RGBAToHex (rgba: RGBA, alpha = true): string {
    let R = rgba.r.toString(16);
    let G = rgba.g.toString(16);
    let B = rgba.b.toString(16);
    let A = '';

    if (rgba.r < 16) {
        R = '0' + R;
    }

    if (rgba.g < 16) {
        G = '0' + G;
    }

    if (rgba.b < 16) {
        B = '0' + B;
    }

    if (alpha) {
        const newAlpha = Math.trunc(rgba.a * 255);
        A = newAlpha.toString(16);

        if (newAlpha < 16) {
            A = '0' + A;
        }
    }

    return '#' + R + G + B + A;
}

export function HSVAtoRGBA (hsva: HSVA): RGBA {
    const saturation = hsva.s / 100;
    const value = hsva.v / 100;
    let chroma = saturation * value;
    const hueBy60 = hsva.h / 60;
    let x = chroma * (1 - Math.abs(hueBy60 % 2 - 1));
    const m = value - chroma;

    chroma = (chroma + m);
    x = (x + m);

    const index = Math.floor(hueBy60) % 6;
    const red = [chroma, x, m, m, x, chroma][index];
    const green = [x, chroma, chroma, x, m, m][index];
    const blue = [m, m, x, chroma, chroma, x][index];

    return {
        r: Math.round(red * 255),
        g: Math.round(green * 255),
        b: Math.round(blue * 255),
        a: hsva.a,
    };
}

export function RGBAtoHSVA (rgba: RGBA): HSVA {
    const red = rgba.r / 255;
    const green = rgba.g / 255;
    const blue = rgba.b / 255;
    const xmax = Math.max(red, green, blue);
    const xmin = Math.min(red, green, blue);
    const chroma = xmax - xmin;
    const value = xmax;
    let hue = 0;
    let saturation = 0;

    if (chroma) {
        if (xmax === red) { hue = ((green - blue) / chroma); }
        if (xmax === green) { hue = 2 + (blue - red) / chroma; }
        if (xmax === blue) { hue = 4 + (red - green) / chroma; }
        if (xmax) { saturation = chroma / xmax; }
    }

    hue = Math.floor(hue * 60);

    return {
        h: hue < 0 ? hue + 360 : hue,
        s: Math.round(saturation * 100),
        v: Math.round(value * 100),
        a: rgba.a,
    };
}

export function HSVAtoHSLA (hsva: HSVA): HSLA {
    const value = hsva.v / 100;
    const lightness = value * (1 - (hsva.s / 100) / 2);
    let saturation;

    if (lightness > 0 && lightness < 1) {
        saturation = Math.round((value - lightness) / Math.min(lightness, 1 - lightness) * 100);
    }

    return {
        h: hsva.h,
        s: saturation ?? 0,
        l: Math.round(lightness * 100),
        a: hsva.a,
    };
}
