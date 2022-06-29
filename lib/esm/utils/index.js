export * from './constants';
export * from './hooks';
export function getMainComponent() {
    let spotlightMain = null;
    if (typeof window !== 'undefined') {
        spotlightMain = document.querySelector('#spotlight');
        if (!spotlightMain) {
            spotlightMain = document.createElement('div');
            spotlightMain.id = 'spotlight';
            document.body.append(spotlightMain);
        }
        return document.querySelector('#spotlight');
    }
    return null;
}
