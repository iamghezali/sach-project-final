import * as React from 'react';
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
    opts?: CarouselOptions;
    plugins?: CarouselPlugin;
    orientation?: 'horizontal' | 'vertical';
    setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
    carouselRef: ReturnType<typeof useEmblaCarousel>[0];
    api: ReturnType<typeof useEmblaCarousel>[1];
    scrollPrev: () => void;
    scrollNext: () => void;
    canScrollPrev: boolean;
    canScrollNext: boolean;

    goTo: (index: number) => void;
    scrollSnaps: number[];
    selectedSnap: number;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
    const context = React.useContext(CarouselContext);

    if (!context) {
        throw new Error('useCarousel must be used within a <Carousel />');
    }

    return context;
}

function Carousel({
    orientation = 'horizontal',
    opts,
    setApi,
    plugins,
    className,
    children,
    ...props
}: React.ComponentProps<'div'> & CarouselProps) {
    const [carouselRef, api] = useEmblaCarousel(
        {
            ...opts,
            axis: orientation === 'horizontal' ? 'x' : 'y',
        },
        plugins,
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);
    const [selectedSnap, setSelectedSnap] = React.useState(0);

    const onSelect = React.useCallback((api: CarouselApi) => {
        if (!api) return;
        setCanScrollPrev(api.canScrollPrev());
        setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => {
        api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
        api?.scrollNext();
    }, [api]);

    const goTo = React.useCallback(
        (index: number) => {
            api?.scrollTo(index);
        },
        [api],
    );

    const setupSnaps = React.useCallback((api: CarouselApi) => {
        setScrollSnaps(api?.scrollSnapList() ?? []);
    }, []);

    const setActiveSnap = React.useCallback((api: CarouselApi) => {
        setSelectedSnap(api?.selectedScrollSnap() ?? 0);
    }, []);

    const handleKeyDown = React.useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
            if (event.key === 'ArrowLeft') {
                event.preventDefault();
                scrollPrev();
            } else if (event.key === 'ArrowRight') {
                event.preventDefault();
                scrollNext();
            }
        },
        [scrollPrev, scrollNext],
    );

    React.useEffect(() => {
        if (!api || !setApi) return;
        setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
        if (!api) return;
        onSelect(api);
        setupSnaps(api);
        setActiveSnap(api);

        api.on('reInit', onSelect);
        api.on('select', onSelect);
        api.on('reInit', setupSnaps);
        api.on('reInit', setActiveSnap);
        api.on('select', setActiveSnap);

        return () => {
            api.off('reInit', onSelect);
            api.off('select', onSelect);
            api.off('reInit', setupSnaps);
            api.off('reInit', setActiveSnap);
            api.off('select', setActiveSnap);
        };
    }, [api, onSelect, setupSnaps, setActiveSnap]);

    return (
        <CarouselContext.Provider
            value={{
                carouselRef,
                api: api,
                opts,
                orientation: orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
                scrollPrev,
                scrollNext,
                canScrollPrev,
                canScrollNext,

                goTo,
                scrollSnaps,
                selectedSnap,
            }}
        >
            <div
                onKeyDownCapture={handleKeyDown}
                className={cn('relative', className)}
                role="region"
                aria-roledescription="carousel"
                data-slot="carousel"
                {...props}
            >
                {children}
            </div>
        </CarouselContext.Provider>
    );
}

function CarouselViewport({ className, ...props }: React.ComponentProps<'div'>) {
    const { carouselRef } = useCarousel();

    return (
        <div
            ref={carouselRef}
            className={cn('overflow-hidden', className)}
            data-slot="carousel-viewport"
            {...props}
        />
    );
}

function CarouselContent({ className, ...props }: React.ComponentProps<'div'>) {
    const { orientation } = useCarousel();

    return (
        <div
            className={cn('flex', orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col', className)}
            data-slot="carousel-content"
            {...props}
        />
    );
}

function CarouselItem({ className, ...props }: React.ComponentProps<'div'>) {
    const { orientation } = useCarousel();

    return (
        <div
            role="group"
            aria-roledescription="slide"
            data-slot="carousel-item"
            className={cn(
                'min-w-0 shrink-0 grow-0 basis-full',
                orientation === 'horizontal' ? 'pl-4' : 'pt-4',
                className,
            )}
            {...props}
        />
    );
}

function CarouselPrevious({
    className,
    variant = 'outline',
    size = 'icon-sm',
    ...props
}: React.ComponentProps<typeof Button>) {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();

    return (
        <Button
            data-slot="carousel-previous"
            variant={variant}
            size={size}
            className={cn('touch-manipulation', orientation === 'horizontal' ? '' : 'rotate-90', className)}
            disabled={!canScrollPrev}
            onClick={scrollPrev}
            {...props}
        >
            <ChevronLeftIcon />
            <span className="sr-only">Previous slide</span>
        </Button>
    );
}

function CarouselNext({
    className,
    variant = 'outline',
    size = 'icon-sm',
    ...props
}: React.ComponentProps<typeof Button>) {
    const { orientation, scrollNext, canScrollNext } = useCarousel();

    return (
        <Button
            data-slot="carousel-next"
            variant={variant}
            size={size}
            className={cn('touch-manipulation', orientation === 'horizontal' ? '' : '', className)}
            disabled={!canScrollNext}
            onClick={scrollNext}
            {...props}
        >
            <ChevronRightIcon />
            <span className="sr-only">Next slide</span>
        </Button>
    );
}

function CarouselDots({ className, ...props }: React.ComponentProps<'div'>) {
    const { scrollSnaps, selectedSnap, goTo } = useCarousel();

    return (
        <div
            className={cn('flex justify-center gap-1', className)}
            data-slot="carousel-dots"
            {...props}
        >
            {scrollSnaps.map((_, index) => (
                <button
                    key={index}
                    onClick={() => goTo(index)}
                    className={cn(
                        'h-1.5 w-10 cursor-pointer rounded-md transition-colors',
                        selectedSnap === index ? 'bg-brand-secondary-300' : 'bg-brand-neutral-400',
                    )}
                    aria-label={`Go to slide ${index + 1}`}
                />
            ))}
        </div>
    );
}

export {
    type CarouselApi,
    useCarousel,
    Carousel,
    CarouselViewport,
    CarouselContent,
    CarouselItem,
    CarouselDots,
    CarouselPrevious,
    CarouselNext,
};
