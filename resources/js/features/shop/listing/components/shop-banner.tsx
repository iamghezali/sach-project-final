import type { JSX } from 'react';
import shop_banner from '@/assets/banner-shop.png';
import Image from '@/components/image';

export default function ShopBanner(): JSX.Element {
    return (
        <div className="relative overflow-hidden rounded-3xl bg-neutral-100 pt-[29.92%]">
            <Image
                src={shop_banner}
                className="absolute inset-0 size-full object-cover"
            />

            {/* forground layer */}
            <div className="absolute inset-0 z-20">
                <div className="flex h-full items-center px-10">
                    <div>
                        <span className="text-2xl font-medium text-brand-neutral-alt-800">Browse our Collections</span>
                        <h2 className="mt-2 text-[3.625rem] leading-17 font-semibold text-black">
                            Ready-to-Wear, <br />
                            Made to Feel Right
                        </h2>
                        <p className="mt-2 max-w-lg text-xl text-brand-neutral-alt-800">
                            Discover carefully crafted pieces in standard sizes — designed for comfort, quality, and
                            everyday elegance.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
