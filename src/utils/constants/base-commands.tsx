/* eslint-disable unicorn/no-await-expression-member */
import React from 'react';

import { Icons } from './icons';

import type { Command, JumpTo } from '@/types';
import { shell, toast, question } from '@/index';
import { themes } from '@/theme';

export const BASE_COMMANDS: Command[] = [
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
            if (!icon) return;
            try {
                if (navigator.clipboard) {
                    toast(`"${icon}" is copied to your clipboard!`);
                    return navigator.clipboard?.writeText?.(icon);
                } else {
                    throw new Error('CLIPBOARD_API_NOT_SUPPORTED');
                }
            } catch {
                toast(`We were unable to copy "${icon}" to your clipboard.`);
            }
        },
        title: 'Spotlight icon list',
        type: 'command',
        options: {
            icon: 'brush',
            keywords: ['icons'],
            options: Icons.map((icon) => ({ title: icon, icon })),
        },
    },
    {
        action: () => {
            try {
                const uuid = ([1e7].toString() + `${-1e3}` + `${-4e3}` + `${-8e3}` + `${-1e11}`)
                    .replace(/[018]/g, (c) =>
                        (
                            Number(c) ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> Number(c) / 4
                        ).toString(16),
                    );

                if (navigator.clipboard) {
                    toast(
                        <span>
                            Copied the UUID{'\u00A0'}
                            <span
                                style={{
                                    borderRadius: '5px',
                                    backgroundColor: themes.light.color.blue,
                                    padding: '3px 7px',
                                    color: '#fff',
                                }}
                            >
                                {uuid}
                            </span>
                            {'\u00A0'}to your clipboard
                        </span>,
                    );
                    return navigator.clipboard.writeText?.(uuid);
                } else {
                    throw new Error('CLIPBOARD_API_NOT_SUPPORTED');
                }
            } catch {
                toast('We were unable to copy the UUID to your clipboard.');
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
        action: async () => {
            try {
                const branchesRaw = await shell('git branch -a -l --format "%(refname)"');
                const branches =
                branchesRaw
                    ?.split('\n')
                    .map((branch) =>
                        branch
                            .split(/refs\/(?:heads|remotes)\//)
                            .join('')
                            .trim(),
                    )
                    .filter(Boolean) ?? [];

                const changes = ((await shell('git status -s'))?.trim().length ?? 0) > 0;
                const currentBranch =
                (await shell('git branch --show-current'))?.trim() ?? 'main';
                const originDifference = branches.includes(`origin/${currentBranch}`)
                    ? ((
                        await shell(
                            `git rev-list --left-right ${currentBranch}...origin/${currentBranch}`,
                        )
                    )?.trim().length ?? 0) > 0
                    : true;

                const branch = await question(
                    'Which branch? (Current branch = 🔵 Current branch with changes = 🟠)',
                    branches.map((brch) => {
                        const hasChanges = brch === currentBranch && changes;
                        const isCurrent = currentBranch === (originDifference ? brch : brch.replace('origin/', ''));
                        return {
                            key: brch,
                            label: brch,
                            icon: hasChanges ? '🟠' : isCurrent ? '🔵' : '🪵',
                        };
                    }),
                );

                const stashName = `Spotlight Stash: ${new Date().toLocaleString()}`;

                if (changes) {
                    const result = await shell(
                        `git stash push -m '${stashName}' && git checkout ${branch} && (git stash pop stash@{0} || (git checkout ${currentBranch} -f && git stash pop stash@{0}))`,
                    );

                    if (result?.includes(`On branch ${currentBranch}`)) {
                        const url = new URL(window.location.href);
                        url.searchParams.append('spotlight-error', 'Failed to switch branch due to changes.');
                        window.location.href = url.toString();
                        return;
                    }
                } else {
                    await shell(`git checkout ${branch}`);
                }

                const url = new URL(window.location.href);
                url.searchParams.append('spotlight-branch-switch', 'true');
                window.location.href = url.toString();
            } catch {
                toast('We were unable to switch branches.');
            }
        },
        title: 'Switch Git branch',
        type: 'command',
        options: {
            icon: 'branch',
        },
    },
];

export const BASE_PAGES: JumpTo[] = [
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

export const ICONS: JumpTo[] = Icons.map((icon) => ({
    title: icon,
    page: '/',
    type: 'jump-to',
    options: {
        icon,
    },
}));
