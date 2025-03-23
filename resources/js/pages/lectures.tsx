import { LecturesGrid, LecturesGridItem } from '@/components/lectures-grid';
import LecturesGridHeading from '@/components/lectures-grid-heading';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
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

function Lectures() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Palestras" />

            <div className="mt-10 px-4 md:max-w-7xl">
                <h2 className="text-primary-blue/90 text-xl font-semibold">Palestras</h2>
                <h3 className="text-3xl font-semibold">Confira o que te aguarda no evento</h3>
            </div>

            <section className="mx-auto space-y-4 px-4 md:max-w-7xl">
                <LecturesGridHeading
                    title="Tecnologia"
                    description="Explore o mercado atual da tecnologia"
                    image="https://phoenixnap.com/glossary/wp-content/uploads/2022/07/what-is-a-data-center.jpg"
                    className={'bg-primary-blue/90 mt-8 aspect-[3/2] text-white md:w-3/8'}
                />
                <LecturesGrid>
                    {dia1.map((item, i) => (
                        <LecturesGridItem key={i} lecture={item} className="md:col-span-1" />
                    ))}
                </LecturesGrid>

                {/* dia 2 */}
                <LecturesGridHeading
                    title="Gestão e Mercado"
                    image="https://www.ziprecruiter.com/svc/fotomat/public-ziprecruiter/cms/929029342ArchitecturalEngineer.jpg=ws1280x960"
                    description="Explore the birth of groundbreaking ideas and inventions."
                    className={'bg-primary-blue/90 mt-8 ml-auto aspect-[3/2] text-white md:w-3/8'}
                />
                <LecturesGrid>
                    {dia2.map((item, i) => (
                        <LecturesGridItem key={i} lecture={item} className="md:col-span-1" />
                    ))}
                </LecturesGrid>

                {/* dia 3 */}
                <LecturesGridHeading
                    title="Sla"
                    description="Explore the birth of groundbreaking ideas and inventions."
                    className={'bg-primary-blue/90 mt-8 aspect-[3/2] text-white md:w-3/8'}
                />
                <LecturesGrid>
                    {dia3.map((item, i) => (
                        <LecturesGridItem key={i} lecture={item} className="md:col-span-1" />
                    ))}
                </LecturesGrid>
            </section>
        </AppLayout>
    );
}
export default Lectures;

const dia1 = [
    {
        title: 'The Dawn of Innovation',
        description: 'Explore the birth of groundbreaking ideas and inventions.',
        time: '17/10, 09:30 - 11:30',
        image: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
    },
    {
        title: 'The Digital Revolution',
        description: 'Dive into the transformative power of technology.',
        time: '17/10, 09:30 - 11:30',
        image: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
    },
    {
        title: 'The Art of Design',
        description: 'Discover the beauty of thoughtful and functional design.',
        time: '17/10, 09:30 - 11:30',
        image: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
    },
    {
        title: 'The Pursuit of Knowledge',
        description: 'Join the quest for understanding and enlightenment.',

        time: '17/10, 09:30 - 11:30',
        image: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
    },
    {
        title: 'The Joy of Creation',
        description: 'Experience the thrill of bringing ideas to life.',

        time: '17/10, 09:30 - 11:30',
        image: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
    },
    {
        title: 'The Art of Design',
        description: 'Discover the beauty of thoughtful and functional design.',
        time: '17/10, 09:30 - 11:30',
        image: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
    },
];

const dia2 = [
    {
        title: 'The Pursuit of Knowledge',
        description: 'Join the quest for understanding and enlightenment.',

        time: '17/10, 09:30 - 11:30',
        image: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
    },
    {
        title: 'The Joy of Creation',
        description: 'Experience the thrill of bringing ideas to life.',

        time: '17/10, 09:30 - 11:30',
        image: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
    },

    {
        title: 'The Pursuit of Knowledge',
        description: 'Join the quest for understanding and enlightenment.',

        time: '17/10, 09:30 - 11:30',
        image: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
    },
    {
        title: 'The Joy of Creation',
        description: 'Experience the thrill of bringing ideas to life.',
        time: '17/10, 09:30 - 11:30',
        image: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
    },
    {
        title: 'The Digital Revolution',
        description: 'Dive into the transformative power of technology.',
        time: '17/10, 09:30 - 11:30',
        image: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
    },
    {
        title: 'The Art of Design',
        description: 'Discover the beauty of thoughtful and functional design.',
        time: '17/10, 09:30 - 11:30',
        image: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
    },
];

const dia3 = [
    {
        title: 'The Dawn of Innovation',
        description: 'Explore the birth of groundbreaking ideas and inventions.',

        time: '17/10, 09:30 - 11:30',
        image: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
    },

    {
        title: 'The Digital Revolution',
        description: 'Dive into the transformative power of technology.',
        time: '17/10, 09:30 - 11:30',
        image: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
    },

    {
        title: 'The Pursuit of Knowledge',
        description: 'Join the quest for understanding and enlightenment.',

        time: '17/10, 09:30 - 11:30',
        image: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
    },
    {
        title: 'The Joy of Creation',
        description: 'Experience the thrill of bringing ideas to life.',
        time: '17/10, 09:30 - 11:30',
        image: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
    },

    {
        title: 'The Dawn of Innovation',
        description: 'Explore the birth of groundbreaking ideas and inventions.',

        time: '17/10, 09:30 - 11:30',
        image: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
    },
    {
        title: 'The Dawn of Innovation',
        description: 'Explore the birth of groundbreaking ideas and inventions.',

        time: '17/10, 09:30 - 11:30',
        image: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
    },
];
