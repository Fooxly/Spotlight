export function executeItem(item, param) {
    if (item.type === 'command') {
        return item.action(param);
    }
    else {
        window.location.href = item.page;
    }
}
