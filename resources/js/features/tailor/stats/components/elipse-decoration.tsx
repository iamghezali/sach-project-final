import type { JSX } from 'react';

export default function ElipseDecoration({ ...props }: React.ComponentProps<'svg'>): JSX.Element {
    return (
        <svg
            {...props}
            width="96"
            height="110"
            viewBox="0 0 96 110"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                cx="-30"
                cy="126"
                r="124.5"
                stroke="currentColor"
                strokeWidth="3"
            />
            <circle
                cx="-24.5"
                cy="125.5"
                r="98"
                stroke="currentColor"
                strokeWidth="3"
            />
            <circle
                cx="-27"
                cy="126"
                r="79.5"
                stroke="currentColor"
                strokeWidth="3"
            />
        </svg>
    );
}
