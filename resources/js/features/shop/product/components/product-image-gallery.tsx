import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/counter.css';

import type { JSX } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import { default as ImageComponent } from '@/components/image';
import type { UseLightboxReturn } from '@/features/shop/product/hooks/use-lightbox';
import type { Image } from '@/features/shop/product/schema';

interface ProductImageGalleryProps {
    images: Image[];
    lightbox: UseLightboxReturn;
}

export function ProductImageGallery({ images, lightbox }: ProductImageGalleryProps): JSX.Element {
    const slides = images.map((img) => ({ src: img.url }));
    const [mainImage, ...thumbnails] = images;

    return (
        <>
            <div className="flex items-start gap-8">
                {thumbnails.length > 0 && (
                    <div className="flex max-h-150 shrink-0 basis-[21%] flex-col gap-3 overflow-hidden">
                        {thumbnails.map((image, i) => (
                            <div
                                key={image.uuid}
                                className="relative cursor-pointer overflow-hidden rounded-lg pt-[120%]"
                                onClick={() => lightbox.openAt(i + 1)}
                            >
                                <ImageComponent
                                    src={image.url}
                                    className="absolute inset-0 size-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                )}

                {mainImage && (
                    <div
                        className="relative min-w-0 grow cursor-pointer overflow-hidden rounded-[1.75rem]"
                        onClick={() => lightbox.openAt(0)}
                    >
                        <div className="relative pt-[140%]">
                            <ImageComponent
                                src={mainImage.url}
                                className="absolute inset-0 size-full object-cover"
                            />
                        </div>
                    </div>
                )}
            </div>

            <Lightbox
                open={lightbox.open}
                index={lightbox.index}
                close={lightbox.close}
                carousel={{ finite: true }}
                controller={{ closeOnPullUp: true, closeOnBackdropClick: true }}
                plugins={[Counter, Zoom]}
                zoom={{ zoomInMultiplier: 2 }}
                slides={slides}
            />
        </>
    );
}
