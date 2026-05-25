import { Link } from '@inertiajs/react';
import type { JSX } from 'react';
import banner_1 from '@/assets/banner-1.png';
import banner_2 from '@/assets/banner-2.png';
import banner_3 from '@/assets/banner-3.png';
import banner_4 from '@/assets/banner-4.png';
import Image from '@/components/image';

export default function Banners(): JSX.Element {
    return (
        <div className="mx-auto max-w-239.5">
            <div className="flex w-full flex-col gap-4">
                <div className="flex w-full basis-full gap-4">
                    <div className="w-full shrink-0 basis-40/100">
                        <div className="size-full">
                            {/* Banner 1 */}
                            <div className="size-full rounded-2xl bg-brand-shade-white p-2">
                                <div className="banner-gradient relative size-full overflow-hidden rounded-xl bg-neutral-100">
                                    <Image
                                        src={banner_1}
                                        className="absolute inset-0 size-full object-cover"
                                    />
                                    {/* forground layer */}
                                    <div className="absolute inset-0 z-20">
                                        <div className="flex h-full flex-col px-4 py-5">
                                            <h3 className="text-[1.625rem]/tight font-semibold text-pretty text-brand-shade-white">
                                                Effortless Style, Ready to{' '}
                                                <span className="text-brand-secondary-200">Wear.</span>
                                            </h3>

                                            <div className="mt-auto ml-auto">
                                                <Link
                                                    className="rounded-lg bg-brand-secondary-300 px-3 py-2 text-xs text-white"
                                                    href={'/shop/'}
                                                >
                                                    Shop Now
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex w-full grow basis-60/100 flex-col gap-4">
                        <div className="w-full">
                            {/* Banner 2 */}
                            <div className="rounded-2xl bg-brand-shade-white p-2">
                                <div className="banner-gradient relative overflow-hidden rounded-xl bg-neutral-100 pt-[55.67%]">
                                    <Image
                                        src={banner_2}
                                        className="absolute inset-0 size-full object-cover"
                                    />

                                    {/* forground layer */}
                                    <div className="absolute inset-0 z-20">
                                        <div className="flex h-full flex-col px-7.5 py-7">
                                            <h3 className="text-3xl font-bold text-pretty text-brand-neutral-1000">
                                                Made to Match your
                                                <br />
                                                <span className="text-brand-primary-200">Vision</span>
                                            </h3>

                                            <p className="mt-2.5 max-w-78.25 text-brand-neutral-1000">
                                                Share your idea, choose your preferences, and let us create a piece
                                                designed especially for you.
                                            </p>

                                            <div className="mt-2.5">
                                                <Link
                                                    className="rounded-lg bg-brand-primary-200 px-3 py-2 text-xs text-white"
                                                    href={'/shop/custom-order'}
                                                >
                                                    Order Now
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full">
                            {/* Banner 3 */}
                            <div className="rounded-2xl bg-brand-shade-white p-2">
                                <div className="banner-gradient relative overflow-hidden rounded-xl bg-neutral-100 pt-[55.67%]">
                                    <Image
                                        src={banner_3}
                                        className="absolute inset-0 size-full object-cover"
                                    />

                                    {/* forground layer */}
                                    <div className="absolute inset-0 z-20">
                                        <div className="flex h-full flex-col p-4">
                                            <h3 className="text-neutral-1000 mx-auto w-78 text-center text-[1.625rem] leading-7.5 font-bold text-pretty">
                                                <span className="text-brand-secondary-500">Professional</span> Looks,
                                                Delivered at scale
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    {/* Banner 4 */}
                    <div className="rounded-2xl bg-brand-shade-white p-2">
                        <div className="banner-gradient relative overflow-hidden rounded-xl bg-neutral-100 pt-[31.72%]">
                            <Image
                                src={banner_4}
                                className="absolute inset-0 size-full object-cover"
                            />

                            {/* forground layer */}
                            <div className="absolute inset-0 z-20">
                                <div className="flex h-full flex-col items-center px-4 py-4">
                                    <h3 className="text-neutral-1000 w-77 text-center text-3xl font-bold text-pretty">
                                        Design Comfort, Redefine Your{' '}
                                        <span className="text-brand-tertiary-300">Space</span>
                                    </h3>

                                    <div className="mt-2">
                                        <Link
                                            className="rounded-lg bg-brand-tertiary-300 px-3 py-2 text-xs text-white"
                                            href={'/shop/custom-order'}
                                        >
                                            Create Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
