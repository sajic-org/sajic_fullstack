import MyLecturesList from '@/components/my-lectures-list';
import MyLecturesPerfil from '@/components/my-lectures-perfil';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { User } from '@/types/models';
import { Head } from '@inertiajs/react';

function MyLectures({ user }: { user: User }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: user.name,
            href: '/settings/profile',
        },
        {
            title: 'Minhas Palestras',
            href: '/minhas-palestras',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Minhas Palestras" />
            <section className="mx-auto my-10 flex w-full flex-col justify-between gap-20 px-4 sm:px-6 md:max-w-7xl">
                <div>
                    <h1 className="text-2xl font-bold">Minhas Palestras</h1>
                    <h2 className="text-light-text">
                        As palestras nas quais você está inscrito
                    </h2>
                </div>
                <div className="grid gap-6 lg:grid-cols-2">
                    <MyLecturesPerfil user={user} />
                    <MyLecturesList lectures={user.lectures} />
                </div>
            </section>
        </AppLayout>
    );
}

export default MyLectures;
