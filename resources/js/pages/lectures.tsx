import { Banner } from '@/components/banner';
import { LecturesGrid, LecturesGridItem } from '@/components/lectures-grid';
import MapView from '@/components/Map';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Lecture, LectureType, User } from '@/types/models';
import { Head } from '@inertiajs/react';
import { LatLngTuple } from 'leaflet';
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
    console.log(lectures);

    const LOCATIONS = {
        tech: {
            center: [-31.772016, -52.340731] as LatLngTuple, 
            label: 'Predio tech',
            address: 'R. Félix Xavier da Cunha, 520',
            zoom: 19,
        },
        antigo: {
            center: [-31.770102803945708, -52.33884128983381] as LatLngTuple, 
            label: 'Predio antigo',
            address: 'R. Gonçalves Chaves, 602',
            zoom: 19, 
        },
    };

    const [activeLocationKey, setActiveLocationKey] = useState<'tech' | 'antigo'>(
        'tech'
    );

    const activeLocation = LOCATIONS[activeLocationKey];

    const [query, setQuery] = useState('');
    const [filteredLectures, setFilteredLectures] =
        useState<Lecture[]>(lectures);

    useEffect(() => {
        const results = lectures.filter(
            (l: Lecture) =>
                l.title.toLowerCase().includes(query.toLowerCase()) ||
                l.speaker?.name.toLowerCase().includes(query.toLowerCase()),
        );
        setFilteredLectures(results);
    }, [query, lectures]);

    // Group lectures by type
    const groupedLectures: Record<
        number,
        { type: LectureType; lectures: Lecture[] }
    > = {};

    filteredLectures.forEach((lecture) => {
        if (!lecture.type) return;

        if (!groupedLectures[lecture.type.id]) {
            groupedLectures[lecture.type.id] = {
                type: lecture.type,
                lectures: [],
            };
        }
        groupedLectures[lecture.type.id].lectures.push(lecture);
    });

    const lectureGroups = Object.values(groupedLectures);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head>
                <title>Palestras</title>
                <meta
                    name="description"
                    content="Palestrantes que irão participar da edição da Sajic desse ano"
                />

                <meta
                    property="og:url"
                    content="https://sajic.marce1in.com.br/palestras"
                />
                <meta
                    property="og:type"
                    content="website"
                />
                <meta
                    property="og:title"
                    content="SAJIC 2025 | Palestras"
                />
                <meta
                    property="og:description"
                    content="Palestrantes que irão participar da edição da Sajic desse ano"
                />
                <meta
                    property="og:image"
                    content="https://sajic.marce1in.com.br/favicon.ico"
                />

                <meta
                    name="twitter:card"
                    content="summary_large_image"
                />
                <meta
                    property="twitter:domain"
                    content="sajic.marce1in.com.br"
                />
                <meta
                    property="twitter:url"
                    content="https://sajic.marce1in.com.br/palestras"
                />
                <meta
                    name="twitter:title"
                    content="SAJIC 2025 | Palestras"
                />
                <meta
                    name="twitter:description"
                    content="Palestrantes que irão participar da edição da Sajic desse ano"
                />
                <meta
                    name="twitter:image"
                    content="https://sajic.marce1in.com.br/favicon.ico"
                />
            </Head>

            <Banner
                description="caso, no momento da palestra, as salas ainda tenham espaço, os organizadores poderão permitir que você se inscreva e participe."
                linkText=""
                linkUrl=""
                title="Palestras Esgotadas:"
            />
            <div className="px-2">
                <div className="mx-auto mt-2 flex w-full items-center gap-3 rounded-lg border border-gray-300 bg-white px-3 py-1.5 shadow-sm md:w-2/5">
                    <Search
                        color="gray"
                        size={18}
                        className="mb-0.5"
                    />
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
                <h2 className="text-primary-blue text-xl font-semibold">
                    Palestras
                </h2>
                <h3 className="text-3xl font-semibold">
                    Confira o que te aguarda no evento
                </h3>
            </div>

            <section className="xs:px-4 mx-auto w-full space-y-4 px-2 sm:px-6 md:max-w-7xl">
                {lectureGroups.map((group, index) => (
                    <div key={group.type.id}>
                        <div
                            className={
                                index % 2 === 0
                                    ? 'ml-5'
                                    : 'mr-5 flex flex-col items-end text-right'
                            }
                        >
                            <h4 className="mt-6 mb-1 text-2xl font-semibold">
                                {group.type.title}
                            </h4>
                            <div className="h-0.5 w-4/5 bg-gray-300 sm:w-1/3" />
                        </div>

                        <LecturesGrid>
                            {group.lectures.map((lecture) => (
                                <LecturesGridItem
                                    key={lecture.id}
                                    lecture={lecture}
                                    user={user}
                                    className="md:col-span-1"
                                />
                            ))}
                        </LecturesGrid>
                    </div>
                ))}

                {lectureGroups.length === 0 && (
                    <div className="col-span-3 text-center text-gray-500">
                        Nenhuma palestra encontrada para o termo pesquisado.
                    </div>
                )}
            </section>

            <section className="flex flex-col gap-6 p-5">
                <div className="mt-12 text-center">
                    <h1 className="text-2xl font-bold text-black">
                        Confira aqui o local dos nossos prédios
                    </h1>
                    <h2 className="text-gray-500">
                        As palestras ocorrerão no nosso Centro Universitário UniSenac
                    </h2>
                    <div className='flex justify-center gap-4 mt-4'> 
                        <button
                            onClick={() => setActiveLocationKey('tech')}
                            className={`px-4 py-2 rounded-md transition-colors ${
                                activeLocationKey === 'tech'
                                    ? 'bg-primary-blue text-white shadow-lg'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            {LOCATIONS.tech.label}
                        </button>
                        <button
                            onClick={() => setActiveLocationKey('antigo')}
                            className={`px-4 py-2 rounded-md transition-colors ${
                                activeLocationKey === 'antigo'
                                    ? 'bg-primary-blue text-white shadow-lg'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            {LOCATIONS.antigo.label}
                        </button>
                    </div>         
                    <h2 className="text-gray-500 mt-2 font-semibold">
                        {activeLocation.address}
                    </h2>
                </div>
                <MapView 
                    center={activeLocation.center} 
                    zoom={activeLocation.zoom} 
                />
            </section>
        </AppLayout>
    );
}
export default Lectures;
