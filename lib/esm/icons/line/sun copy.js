import { jsx as _jsx } from "react/jsx-runtime";
import { $icon } from './_icon';
export function RedoIcon(props) {
    const [color, size] = $icon(props);
    return (_jsx("svg", { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', children: _jsx("path", { d: 'M11.7451 10.0986C12 10.0986 12.2021 10.0195 12.3604 9.85254L15.9639 6.22266C16.1572 6.0293 16.2451 5.81836 16.2451 5.57227C16.2451 5.33496 16.1484 5.10645 15.9639 4.93066L12.3604 1.26562C12.2021 1.08984 12 1.00195 11.7451 1.00195C11.2705 1.00195 10.8926 1.39746 10.8926 1.88086C10.8926 2.11816 10.9805 2.31152 11.1299 2.47852L13.2305 4.53516C12.8174 4.47363 12.3955 4.43848 11.9736 4.43848C7.62305 4.43848 4.14258 7.91895 4.14258 12.2783C4.14258 16.6377 7.64941 20.1445 12 20.1445C16.3594 20.1445 19.8574 16.6377 19.8574 12.2783C19.8574 11.751 19.4883 11.373 18.9609 11.373C18.4512 11.373 18.1084 11.751 18.1084 12.2783C18.1084 15.6709 15.3926 18.3955 12 18.3955C8.61621 18.3955 5.8916 15.6709 5.8916 12.2783C5.8916 8.85938 8.58984 6.15234 11.9736 6.15234C12.5449 6.15234 13.0723 6.19629 13.5381 6.27539L11.1387 8.64844C10.9805 8.80664 10.8926 9 10.8926 9.2373C10.8926 9.7207 11.2705 10.0986 11.7451 10.0986Z', fill: color }) }));
}