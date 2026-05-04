import { Link } from '@inertiajs/react';
import type { JSX } from 'react';

import logoPrimary from '@/assets/logo-primary.svg';
import logoWhiteBig from '@/assets/logo-white-big.svg';
import { categoriesLinks, companyLinks } from '@/layouts/shop-layout/footer/footer-links';
import NewsletterForm from '@/layouts/shop-layout/footer/newsletter-form';
import { FacebookIcon, InstagramIcon, PinterestIcon, TiktokIcon } from '@/layouts/shop-layout/footer/socialMediaIcons';

export default function ShopFooter(): JSX.Element {
    return (
        <footer className="mt-20 text-white">
            <div className="overflow-hidden rounded-xl bg-brand-secondary-300 lg:rounded-[3rem]">
                <div className="flex flex-col items-center px-3 pt-4 pb-2.5 lg:flex-row lg:items-end lg:justify-between lg:px-15 lg:pt-13.25 lg:pb-10">
                    <div className="order-2 lg:order-1">
                        <div>
                            <h6 className="text-center text-[1.375rem] leading-8.25 font-bold text-pretty uppercase lg:text-left lg:text-5xl lg:leading-14 lg:font-semibold">
                                Join our community <br /> & get 5% off
                            </h6>

                            <span className="mt-4 block text-center leading-6 lg:text-left lg:text-xl">
                                Sign up for free! Join the community.
                            </span>
                        </div>

                        <div className="mt-8">
                            <NewsletterForm />
                        </div>
                    </div>

                    <img
                        className="no-drag order-1 mx-auto max-w-40 shrink-0 select-none lg:order-2 lg:mx-0 lg:max-w-full lg:basis-55"
                        src={logoPrimary}
                        alt="Sach Primary Logo"
                    />
                </div>

                <div className="rounded-xl bg-brand-neutral-1000 lg:rounded-[3rem]">
                    <div className="px-4 pt-6 pb-2 lg:px-6 lg:pt-10 lg:pb-1">
                        <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
                            <div className="flex flex-col items-center text-center lg:basis-5/12 lg:items-start lg:text-left">
                                <h3 className="text-4xl font-semibold text-brand-primary-200">About us</h3>
                                <p className="mt-4 max-w-md text-xl">
                                    SACH offers a smarter way to create custom clothing and living room salons without
                                    the hassle.
                                </p>
                            </div>

                            <div className="text-center lg:basis-2/12 lg:text-left">
                                <h3 className="text-2xl font-semibold text-brand-primary-200">Categories</h3>

                                <ul className="mt-4 flex flex-col gap-2 text-xl">
                                    {categoriesLinks.map((category, i) => (
                                        <li key={`category-link-${i}`}>
                                            <Link href={category.url}>{category.label}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="text-center lg:basis-3/12 lg:text-left">
                                <h3 className="text-2xl font-semibold text-brand-primary-200">Company</h3>

                                <ul className="mt-4 flex flex-col gap-2 text-xl">
                                    {companyLinks.map((company, i) => (
                                        <li key={`company-link-${i}`}>
                                            <Link href={company.url}>{company.label}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="lg:basis-2/12">
                                <h3 className="text-center text-2xl font-semibold text-brand-primary-200 lg:text-left">
                                    Follow us
                                </h3>

                                <ul className="mt-4 flex w-full justify-center gap-6 lg:justify-start">
                                    <li>
                                        <a
                                            href="https://www.facebook.com"
                                            target="_blank"
                                        >
                                            <FacebookIcon />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://www.instagram.com"
                                            target="_blank"
                                        >
                                            <InstagramIcon />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://www.pinterest.com"
                                            target="_blank"
                                        >
                                            <PinterestIcon />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://www.tiktok.com"
                                            target="_blank"
                                        >
                                            <TiktokIcon />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <img
                            className="no-drag mx-auto w-full max-w-247 select-none lg:-mt-20"
                            src={logoWhiteBig}
                            alt="Sach Horizantal Logo Big Variant"
                        />
                    </div>
                </div>
            </div>

            <div>
                <p className="py-3 text-center text-xs leading-5.5 font-light text-brand-neutral-1000 sm:text-sm lg:pt-10 lg:pb-4.5 lg:text-base">
                    © All rights reserved | Made with ❤️ by Craft Waves
                </p>
            </div>
        </footer>
    );
}
