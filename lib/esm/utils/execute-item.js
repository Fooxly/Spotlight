export function executeItem(item) {
    if (item.type === 'command') {
        item.action();
    }
    else {
        // TODO: support external links
        window.location.href = item.page;
    }
}
