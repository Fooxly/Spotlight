import { Appearance, Theme } from '@/types';

export function isSystemInDarkMode (): boolean {
    try {
        return (window.matchMedia?.('(prefers-color-scheme: dark)').matches);
    } catch {}
    return false;
}

export function getTheme (appearance: Appearance): Theme {
    if (appearance === 'auto') {
        return isSystemInDarkMode() ? 'dark' : 'light';
    }
    return appearance;
}

export function getColor (value: string): string {
    const container = document.querySelector('#spotlight');
    if (!container) return value;
    const result = getComputedStyle(container).getPropertyValue(`--color-${value}`);
    if (result?.length) return result;
    return value;
}
