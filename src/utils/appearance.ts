import { Appearance } from '@/types';

export function isSystemInDarkMode (): boolean {
    try {
        return (window.matchMedia?.('(prefers-color-scheme: dark)').matches);
    } catch {}
    return false;
}

export function getTheme (appearance: Appearance): 'light' | 'dark' {
    if (appearance === 'auto') {
        return isSystemInDarkMode() ? 'dark' : 'light';
    }
    return appearance;
}
