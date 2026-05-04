import { useState } from 'react';
import type { JSX } from 'react';
import imageFallback from '@/assets/placeholder.svg';
import { cn } from '@/lib/utils';

interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
    src: string | null | undefined;
    fallbackClassName?: string;
}

function ImageFallback(): JSX.Element {
    return (
        <img
            src={imageFallback}
            alt="Image unavailable"
        />
    );
}

export default function Image({ src, alt, className, ...rest }: ImageProps): JSX.Element {
    const [hasError, setHasError] = useState(false);

    if (!src || hasError) {
        return <ImageFallback />;
    }

    return (
        <img
            src={src}
            alt={alt ?? ''}
            className={cn(className)}
            onError={() => setHasError(true)}
            {...rest}
        />
    );
}
