import { BanknoteIcon, LineSquiggleIcon, MessagesSquareIcon, PackageIcon, StarIcon, TruckIcon } from 'lucide-react';
import type { JSX } from 'react';
import about_grid_1 from '@/assets/about_grid_1.png';
import about_grid_2 from '@/assets/about_grid_2.png';
import about_grid_3 from '@/assets/about_grid_3.png';
import about_grid_4 from '@/assets/about_grid_4.png';
import about_grid_main from '@/assets/about_grid_main.png';
import about_main from '@/assets/about_main.png';
import CallToAction from '@/components/call-to-action';
import Image from '@/components/image';
import ShopLayout from '@/layouts/shop-layout';

export default function About(): JSX.Element {
    return (
        <ShopLayout>
            <section>
                <div className="mt-12 flex gap-16">
                    <div className="flex-1">
                        <div className="text-brand-neutral-1000">
                            <h1 className="text-[2.375rem] font-bold">Our Story</h1>

                            <p className="mt-4.5 text-[1.625rem] leading-[140%] text-pretty">
                                <span>
                                    SASH was created to modernize the traditional tailoring experience and make custom
                                    craftsmanship accessible through a simple digital process. We saw how difficult it
                                    was for people to communicate their ideas, compare options, and manage orders with
                                    traditional methods.
                                </span>

                                <br />
                                <br />

                                <span>
                                    Our goal was to build a platform that connects creativity, precision, and
                                    convenience — giving customers a seamless way to bring their ideas to life while
                                    empowering workshops with a smarter workflow.
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="basis-145.75 border-black">
                        <div className="relative overflow-hidden rounded-xl pt-[74.95%]">
                            <Image
                                src={about_main}
                                className="absolute inset-0 size-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="mt-20">
                    <ul className="flex gap-10.5">
                        <li className="flex-1">
                            <div className="flex flex-col items-center justify-center">
                                <PackageIcon className="size-20 rounded-2xl bg-white p-5.5 text-brand-primary-300" />

                                <p className="mt-6">
                                    <span className="block text-center text-lg font-semibold">Smart Custom Orders</span>
                                    <span className="mt-3 block text-center text-lg">
                                        Submit your design ideas and let our team handle the process from review to
                                        delivery.
                                    </span>
                                </p>
                            </div>
                        </li>

                        <li className="flex-1">
                            <div className="flex flex-col items-center justify-center">
                                <TruckIcon className="size-20 rounded-2xl bg-white p-5.5 text-brand-primary-300" />

                                <p className="mt-6">
                                    <span className="block text-center text-lg font-semibold">
                                        Transparent Tracking
                                    </span>
                                    <span className="mt-3 block text-center text-lg">
                                        Follow every stage of your order from confirmation to completion.
                                    </span>
                                </p>
                            </div>
                        </li>

                        <li className="flex-1">
                            <div className="flex flex-col items-center justify-center">
                                <StarIcon className="size-20 rounded-2xl bg-white p-5.5 text-brand-primary-300" />

                                <p className="mt-6">
                                    <span className="block text-center text-lg font-semibold">Quality Assurance</span>
                                    <span className="mt-3 block text-center text-lg">
                                        Each order is reviewed before delivery to ensure it meets our standards.
                                    </span>
                                </p>
                            </div>
                        </li>
                    </ul>

                    <ul className="mt-12 flex gap-10.5">
                        <li className="flex-1">
                            <div className="flex flex-col items-center justify-center">
                                <BanknoteIcon className="size-20 rounded-2xl bg-white p-5.5 text-brand-primary-300" />

                                <p className="mt-6">
                                    <span className="block text-center text-lg font-semibold">Flexible Payments</span>
                                    <span className="mt-3 block text-center text-lg">
                                        Pay online, partially in advance, or upon delivery depending on your order.
                                    </span>
                                </p>
                            </div>
                        </li>

                        <li className="flex-1">
                            <div className="flex flex-col items-center justify-center">
                                <LineSquiggleIcon className="size-20 rounded-2xl bg-white p-5.5 text-brand-primary-300" />

                                <p className="mt-6">
                                    <span className="block text-center text-lg font-semibold">Verified Workshops</span>
                                    <span className="mt-3 block text-center text-lg">
                                        We work with trusted tailoring professionals selected for quality and
                                        reliability.
                                    </span>
                                </p>
                            </div>
                        </li>

                        <li className="flex-1">
                            <div className="flex flex-col items-center justify-center">
                                <MessagesSquareIcon className="size-20 rounded-2xl bg-white p-5.5 text-brand-primary-300" />

                                <p className="mt-6">
                                    <span className="block text-center text-lg font-semibold">
                                        Centralized Management
                                    </span>
                                    <span className="mt-3 block text-center text-lg">
                                        All communication, pricing, and production are handled through one streamlined
                                        system.
                                    </span>
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>

            <section>
                <div className="mt-20">
                    <div className="text-brand-neutral-1000">
                        <h2 className="text-[2.375rem] font-bold">Designed Around You</h2>

                        <p className="mt-4.5 text-[1.625rem] leading-[140%] text-pretty">
                            Every feature on SASH is built to simplify your experience — from submitting ideas to
                            receiving your order. Our platform is designed to remove complexity and replace it with
                            clarity, control, and confidence.
                        </p>
                    </div>

                    <div className="mt-8 flex gap-8">
                        <div className="flex-1">
                            <div className="relative size-full overflow-hidden rounded-xl bg-neutral-300">
                                <Image
                                    src={about_grid_main}
                                    className="absolute inset-0 size-full object-cover"
                                />
                            </div>
                        </div>
                        <div className="grid basis-149 grid-cols-2 gap-3">
                            <div className="relative overflow-hidden rounded-xl bg-neutral-300 pt-[100%]">
                                <Image
                                    src={about_grid_1}
                                    className="absolute inset-0 size-full object-cover"
                                />
                            </div>
                            <div className="overflow-hiddenbg-neutral-300 relative rounded-xl pt-[100%]">
                                <Image
                                    src={about_grid_2}
                                    className="absolute inset-0 size-full object-cover"
                                />
                            </div>
                            <div className="relative overflow-hidden rounded-xl bg-neutral-300 pt-[100%]">
                                <Image
                                    src={about_grid_3}
                                    className="absolute inset-0 size-full object-cover"
                                />
                            </div>
                            <div className="relative overflow-hidden rounded-xl bg-neutral-300 pt-[100%]">
                                <Image
                                    src={about_grid_4}
                                    className="absolute inset-0 size-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="mt-20">
                    <CallToAction />
                </div>
            </section>
        </ShopLayout>
    );
}
