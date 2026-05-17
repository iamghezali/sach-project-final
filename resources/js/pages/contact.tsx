import { AtSignIcon } from 'lucide-react';
import type { JSX } from 'react';
import CallToAction from '@/components/call-to-action';
import Image from '@/components/image';
import ContactForm from '@/features/shop/contact/contact-form';
import ShopLayout from '@/layouts/shop-layout';

export default function Contact(): JSX.Element {
    return (
        <ShopLayout>
            <section>
                <div className="mt-12 flex gap-7.5">
                    <div className="flex-1">
                        <div className="text-brand-neutral-1000">
                            <h1 className="text-[2rem]/tight font-bold">Get in Touch</h1>

                            <p className="mt-3 text-base/tight">
                                Have a question about an order, a custom request, or our services? Our team is here to
                                help and will get back to you as soon as possible.
                            </p>

                            <ul className="mt-3 flex gap-6">
                                <li>
                                    <span className="block text-base/tight font-medium">Customer Support</span>
                                    <span className="flex items-center gap-1 text-base/tight">
                                        <AtSignIcon
                                            className="size-4 text-brand-secondary-300"
                                            strokeWidth={3}
                                        />
                                        support@sash.com
                                    </span>
                                </li>

                                <li>
                                    <span className="block text-base/tight font-medium">Business & Partnerships</span>
                                    <span className="flex items-center gap-1 text-base/tight">
                                        <AtSignIcon
                                            className="size-4 text-brand-secondary-300"
                                            strokeWidth={3}
                                        />
                                        business@sash.com
                                    </span>
                                </li>
                            </ul>

                            <p className="mt-3">
                                <span className="block text-base/tight font-medium">Response Time Note</span>
                                <span className="block text-base/tight">
                                    We typically respond within 24 hours on business days.
                                </span>
                            </p>

                            <div className="mt-10">
                                <ContactForm />
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 border-black">
                        <div className="banner-gradient relative size-full overflow-hidden rounded-xl">
                            <Image
                                src={''}
                                className="absolute inset-0 size-full object-cover"
                            />

                            <div className="absolute inset-0 z-10 flex p-7">
                                <p className="mt-auto text-white">
                                    <span className="block text-base/tight">
                                        SACH was created to modernize the traditional tailoring experience and make
                                        custom craftsmanship accessible.
                                    </span>
                                    <span className="mt-1.5 block text-base/tight font-medium">Sach Team</span>
                                </p>
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
