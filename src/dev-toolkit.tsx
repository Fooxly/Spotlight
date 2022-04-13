import React, { useMemo } from 'react';
import { ThemeProvider } from 'styled-components';

import { SpotlightComponent } from './spotlight';
import { getColorFunction, themes } from './theme';
import { Theme } from './types';

interface Props {
    isDarkMode?: boolean;
}

export * from './spotlight';

export function DevToolkit ({ isDarkMode }: Props): JSX.Element {
    const calculatedTheme = useMemo(() => {
        const selectedTheme: Theme = themes[isDarkMode ? 'dark' : 'light'];
        return {
            ...selectedTheme,
            color: getColorFunction({ ...selectedTheme.color.colors }),
        };
    }, [isDarkMode]);

    return (
        <div id='dev-toolkit'>
            <ThemeProvider theme={calculatedTheme}>
                <SpotlightComponent />
            </ThemeProvider>
        </div>
    );
}
