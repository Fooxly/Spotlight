import { jsx as _jsx } from "react/jsx-runtime";
import { $icon } from './_icon';
export function EyedropperIcon(props) {
    const [color, size] = $icon(props);
    return (_jsx("svg", Object.assign({ width: size, height: size, viewBox: '0 0 28 28', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, { children: _jsx("path", { fill: color, d: 'M18.667 14.2432L18.9395 13.9619C19.4053 13.4609 19.4229 12.8809 18.9219 12.3799L18.6758 12.1338C20.0732 10.9033 21.5762 10.7803 22.5605 9.79591C23.9141 8.41602 23.5537 6.44727 22.5254 5.41017C21.4971 4.36427 19.5283 4.03028 18.1396 5.36622C17.1377 6.34181 17.0234 7.85352 15.793 9.25099L15.5557 9.00489C15.0635 8.50392 14.4658 8.52149 13.9736 8.9961L13.6836 9.26856C13.1035 9.81349 13.1914 10.332 13.71 10.8506L14.0615 11.2022L7.61035 17.6621C4.78906 20.4834 5.93164 20.3955 4.54297 22.3203L5.43066 23.2695C7.31152 21.8809 7.37305 23.1377 10.2207 20.3164L16.7158 13.8565L17.085 14.2168C17.6035 14.7354 18.1133 14.8233 18.667 14.2432ZM11.416 16.5547C11.1172 16.2383 11.1875 15.9307 11.5039 15.6055L14.9756 12.1074L15.8457 12.9775L12.3477 16.4756C12.0576 16.7656 11.6885 16.8535 11.416 16.5547Z' }) })));
}