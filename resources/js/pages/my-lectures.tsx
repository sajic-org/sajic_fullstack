import MyLecturesList from '@/components/my-lectures-list';
import MyLecturesPerfil from '@/components/my-lectures-perfil';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

function MyLectures() {
    const page = usePage<SharedData>();
    const { auth } = page.props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: auth.user.name,
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
            <section className="mx-auto my-10 flex w-full flex-col justify-between gap-20 px-4 md:max-w-7xl">
                <div>
                    <h1 className="text-2xl font-bold">Minhas Palestras</h1>
                    <h2 className="text-light-text">As palestras nas quais você esta inscrito</h2>
                </div>
                <div className="grid gap-6 lg:grid-cols-2">
                    <MyLecturesPerfil user={auth.user} />
                    <MyLecturesList user={auth.user} />
                </div>
            </section>
        </AppLayout>
    );
}

export default MyLectures;
