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
        </AppLayout>
    );
}

export default MyLectures;
