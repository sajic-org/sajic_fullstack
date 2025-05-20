'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';

interface PastEditionsItem {
    image: string;
    year: string;
}

const data: PastEditionsItem[] = [
    {
        image: '/assets/newton_i_guess.png',
        year: '1690',
    },
    {
        image: '/assets/school_of_athens.png',
        year: '380 AC',
    },
    {
        image: '/assets/oppenheimer.png',
        year: '1942',
    },
    {
        image: '/assets/marie_curie.png',
        year: '1910',
    },
    {
        image: '/assets/pliny_the_elder.jpg',
        year: '55',
    },
];

const PastEditions = () => {
    const [carouselApi, setCarouselApi] = useState<CarouselApi>();
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if (!carouselApi) {
            return;
        }
        const updateSelection = () => {
            setCanScrollPrev(carouselApi.canScrollPrev());
            setCanScrollNext(carouselApi.canScrollNext());
            setCurrentSlide(carouselApi.selectedScrollSnap());
        };
        updateSelection();
        carouselApi.on('select', updateSelection);
        return () => {
            carouselApi.off('select', updateSelection);
        };
    }, [carouselApi]);

    return (
        <section className="py-30">
            <div className="container mx-auto px-4 sm:px-6 md:max-w-7xl">
                <div className="mb-8 flex items-end justify-between md:mb-14 lg:mb-16">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-4xl font-semibold">Eventos Passados</h2>
                        <p className="text-muted-foreground max-w-lg text-xl">
                            A SAJIC é um evento que ocorre anualmente desde 2300 AC. Confira alguns registros de edições passadas:
                        </p>
                    </div>
                    <div className="hidden shrink-0 gap-2 md:flex">
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => {
                                carouselApi?.scrollPrev();
                            }}
                            disabled={!canScrollPrev}
                            className="disabled:pointer-events-auto"
                        >
                            <ArrowLeft className="size-5" />
                        </Button>
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => {
                                carouselApi?.scrollNext();
                            }}
                            disabled={!canScrollNext}
                            className="disabled:pointer-events-auto"
                        >
                            <ArrowRight className="size-5" />
                        </Button>
                    </div>
                </div>
            </div>
            <div className="w-full">
                <Carousel
                    setApi={setCarouselApi}
                    opts={{
                        loop: true,
                        breakpoints: {
                            '(max-width: 768px)': {
                                dragFree: true,
                            },
                        },
                    }}
                >
                    <CarouselContent className="ml-0 2xl:mr-[max(0rem,calc(50vw-700px))] 2xl:ml-[max(8rem,calc(50vw-700px))]">
                        {data.map((item, index) => (
                            <CarouselItem key={index} className="max-w-[320px] pl-[20px] lg:max-w-[360px]">
                                <div className="group rounded-xl">
                                    <div className="group relative h-full min-h-[27rem] max-w-full overflow-hidden rounded-xl md:aspect-[5/4] lg:aspect-[16/9]">
                                        <img
                                            src={item.image}
                                            className="absolute h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 h-full bg-[linear-gradient(transparent_20%,var(--primary)_100%)] mix-blend-multiply" />
                                        <div className="text-primary-foreground absolute inset-x-0 bottom-0 flex flex-col items-start p-6 md:p-8">
                                            <div className="flex items-center text-sm">
                                                <img src="/assets/logo_branco.png" alt="" className="w-21" />
                                                <span className="mt-4 ml-2 size-5 w-fit transition-transform group-hover:translate-x-1">
                                                    {' '}
                                                    {item.year}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>

                <div className="mt-8 flex justify-center gap-2">
                    {data.map((_, index) => (
                        <button
                            key={index}
                            className={`h-2 w-2 rounded-full transition-colors ${currentSlide === index ? 'bg-primary' : 'bg-primary/20'}`}
                            onClick={() => carouselApi?.scrollTo(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export { PastEditions };
