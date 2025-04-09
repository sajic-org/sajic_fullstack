import TimelineContainer from '@/components/timeline-container';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { MousePointerClick } from 'lucide-react';

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

            <section className="h-screen w-screen bg-[url('/imgs/homepage_hero_light.png')] bg-cover bg-center bg-no-repeat dark:bg-[url('/imgs/homepage_hero_dark-3.png')]">
                <div className="mx-auto mt-36 px-4 md:max-w-7xl">
                    <div className="md:w-2/3 dark:text-white">
                        <h1 className="text-3xl font-semibold">Sajic 5ª Edição | outubro de 2025</h1>
                        <p className="mt-5 text-justify text-[22px]">
                            A Semana Acadêmica do UniSenac é um evento que oferece uma série de atividades acadêmicas, culturais e profissionais,
                            voltadas para o desenvolvimento de competências e a troca de conhecimentos entre alunos, professores e o público em geral.
                            A programação inclui palestras, oficinas, debates e workshops sobre temas diversos, como tecnologia, inovação,
                            diversidade, empreendedorismo, e tendências de mercado.
                        </p>

                        <Link
                            prefetch="mount"
                            href="/palestras"
                            className="bg-primary-blue/90 hover:bg-primary-blue mt-8 flex h-fit w-fit items-center gap-3 rounded-lg px-9 py-3.5 text-xl font-medium text-white shadow-lg drop-shadow-md"
                        >
                            Veja nossas palestras
                            <MousePointerClick size={23} className="mt-px" />
                        </Link>
                    </div>
                </div>
            </section>

            <section className="mx-auto flex justify-between gap-12 px-4 py-8 md:max-w-7xl">
                <div className="mt-3 space-y-1">
                    <h2 className="text-primary-blue/90 text-xl font-semibold">Palestrantes</h2>
                    <h3 className="text-3xl font-semibold">Conheça os profissionais</h3>
                    <p className="mb-5 w-4/5 text-lg">
                        que oferecerão palestras, oficinas, debates e workshops sobre temas diversos, como tecnologia, inovação, diversidade,
                        empreendedorismo, e tendências de mercado.
                    </p>
                    <Link href="/palestrantes">
                        <Button className="px-12">Saiba mais</Button>
                    </Link>
                </div>

                {/* image */}
                <Link
                    href="/palestrantes"
                    className="group relative flex min-h-[300px] w-4/5 cursor-pointer items-center justify-center overflow-hidden rounded-xl shadow-lg duration-1000 hover:w-full"
                >
                    <div className="absolute inset-0 h-full w-full items-center justify-center border bg-[url('/imgs/palestrante_thumb.png')] bg-cover bg-center bg-no-repeat filter duration-1000 group-hover:blur-[2px] hover:brightness-75"></div>
                    <span className="absolute z-20 mb-3 text-xl font-semibold text-white opacity-30 duration-1000 group-hover:opacity-100">
                        Palestrantes
                    </span>
                </Link>
            </section>

            <TimelineContainer />
        </AppLayout>
    );
}
