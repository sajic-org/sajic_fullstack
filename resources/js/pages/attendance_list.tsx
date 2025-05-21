import PresenceDataTable from '@/components/presence-data-table';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { presenceColumns } from '@/lib/presence-columns';
import { BreadcrumbItem, SharedData } from '@/types';
import { LecturePresence } from '@/types/models';
import { Head, usePage } from '@inertiajs/react';

interface AttendanceListPageProps {
    attendees: LecturePresence[]
}

export default function AttendanceList({ attendees }: AttendanceListPageProps) {
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

            <header className='pt-10 px-10'>
                <h1 className='text-2xl font-bold pb-5'>Listagem de Presenças</h1>
                <div className='flex flex-wrap justify-between'>
                    <p>Verifique a presença dos alunos da UniSenac</p>
                    <Input className='w-96' placeholder='Filtrar por nome...'/>
                </div>
            </header>
            <main className='pt-5 px-10'>
                <PresenceDataTable data={attendees} columns={presenceColumns} />
            </main>
        </AppLayout>
    );
}
