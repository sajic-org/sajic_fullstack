import { Banner } from '@/components/banner';
import { LecturesGrid, LecturesGridItem } from '@/components/lectures-grid';
import LecturesGridHeading from '@/components/lectures-grid-heading';
import MapView from '@/components/Map';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Lecture, User } from '@/types/models';
import { Head } from '@inertiajs/react';
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
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Palestras" />
            <Banner
                description="caso, no momento da palestra, as salas ainda tenham espaço, os organizadores poderão permitir que você se inscreva e participe."
                linkText=""
                linkUrl=""
                title="Palestras Esgotadas:"
            />

            <div className="mt-10 px-4 sm:px-6 md:max-w-7xl">
                <h2 className="text-primary-blue text-xl font-semibold">Palestras</h2>
                <h3 className="text-3xl font-semibold">Confira o que te aguarda no evento</h3>
            </div>

            <section className="xs:px-4 mx-auto w-full space-y-4 px-2 sm:px-6 md:max-w-7xl">
                <LecturesGridHeading
                    title="Tecnologia"
                    description="Explore o mercado atual da tecnologia"
                    image="https://phoenixnap.com/glossary/wp-content/uploads/2022/07/what-is-a-data-center.jpg"
                    className={'bg-primary-blue mt-8 aspect-[3/2] text-white md:max-w-lg'}
                />

                <LecturesGrid>
                    {lectures
                        ?.filter((lecture) => lecture.type === 'Tecnologia')
                        .map((item, i) => <LecturesGridItem key={i} lecture={item} user={user} className="md:col-span-1" />)}
                </LecturesGrid>

                <LecturesGridHeading
                    title="Gestão e Mercado"
                    image="https://www.ziprecruiter.com/svc/fotomat/public-ziprecruiter/cms/929029342ArchitecturalEngineer.jpg=ws1280x960"
                    description="Explore the birth of groundbreaking ideas and inventions."
                    className={'bg-primary-blue mt-8 ml-auto aspect-[3/2] text-white md:max-w-lg'}
                />
                <LecturesGrid>
                    {lectures
                        ?.filter((lecture) => lecture.type === 'Gestão e Mercado')
                        .map((item, i) => <LecturesGridItem key={i} lecture={item} user={user} className="md:col-span-1" />)}
                </LecturesGrid>
            </section>
            <section className="flex flex-col gap-6 p-5">
                <div className="mt-12 text-center">
                    <h1 className="text-2xl font-bold text-black">Nosso Campus</h1>
                    <h2 className="text-gray-500">As palestar ocorrerão no nosso Centro Universitario UniSenac</h2>
                    <h2 className="text-gray-500">R. Gonçalves Chaves, 602</h2>
                </div>
                <MapView />
            </section>
        </AppLayout>
    );
}
export default Lectures;
