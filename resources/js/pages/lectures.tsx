import { Banner } from '@/components/banner';
import { LecturesGrid, LecturesGridItem } from '@/components/lectures-grid';
import LecturesGridHeading from '@/components/lectures-grid-heading';
import MapView from '@/components/Map';
import AppLayout from '@/layouts/app-layout';
import { isUserAlreadyEnrolledAtThatTime } from '@/lib/utils';
import { BreadcrumbItem } from '@/types';
import { Lecture, User } from '@/types/models';
import { Head } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Home',
        href: '/',
    },
    {
        title: 'Palestras',
        href: '/palestras',
    },
];

function Lectures({ lectures, user }: { lectures: Lecture[]; user?: User }) {
<<<<<<< HEAD
    const [query, setQuery] = useState('');
    const [filteredLectures, setFilteredSpeakers] = useState<Lecture[]>(lectures);

    useEffect(() => {
        const results = lectures.filter(
            (l: Lecture) => l.title.toLowerCase().includes(query.toLowerCase()) || l.speaker?.name.toLowerCase().includes(query.toLowerCase()),
        );
        setFilteredSpeakers(results);
    }, [query, lectures]);
=======
    console.log(user && isUserAlreadyEnrolledAtThatTime(user, user.lectures[0]));
>>>>>>> main

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head>
                <title>Palestras</title>
                <meta name="description" content="Palestrantes que irão participar da edição da Sajic desse ano" />

                <meta property="og:url" content="https://sajic.marce1in.com.br/palestras" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="SAJIC 2025 | Palestras" />
                <meta property="og:description" content="Palestrantes que irão participar da edição da Sajic desse ano" />
                <meta property="og:image" content="https://sajic.marce1in.com.br/favicon.ico" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:domain" content="sajic.marce1in.com.br" />
                <meta property="twitter:url" content="https://sajic.marce1in.com.br/palestras" />
                <meta name="twitter:title" content="SAJIC 2025 | Palestras" />
                <meta name="twitter:description" content="Palestrantes que irão participar da edição da Sajic desse ano" />
                <meta name="twitter:image" content="https://sajic.marce1in.com.br/favicon.ico" />
            </Head>

            <Banner
                description="caso, no momento da palestra, as salas ainda tenham espaço, os organizadores poderão permitir que você se inscreva e participe."
                linkText=""
                linkUrl=""
                title="Palestras Esgotadas:"
            />
            <div className="px-2">
                <div className="mx-auto mt-2 flex w-full items-center gap-3 rounded-lg border border-gray-300 bg-white px-3 py-1.5 shadow-sm md:w-2/5">
                    <Search color="gray" size={18} className="mb-0.5" />
                    <input
                        type="text"
                        placeholder="Busque por palestras ou palestrantes"
                        className="w-full outline-none"
                        onChange={(e) => {
                            setQuery(e.target.value);
                        }}
                    />
                </div>
            </div>

            <div className="mt-10 px-4 sm:px-6 md:max-w-7xl">
                <h2 className="text-primary-blue text-xl font-semibold">Palestras</h2>
                <h3 className="text-3xl font-semibold">Confira o que te aguarda no evento</h3>
            </div>

            <section className="xs:px-4 mx-auto w-full space-y-4 px-2 sm:px-6 md:max-w-7xl">
                {query ? (
                    <div className="ml-5">
                        <h4 className="mt-6 mb-1 text-2xl font-semibold">Tecnologia</h4>
                        <div className="h-0.5 w-4/5 bg-gray-300 sm:w-1/3" />
                    </div>
                ) : (
                    <LecturesGridHeading
                        title="Tecnologia"
                        description="Explore o mercado atual da tecnologia"
                        image="https://phoenixnap.com/glossary/wp-content/uploads/2022/07/what-is-a-data-center.jpg"
                        className={'bg-primary-blue mt-8 aspect-[3/2] text-white md:max-w-lg'}
                    />
                )}

                <LecturesGrid>
                    {filteredLectures
                        ?.filter((lecture) => lecture.type === 'Tecnologia')
                        .map((item, i) => <LecturesGridItem key={i} lecture={item} user={user} className="md:col-span-1" />)}
                    {filteredLectures?.filter((lecture) => lecture.type === 'Tecnologia').length === 0 && (
                        <div className="col-span-3 text-center text-gray-500">Nenhuma palestra encontrada para o termo pesquisado.</div>
                    )}
                </LecturesGrid>

                {query ? (
                    <div className="mr-5 flex flex-col items-end text-right">
                        <h4 className="mt-6 mb-1 text-2xl font-semibold">Gestão e Mercado</h4>
                        <div className="h-0.5 w-4/5 bg-gray-300 sm:w-1/3" />
                    </div>
                ) : (
                    <LecturesGridHeading
                        title="Gestão e Mercado"
                        image="https://www.ziprecruiter.com/svc/fotomat/public-ziprecruiter/cms/929029342ArchitecturalEngineer.jpg=ws1280x960"
                        description="Explore the birth of groundbreaking ideas and inventions."
                        className={'bg-primary-blue mt-8 ml-auto aspect-[3/2] text-white md:max-w-lg'}
                    />
                )}
                <LecturesGrid>
                    {filteredLectures
                        ?.filter((lecture) => lecture.type === 'Gestão e Mercado')
                        .map((item, i) => <LecturesGridItem key={i} lecture={item} user={user} className="md:col-span-1" />)}
                    {filteredLectures?.filter((lecture) => lecture.type === 'Gestão e Mercado').length === 0 && (
                        <div className="col-span-3 text-center text-gray-500">Nenhuma palestra encontrada para o termo pesquisado.</div>
                    )}
                </LecturesGrid>
            </section>
            <section className="flex flex-col gap-6 p-5">
                <div className="mt-12 text-center">
                    <h1 className="text-2xl font-bold text-black">Nosso Campus</h1>
                    <h2 className="text-gray-500">As palestras ocorrerão no nosso Centro Universitario UniSenac</h2>
                    <h2 className="text-gray-500">R. Gonçalves Chaves, 602</h2>
                </div>
                <MapView />
            </section>
        </AppLayout>
    );
}
export default Lectures;
