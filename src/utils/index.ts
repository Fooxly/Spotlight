export * from './constants';
export * from './contexts';
export * from './hooks';
export * from './fuzzy-search';
export * from './get-local-icon';
export * from './history';
export * from './search';
export * from './uuid';

export function getMainComponent () {
    let spotlightMain: HTMLDivElement | null = null;
    if (typeof window !== 'undefined') {
        spotlightMain = document.querySelector<HTMLDivElement>('#spotlight');
        if (!spotlightMain) {
            spotlightMain = document.createElement('div');
            spotlightMain.id = 'spotlight';
            document.body.append(spotlightMain);
        }
        return document.querySelector('#spotlight') as HTMLDivElement;
    }
    return null;
}
