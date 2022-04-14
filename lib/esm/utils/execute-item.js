export function executeItem(item, param) {
    if (item.type === 'command') {
        return item.action(param);
    }
    else {
        // TODO: support external links
        window.location.href = item.page;
    }
}
