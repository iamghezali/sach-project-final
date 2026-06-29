import type { JSX } from 'react';

export default function AppFooter(): JSX.Element {
    return (
        <footer className="mt-auto">
            <p className="py-3 text-center text-xs leading-5.5 font-light text-brand-neutral-1000 sm:text-sm lg:pt-10 lg:pb-4.5 lg:text-base">
                © All rights reserved | Made with ❤️ by Craft Waves
            </p>
        </footer>
    );
}
