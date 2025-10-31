import { Banner } from '@/components/banner';
import { LecturesGrid, LecturesGridItem } from '@/components/lectures-grid';
import MapView from '@/components/Map';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Lecture, User } from '@/types/models';
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
    const LOCATIONS = {
        tech: {
            center: [-31.772016, -52.340731] as LatLngTuple,
            label: 'Prédio Tech',
            address: 'R. Félix Xavier da Cunha, 520',
            zoom: 19,
        },
        antigo: {
            center: [-31.770102803945708, -52.33884128983381] as LatLngTuple,
            label: 'Prédio Principal',
            address: 'R. Gonçalves Chaves, 602',
            zoom: 19,
        },
    };

    const [activeLocationKey, setActiveLocationKey] = useState<
        'tech' | 'antigo'
    >('tech');

    const activeLocation = LOCATIONS[activeLocationKey];

    const [query, setQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<number | null>(
        null,
    );
    const [filteredLectures, setFilteredLectures] =
        useState<Lecture[]>(lectures);

    const categoryMap = new Map<number, string>();
    lectures.forEach((l) => {
        if (l.type) {
            if (typeof l.type === 'object' && l.type.id && l.type.title) {
                categoryMap.set(l.type.id, l.type.title);
            } else if (typeof l.type === 'string') {
                const id = categoryMap.size + 1;
                if (!Array.from(categoryMap.values()).includes(l.type)) {
                    categoryMap.set(id, l.type);
                }
            }
        }
    });
    const categories = Array.from(categoryMap.entries())
        .map(([id, title]) => ({
            id,
            title,
        }))
        .sort((a, b) => a.title.localeCompare(b.title));

    useEffect(() => {
        const results = lectures.filter((l: Lecture) => {
            if (selectedCategory !== null) {
                const lectureTypeId =
                    typeof l.type === 'object' && l.type?.id ? l.type.id : null;
                if (lectureTypeId !== selectedCategory) {
                    return false;
                }
            }

            const titleMatch = l.title
                .toLowerCase()
                .includes(query.toLowerCase());
            const speakerMatch = l.speaker?.name
                .toLowerCase()
                .includes(query.toLowerCase());
            const speakersMatch = l.speakers?.some((s) =>
                s.name.toLowerCase().includes(query.toLowerCase()),
            );
            return titleMatch || speakerMatch || speakersMatch;
        });
        setFilteredLectures(results);
    }, [query, lectures, selectedCategory]);

    // Group lectures by date
    const groupedLectures: Record<
        string,
        { date: string; lectures: Lecture[] }
    > = {};

    filteredLectures.forEach((lecture) => {
        if (!lecture.date) return;

        if (!groupedLectures[lecture.date]) {
            groupedLectures[lecture.date] = {
                date: lecture.date,
                lectures: [],
            };
        }
        groupedLectures[lecture.date].lectures.push(lecture);
    });

    const lectureGroups = Object.values(groupedLectures).sort((a, b) => {
        const [dayA, monthA] = a.date.split('/').map(Number);
        const [dayB, monthB] = b.date.split('/').map(Number);

        if (monthA !== monthB) {
            return monthA - monthB;
        }
        return dayA - dayB;
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head>
                <title>Palestras</title>
            </Head>

            <Banner
                description="caso, no momento da palestra, as salas ainda tenham espaço, os organizadores poderão permitir que você se inscreva e participe."
                linkText=""
                linkUrl=""
                title="No caso da palestra estar esgotada:"
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

            {/* Category filter buttons */}
            {categories.length > 0 && (
                <div className="mt-6 px-4 sm:px-6 md:max-w-7xl">
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                                selectedCategory === null
                                    ? 'bg-primary-blue text-white shadow-md'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            Todas
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                                    selectedCategory === category.id
                                        ? 'bg-primary-blue text-white shadow-md'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                {category.title}
                            </button>
                        ))}
                    </div>
                </div>
            )}

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
                    <div key={group.date}>
                        <div
                            className={
                                index % 2 === 0
                                    ? 'ml-5'
                                    : 'mr-5 flex flex-col items-end text-right'
                            }
                        >
                            <h4 className="mt-6 mb-1 text-2xl font-semibold">
                                {group.date}
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
                        As palestras ocorrerão no nosso Centro Universitário
                        UniSenac
                    </h2>
                    <div className="mt-4 flex justify-center gap-4">
                        <button
                            onClick={() => setActiveLocationKey('tech')}
                            className={`rounded-md px-4 py-2 transition-colors ${
                                activeLocationKey === 'tech'
                                    ? 'bg-primary-blue text-white shadow-lg'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            {LOCATIONS.tech.label}
                        </button>
                        <button
                            onClick={() => setActiveLocationKey('antigo')}
                            className={`rounded-md px-4 py-2 transition-colors ${
                                activeLocationKey === 'antigo'
                                    ? 'bg-primary-blue text-white shadow-lg'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            {LOCATIONS.antigo.label}
                        </button>
                    </div>
                    <h2 className="mt-2 font-semibold text-gray-500">
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
