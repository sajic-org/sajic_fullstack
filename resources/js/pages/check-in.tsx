import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Lecture } from '@/types/models';
import { usePage } from '@inertiajs/react';

function CheckIn({ lecture }: { lecture: Lecture }) {
    const page = usePage<SharedData>();
    const { auth } = page.props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Palestras',
            href: '/palestras',
        },
        {
            title: `Admin ${auth.user.name.split(' ', 1)}`,
            href: route('user.lectures'),
        },
        {
            title: 'Check in',
            href: '#',
        },
    ];

    console.log(lecture);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <header className="pt-10">
                <h1 className="text-2xl font-bold">Check In</h1>
                <p>Verifique a presença dos inscritos para que possam receber certificados</p>
                <div>
                    <img src={lecture.speaker?.image} />
                </div>
            </header>
        </AppLayout>
    );
}

export default CheckIn;
