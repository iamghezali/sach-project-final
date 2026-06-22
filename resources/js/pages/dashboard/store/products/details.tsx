import { Link, usePage } from '@inertiajs/react';
import { ChevronRightIcon, StoreIcon } from 'lucide-react';
import type { JSX } from 'react';
import AssignAttributes from '@/features/dashboard/store/products/components/details/assign-attributes';
import AssignCategories from '@/features/dashboard/store/products/components/details/assign-categories';
import CardContainer from '@/features/dashboard/store/products/components/details/card-container';
import ChangeProductStatus from '@/features/dashboard/store/products/components/details/change-product-status';
import ProductInformation from '@/features/dashboard/store/products/components/details/product-information';
import ProductVariants from '@/features/dashboard/store/products/components/details/product-variants';
import AppLayout from '@/layouts/app-layout';

export default function Details(): JSX.Element {
    const { id } = usePage<{ id: number }>().props;

    return (
        <>
            <div className="flex items-center gap-2">
                <Link href="/dashboard/store/products">
                    <StoreIcon />
                </Link>
                <ChevronRightIcon />
                <h1 className="text-2xl leading-10 font-medium">Add Product</h1>
            </div>

            <section className="mt-6">
                <div className="flex gap-4">
                    <div className="min-w-0 grow">
                        <div className="flex w-full min-w-0 flex-col gap-4">
                            <CardContainer>
                                <ProductInformation productID={id} />
                            </CardContainer>

                            <CardContainer>
                                <AssignAttributes productID={id} />
                                <ProductVariants productID={id} />
                            </CardContainer>
                        </div>
                    </div>

                    <div className="min-w-0 shrink-0 basis-110">
                        <div className="flex flex-col gap-4">
                            <CardContainer>
                                <ChangeProductStatus productID={id} />
                            </CardContainer>

                            <CardContainer>
                                <AssignCategories productID={id} />
                            </CardContainer>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

Details.layout = [AppLayout];
