import { Link } from '@inertiajs/react';
import { HomeIcon } from 'lucide-react';
import type { JSX } from 'react';
import { Button } from '@/components/ui/button';
import ShopLayout from '@/layouts/shop-layout';

interface Props {
    status: 404 | 500 | 503;
}

const messages: Record<Props['status'], { title: string; description: string }> = {
    404: {
        title: 'Error',
        description: 'Nothing is here!',
    },
    500: {
        title: 'Server Error',
        description: 'Something went wrong on our end. Please try again later.',
    },
    503: {
        title: 'Service Unavailable',
        description: 'We are under maintenance. Please check back soon.',
    },
};

export default function Error({ status }: Props): JSX.Element {
    const { title, description } = messages[status] ?? messages[500];

    return (
        <ShopLayout>
            <section className="flex min-h-[70vh] items-center justify-center">
                <div className="flex flex-col items-center gap-6">
                    {status === 404 && (
                        <svg
                            width="158"
                            height="158"
                            viewBox="0 0 158 158"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M19.75 52.6667V72.4167C19.75 74.1627 20.4436 75.8372 21.6782 77.0718C22.9128 78.3064 24.5873 79 26.3333 79H46.0833M46.0833 52.6667V105.333M111.917 52.6667V72.4167C111.917 74.1627 112.61 75.8372 113.845 77.0718C115.079 78.3064 116.754 79 118.5 79H138.25M138.25 52.6667V105.333M65.8333 65.8333V92.1667C65.8333 95.6587 67.2205 99.0077 69.6898 101.477C72.159 103.946 75.508 105.333 79 105.333C82.492 105.333 85.841 103.946 88.3102 101.477C90.7795 99.0077 92.1667 95.6587 92.1667 92.1667V65.8333C92.1667 62.3413 90.7795 58.9923 88.3102 56.5231C85.841 54.0539 82.492 52.6667 79 52.6667C75.508 52.6667 72.159 54.0539 69.6898 56.5231C67.2205 58.9923 65.8333 62.3413 65.8333 65.8333Z"
                                stroke="#475065"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    )}

                    <div className="text-center text-2xl font-medium text-brand-neutral-alt-700">
                        <h1>
                            {status} {title}
                        </h1>

                        <p>{description}</p>
                    </div>

                    <Button
                        variant="brand-primary"
                        size="brand-md"
                        className="min-w-74"
                        asChild
                    >
                        <Link
                            href={'/'}
                            replace
                        >
                            Go Home <HomeIcon strokeWidth={2} />
                        </Link>
                    </Button>
                </div>
            </section>
        </ShopLayout>
    );
}
