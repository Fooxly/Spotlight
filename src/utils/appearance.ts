export function isSystemInDarkMode (): boolean {
    try {
        return (window.matchMedia?.('(prefers-color-scheme: dark)').matches);
    } catch {}
    return false;
}
