import React from 'react';

import { $icon, IconProps } from './_icon';

export function BranchIcon (props: IconProps): JSX.Element {
    const [color, size] = $icon(props);

    return (
        <svg width={size} height={size} viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path fill={color} d='M7.82129 10.7891L8.69141 9.66408L8.75293 9.70802C10.7656 11 13.1211 13.9531 13.1211 16.0274V20.9492C13.1211 21.6084 13.4287 21.9688 13.9912 21.9688C14.5537 21.9688 14.8701 21.6084 14.8701 20.9492V16.0274C14.8701 13.9531 17.2168 11 19.2383 9.70802L19.2646 9.69045L20.0469 10.7715C20.4424 11.3252 20.9521 11.1758 21.1631 10.5342L22.3145 7.10646C22.4902 6.58791 22.2002 6.20119 21.6553 6.20119L18.0342 6.24513C17.375 6.24513 17.085 6.69338 17.4717 7.22951L18.2188 8.25783C16.3027 9.57619 14.3428 12.0459 14.0088 13.417H13.9824C13.6396 12.0371 11.6885 9.57619 9.77246 8.25783L10.502 7.32619C10.9063 6.79885 10.625 6.34181 9.96582 6.31545L6.35352 6.17482C5.80859 6.14845 5.50977 6.52638 5.66797 7.05373L6.71387 10.5166C6.89844 11.1582 7.4082 11.3164 7.82129 10.7891Z' />
        </svg>
    );
}
