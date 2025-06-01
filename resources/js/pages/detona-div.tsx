import TimelineContainer from '@/components/timeline-container';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, BadgePlus, MousePointerClick } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Detona-Div',
        href: '/',
    },
];

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

/*
 * ISSO É UMA PÁGINA SECRETA, UHHHHHHHHHHHHH
 * */
export default function Home() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="DETONA DIV" />

            {/* PRIMEIRO HERO */}
            <section className="min-h-screen bg-[url('/assets/hero_bg_plexus.webp')] bg-cover bg-right bg-no-repeat md:bg-contain">
                <div className="mx-auto px-4 max-sm:my-28 sm:mt-36 sm:px-6 md:max-w-7xl">
                    <div className="md:w-3/5 dark:text-white">
                        <h1 className="text-4xl font-semibold">Sajic 5ª Edição | outubro de 2025</h1>
                        <p className="mt-5 text-justify text-xl">
                            A Semana Acadêmica do UniSenac é um evento que oferece uma série de atividades acadêmicas, culturais e profissionais, voltadas
                            para o desenvolvimento de competências e a troca de conhecimentos entre alunos, professores e o público em geral. A
                            programação inclui palestras, oficinas, debates e workshops sobre temas diversos, como tecnologia, inovação, diversidade,
                            empreendedorismo, e tendências de mercado.
                        </p>

                        <Link
                            prefetch="mount"
                            href="/palestras"
                            className="bg-primary-blue mt-8 flex h-fit w-fit items-center gap-3 rounded-lg px-3 py-3.5 text-xl text-white shadow-lg drop-shadow-md max-[30rem]:mx-auto sm:px-9"
                        >
                            Veja nossas palestras
                            <MousePointerClick size={23} className="mt-px" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* SEGUNDO HERO */}

            <section className="bg-primary-blue text-white">
                <div className="mx-auto flex flex-col justify-center gap-6 px-4 py-16 sm:px-6 sm:py-30 md:max-w-7xl lg:flex-row lg:justify-between">
                    {/* image */}
                    <Link
                        href="/palestras"
                        className="group relative flex min-h-[350px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl duration-1000"
                    >
                        <div className="absolute inset-0 h-full items-center justify-center bg-[url('https://x0hwtz7p9i.ufs.sh/f/7fxSWKXR2MtulQvMhfmd3wy1JiKEVrMgQvehFx5mAP2kunUO')] bg-cover bg-center bg-no-repeat filter duration-1000 group-hover:blur-[1px] hover:brightness-90"></div>
                        <span className="absolute z-20 mb-3 text-xl font-semibold text-white opacity-0 duration-1000 group-hover:opacity-100">
                            {"<hr className='flex' />"}
                        </span>
                    </Link>

                    <div className="mt-3 w-fit space-y-2 text-right">
                        <h2 className="text-xl font-semibold">Palestras</h2>
                        <h3 className="text-4xl font-semibold">Veja o que esse ano oferece</h3>
                        <p className="mb-5 ml-auto w-4/5 text-xl">
                            Palestras, oficinas, debates e workshops sobre temas diversos, como tecnologia, design, inovação, diversidade,
                            empreendedorismo, e tendências de mercado.
                        </p>
                        <Link
                            prefetch
                            href="/palestras"
                            className="text-primary-blue mt-8 ml-auto flex h-fit w-fit items-center gap-3 rounded-lg bg-white px-9 py-3.5 text-xl shadow-lg drop-shadow-md"
                        >
                            Saiba Mais
                            <BadgePlus />
                        </Link>
                    </div>
                </div>
            </section>

            <PastEditions />

            <TimelineContainer timelineData={timeLineMockData} />
        </AppLayout>
    );
}

const timeLineMockData = [
    {
        day: '14/10',
        time: '08:00',
        name: 'Como virar coach em 7 dias e perder todos os amigos',
        speaker: 'Carlos Wizard',
    },
    {
        day: '14/10',
        time: '09:30',
        name: 'Teoria da conspiração aplicada: a Terra é plana mesmo?',
        speaker: 'Olavo de Carvalho (holograma)',
    },
    {
        day: '14/10',
        time: '11:00',
        name: 'Curso intensivo de dancinha no TikTok para CEOs',
        speaker: 'Luiza Trajano',
    },
    {
        day: '14/10',
        time: '13:00',
        name: 'Como vender geladinho gourmet no LinkedIn',
        speaker: 'Bel Pesce',
    },
    {
        day: '14/10',
        time: '14:30',
        name: 'Construindo startups que não entregam nada',
        speaker: 'Eike Batista',
    },
    {
        day: '14/10',
        time: '16:00',
        name: 'Design de slides que humilham seu time no stand-up diário',
        speaker: 'Nizan Guanaes',
    },
    {
        day: '14/10',
        time: '17:30',
        name: 'Como perder o emprego twittando às 3 da manhã',
        speaker: 'Monark',
    },
    {
        day: '14/10',
        time: '18:30',
        name: 'Como pedir aumento sem parecer emocionado',
        speaker: 'Ana Maria Braga',
    },
    {
        day: '14/10',
        time: '20:00',
        name: 'Workshop de indiretas passivo-agressivas via e-mail',
        speaker: 'Assinatura automática da firma',
    },
    {
        day: '14/10',
        time: '21:30',
        name: 'Live coding de planilha do Enem ao vivo',
        speaker: 'Datena',
    },
    {
        day: '15/10',
        time: '08:00',
        name: 'Oficina de como fazer pipa sem ser interceptado pelo 5G',
        speaker: 'Luis Inácio Lula da Silva',
    },
    {
        day: '15/10',
        time: '09:30',
        name: 'Como sobreviver no Brasil com um salário mínimo e fé',
        speaker: 'Padre Marcelo Rossi',
    },
    {
        day: '15/10',
        time: '11:00',
        name: 'Construindo inteligência artificial com jeitinho brasileiro',
        speaker: 'ChatGPT com sotaque carioca',
    },
    {
        day: '15/10',
        time: '13:00',
        name: 'Técnicas avançadas de enrolação em reuniões',
        speaker: 'Deputado Aleatório',
    },
    {
        day: '15/10',
        time: '14:30',
        name: 'Hackeando o sistema: como virar político sem saber nada',
        speaker: 'Tiririca',
    },
    {
        day: '15/10',
        time: '16:00',
        name: 'Como parecer produtivo no home office usando filtros do Zoom',
        speaker: 'Influencer Genérico',
    },
    {
        day: '15/10',
        time: '17:30',
        name: 'Influência das lives de Free Fire no mercado financeiro',
        speaker: 'Felipe Neto',
    },
    {
        day: '15/10',
        time: '18:30',
        name: 'Como fazer networking no grupo da família',
        speaker: 'Admin do Zap',
    },
    {
        day: '15/10',
        time: '20:00',
        name: 'A importância da feijoada na construção de MVPs',
        speaker: 'Alexandre Frota',
    },
    {
        day: '15/10',
        time: '21:30',
        name: 'Pitch de startup que resolve problemas que não existem',
        speaker: 'Ex-aluno da FGV',
    },
    {
        day: '16/10',
        time: '08:00',
        name: 'Vendendo curso de inglês sem saber conjugar verbos',
        speaker: 'Youtuber com 8 milhões de inscritos',
    },
    {
        day: '16/10',
        time: '09:30',
        name: 'Como criar seu próprio reality show na reunião de condomínio',
        speaker: 'Jojo Todynho',
    },
    {
        day: '16/10',
        time: '11:00',
        name: 'Construindo um foguete com sucata e esperança',
        speaker: 'Elon Musk versão BR',
    },
    {
        day: '16/10',
        time: '13:00',
        name: 'A arte de usar Excel como linguagem de programação',
        speaker: 'Seu Jorge do RH',
    },
    {
        day: '16/10',
        time: '14:30',
        name: 'Criptomoedas e pirâmides: onde está a linha tênue?',
        speaker: 'Coach de Prosperidade',
    },
    {
        day: '16/10',
        time: '16:00',
        name: 'Como evitar a fadiga de reuniões com microfone desligado',
        speaker: 'Pessoa Misteriosa do Teams',
    },
    {
        day: '16/10',
        time: '18:30',
        name: 'Como virar um nômade digital sem sair de Osasco',
        speaker: 'Whindersson Nunes',
    },
    {
        day: '16/10',
        time: '20:00',
        name: 'Construindo seu próprio banco usando PowerPoint',
        speaker: 'Luciano Huck',
    },
    {
        day: '16/10',
        time: '21:30',
        name: 'Meditando enquanto responde e-mails de trabalho',
        speaker: 'Monja Coen',
    },
    {
        day: '16/10',
        time: '23:00',
        name: 'After das palestras: mesa redonda sobre memes e política',
        speaker: 'Mesa redonda com Gregório Duvivier, Pablo Marçal e um estagiário',
    },
];
