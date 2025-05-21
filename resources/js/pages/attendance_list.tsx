import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import { LecturePresence } from '@/types/models';
import { Head, usePage } from '@inertiajs/react';

interface AttendanceListPageProps {
    attendees: LecturePresence
}

export default function AttendanceList({ attendees }: AttendanceListPageProps) {
    console.log(attendees)

    const page = usePage<SharedData>();
    const { auth } = page.props;
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `Admin ${auth.user.name.split(' ', 1)}`,
            href: route('user.lectures'),
        },
        {
            title: 'Presenças',
            href: '/presencas',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Presenças" />
        </AppLayout>
    );
}
