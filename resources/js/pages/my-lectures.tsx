import MyLecturesList from '@/components/my-lectures-list';
import MyLecturesPerfil from '@/components/my-lectures-perfil';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData, User } from '@/types';
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
            <section className='flex flex-col justify-center gap-20 px-10 py-10'>
                <div>
                    <h1 className='font-bold text-2xl'>Minhas Palestras</h1>
                    <h2 className='text-light-text'>As palestras nas quais você esta inscrito</h2>
                </div>
                <div className='grid md:grid-cols-2 gap-4'>
                    <MyLecturesPerfil user={auth.user}/>
                    <MyLecturesList user={auth.user}/>
                </div>
            </section>
        </AppLayout>
    );
}

export default MyLectures;

