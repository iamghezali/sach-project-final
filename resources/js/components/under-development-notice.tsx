import { Link } from '@inertiajs/react';
import { AlertTriangleIcon } from 'lucide-react';
import type { JSX } from 'react';

export default function UnderDevelopmentNotice({ href }: { href?: string }): JSX.Element {
    return (
        <div className="my-4 flex items-center justify-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-5 py-3 text-amber-900">
            <AlertTriangleIcon className="size-5" />
            This page is still under development.
            {href && (
                <Link
                    href={href}
                    className="underline decoration-dotted underline-offset-2"
                >
                    See Working Version
                </Link>
            )}
        </div>
    );
}
