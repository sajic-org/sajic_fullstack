import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Home',
        href: '/',
    },
];

export default function Home() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Home" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Carousel className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 rounded-xl border md:min-h-min">
                    <CarouselContent>
                        <CarouselItem>...</CarouselItem>
                        <CarouselItem>...</CarouselItem>
                        <CarouselItem>...</CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>

                <div className="flex min-h-60 gap-6">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative w-full overflow-hidden rounded-xl border"></div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative w-1/2 overflow-hidden rounded-xl border duration-1000 hover:w-full"></div>
                </div>
            </div>
        </AppLayout>
    );
}
