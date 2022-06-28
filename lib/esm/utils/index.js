export * from './constants';
export * from './execute-item';
export * from './history';
export * from './filter-results';
export * from './get-command-icon';
export * from './lens';
export * from './spotlight-context';
export function getMainComponent() {
    let spotlightMain = null;
    if (typeof window !== 'undefined') {
        spotlightMain = document.querySelector('#spotlight-main');
        if (!spotlightMain) {
            spotlightMain = document.createElement('div');
            spotlightMain.id = 'spotlight-main';
            document.body.append(spotlightMain);
        }
        return document.querySelector('#spotlight-main');
    }
    return null;
}
