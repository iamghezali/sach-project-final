import { motion, useInView } from 'framer-motion';
import { useRef, useMemo, memo } from 'react';
import { cn } from '@/lib/utils';

const Word = memo(({ word }: { word: string }) => {
    const ref = useRef<HTMLSpanElement>(null);

    const isInView = useInView(ref, {
        margin: '-80px 0px -50% 0px',
        once: false,
        amount: 'some',
    });

    return (
        <>
            <motion.span
                ref={ref}
                className={cn(
                    'inline transition-all duration-1000 ease-in-out',
                    isInView ? 'opacity-100' : 'opacity-10',
                )}
            >
                {word}
            </motion.span>{' '}
        </>
    );
});

Word.displayName = 'Word';

type TextRevealProps = Omit<React.ComponentProps<'p'>, 'children'> & {
    children: string;
};

export default function TextReveal({ children, ...props }: TextRevealProps) {
    const words = useMemo(() => children.split(/\s+/), [children]);

    return (
        <p {...props}>
            {words.map((word, index) => (
                <Word
                    key={`${word}-${index}`}
                    word={word}
                />
            ))}
        </p>
    );
}
