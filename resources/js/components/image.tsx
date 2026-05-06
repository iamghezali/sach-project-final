import { useState } from 'react';
import type { JSX } from 'react';
import imageFallback from '@/assets/placeholder.svg';
import { cn } from '@/lib/utils';

export default function Image({
    src,
    alt,
    className,
    ...rest
}: React.ImgHTMLAttributes<HTMLImageElement>): JSX.Element {
    const [hasError, setHasError] = useState(false);

    const isFallback = !src || hasError;

    return (
        <img
            className={cn(className)}
            src={isFallback ? imageFallback : src}
            alt={isFallback ? 'Image unavailable' : (alt ?? '')}
            onError={() => setHasError(true)}
            {...rest}
        />
    );
}
