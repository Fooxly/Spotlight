import React from 'react';

import { $icon, IconProps } from './_icon';

export function ShieldIcon (props: IconProps): JSX.Element {
    const [color, size] = $icon(props);

    return (
        <svg width={size} height={size} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M11.9925 19.5535C12.1281 19.5535 12.3315 19.5083 12.5274 19.4029C16.8591 17.0449 18.3658 15.9525 18.3658 13.2103V7.52257C18.3658 6.61855 18.0193 6.29461 17.2584 5.97067C16.4297 5.61659 13.6122 4.63724 12.7986 4.3585C12.5424 4.27563 12.2562 4.2229 11.9925 4.2229C11.7364 4.2229 11.4426 4.2907 11.194 4.3585C10.3803 4.59204 7.56281 5.62413 6.73413 5.97067C5.97325 6.28707 5.62671 6.61855 5.62671 7.52257V13.2103C5.62671 15.9525 7.13341 17.0298 11.4652 19.4029C11.661 19.5083 11.8644 19.5535 11.9925 19.5535ZM11.9925 17.9564C11.887 17.9564 11.7816 17.9188 11.5631 17.7832C8.12782 15.6889 7.05807 15.1238 7.05807 12.9316V11.7036H12.1206V5.66933C12.1959 5.6844 12.2863 5.707 12.3993 5.74466C13.3937 6.1364 15.5408 6.89729 16.6633 7.29656C16.8817 7.37943 16.9345 7.49243 16.9345 7.76364V11.7036H12.1206V17.9338C12.0754 17.9489 12.0377 17.9564 11.9925 17.9564Z' fill={color} />
        </svg>
    );
}