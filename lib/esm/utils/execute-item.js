import { updateHistory } from './history';
export function executeItem(item, param) {
    var _a;
    if (((_a = item.options) === null || _a === void 0 ? void 0 : _a.confirm) &&
        !confirm(typeof item.options.confirm === 'string'
            ? item.options.confirm
            : 'Are you sure you want to continue? This could have major consequences.'))
        return;
    updateHistory(item);
    if (item.type === 'command') {
        return item.action(param);
    }
    else {
        window.location.href = item.page;
    }
}
