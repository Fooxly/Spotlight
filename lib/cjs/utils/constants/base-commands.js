"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ICONS = exports.BASE_PAGES = exports.BASE_COMMANDS = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const icons_1 = require("./icons");
const index_1 = require("../../index");
const theme_1 = require("../../theme");
exports.BASE_COMMANDS = [
    {
        action: () => { window.location.reload(); },
        title: 'Reload window',
        type: 'command',
        options: {
            icon: 'redo',
            keywords: ['reload', 'window', 'refresh'],
        },
    },
    {
        action: (icon) => {
            var _a, _b;
            if (!icon)
                return;
            try {
                if (navigator.clipboard) {
                    (0, index_1.toast)(`"${icon}" is copied to your clipboard!`);
                    return (_b = (_a = navigator.clipboard) === null || _a === void 0 ? void 0 : _a.writeText) === null || _b === void 0 ? void 0 : _b.call(_a, icon);
                }
                else {
                    throw new Error('CLIPBOARD_API_NOT_SUPPORTED');
                }
            }
            catch (_c) {
                (0, index_1.toast)(`We were unable to copy "${icon}" to your clipboard.`);
            }
        },
        title: 'Spotlight icon list',
        type: 'command',
        options: {
            icon: 'brush',
            keywords: ['icons'],
            options: icons_1.Icons.map((icon) => ({ title: icon, icon })),
        },
    },
    {
        action: () => {
            var _a, _b;
            try {
                const uuid = ([1e7].toString() + `${-1e3}` + `${-4e3}` + `${-8e3}` + `${-1e11}`)
                    .replace(/[018]/g, (c) => (Number(c) ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> Number(c) / 4).toString(16));
                if (navigator.clipboard) {
                    (0, index_1.toast)((0, jsx_runtime_1.jsxs)("span", { children: ["Copied the UUID", '\u00A0', (0, jsx_runtime_1.jsx)("span", Object.assign({ style: {
                                    borderRadius: '5px',
                                    backgroundColor: theme_1.themes.light.color.blue,
                                    padding: '3px 7px',
                                    color: '#fff',
                                } }, { children: uuid })), '\u00A0', "to your clipboard"] }));
                    return (_b = (_a = navigator.clipboard).writeText) === null || _b === void 0 ? void 0 : _b.call(_a, uuid);
                }
                else {
                    throw new Error('CLIPBOARD_API_NOT_SUPPORTED');
                }
            }
            catch (_c) {
                (0, index_1.toast)('We were unable to copy the UUID to your clipboard.');
            }
        },
        title: 'Generate UUIDv4',
        type: 'command',
        options: {
            icon: 'dice',
            keywords: ['random', 'serial'],
        },
    },
    {
        action: () => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g;
            try {
                const branchesRaw = yield (0, index_1.shell)('git branch -a -l --format "%(refname)"');
                const branches = (_a = branchesRaw === null || branchesRaw === void 0 ? void 0 : branchesRaw.split('\n').map((branch) => branch
                    .split(/refs\/(?:heads|remotes)\//)
                    .join('')
                    .trim()).filter(Boolean)) !== null && _a !== void 0 ? _a : [];
                const changes = ((_c = (_b = (yield (0, index_1.shell)('git status -s'))) === null || _b === void 0 ? void 0 : _b.trim().length) !== null && _c !== void 0 ? _c : 0) > 0;
                const currentBranch = (_e = (_d = (yield (0, index_1.shell)('git branch --show-current'))) === null || _d === void 0 ? void 0 : _d.trim()) !== null && _e !== void 0 ? _e : 'main';
                const originDifference = branches.includes(`origin/${currentBranch}`)
                    ? ((_g = (_f = (yield (0, index_1.shell)(`git rev-list --left-right ${currentBranch}...origin/${currentBranch}`))) === null || _f === void 0 ? void 0 : _f.trim().length) !== null && _g !== void 0 ? _g : 0) > 0
                    : true;
                const branch = yield (0, index_1.question)('Which branch? (Current branch = 🔵 Current branch with changes = 🟠)', branches.map((brch) => {
                    const hasChanges = brch === currentBranch && changes;
                    const isCurrent = currentBranch === (originDifference ? brch : brch.replace('origin/', ''));
                    return {
                        key: brch,
                        label: brch,
                        icon: hasChanges ? '🟠' : isCurrent ? '🔵' : '🪵',
                    };
                }));
                const stashName = `Spotlight Stash: ${new Date().toLocaleString()}`;
                if (changes) {
                    const result = yield (0, index_1.shell)(`git stash push -m '${stashName}' && git checkout ${branch} && (git stash pop stash@{0} || (git checkout ${currentBranch} -f && git stash pop stash@{0}))`);
                    if (result === null || result === void 0 ? void 0 : result.includes(`On branch ${currentBranch}`)) {
                        const url = new URL(window.location.href);
                        url.searchParams.append('spotlight-error', 'Failed to switch branch due to changes.');
                        window.location.href = url.toString();
                        return;
                    }
                }
                else {
                    yield (0, index_1.shell)(`git checkout ${branch}`);
                }
                const url = new URL(window.location.href);
                url.searchParams.append('spotlight-branch-switch', 'true');
                window.location.href = url.toString();
            }
            catch (_h) {
                (0, index_1.toast)('We were unable to switch branches.');
            }
        }),
        title: 'Switch Git branch',
        type: 'command',
        options: {
            icon: 'branch',
        },
    },
];
exports.BASE_PAGES = [
    {
        title: 'Homepage',
        page: '/',
        type: 'jump-to',
        options: {
            icon: 'house',
            keywords: ['home', 'homepage'],
        },
    },
];
exports.ICONS = icons_1.Icons.map((icon) => ({
    title: icon,
    page: '/',
    type: 'jump-to',
    options: {
        icon,
    },
}));
