import { ChevronRightIcon, StoreIcon } from 'lucide-react';
import type { JSX } from 'react';
import UnderDevelopmentNotice from '@/components/under-development-notice';
import ProductCategory from '@/features/dashboard/store/product-new/components/product-category';
import ProductInformation from '@/features/dashboard/store/product-new/components/product-information';
import ProductPrice from '@/features/dashboard/store/product-new/components/product-price';
import ProductQuantity from '@/features/dashboard/store/product-new/components/product-quantity';
import ProductStatus from '@/features/dashboard/store/product-new/components/product-status';
import ProductVariants from '@/features/dashboard/store/product-new/components/product-variants';
import AppLayout from '@/layouts/app-layout';

export default function CreateProduct(): JSX.Element {
    return (
        <>
            <div className="flex items-center gap-2">
                <StoreIcon />
                <ChevronRightIcon />
                <h1 className="text-2xl leading-10 font-medium">Add Product</h1>
            </div>

            <section className="mt-6">
                <div className="flex gap-4">
                    <div className="min-w-0 grow">
                        <div className="flex flex-col gap-4">
                            <ProductInformation />
                            <ProductPrice />
                            <ProductQuantity />
                            <ProductVariants />
                        </div>
                    </div>

                    <div className="min-w-0 shrink-0 basis-110">
                        <div className="flex flex-col gap-4">
                            <ProductStatus />
                            <ProductCategory />
                        </div>
                    </div>
                </div>
            </section>

            <UnderDevelopmentNotice href="/dashboard/store/products" />
        </>
    );
}

CreateProduct.layout = [AppLayout];
