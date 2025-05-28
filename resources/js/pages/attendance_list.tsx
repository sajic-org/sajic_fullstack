import PresenceDataTable from '@/components/presence-data-table';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { presenceColumns } from '@/lib/presence-columns';
import { BreadcrumbItem, SharedData } from '@/types';
import { LecturePresence } from '@/types/models';
import { Head, usePage } from '@inertiajs/react';
import { ColumnFiltersState, getCoreRowModel, getFilteredRowModel, useReactTable } from '@tanstack/react-table';
import { useState } from 'react';

interface AttendanceListPageProps {
    attendees: LecturePresence[];
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

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data: attendees,
        columns: presenceColumns,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters
        }
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Presenças" />

            <header className="px-10 pt-10">
                <h1 className="pb-5 text-2xl font-bold">Listagem de Presenças</h1>
                <div className="flex flex-wrap gap-5 md:flex-nowrap md:justify-between">
                    <p>Verifique a presença dos alunos da UniSenac</p>
                    <Input
                        className="md:w-96"
                        placeholder="Filtrar por nome..."
                        value={table.getColumn('name')?.getFilterValue() as string}
                        onChange={(e) => table.getColumn('name')?.setFilterValue(e.target.value)}
                    />
                </div>
            </header>
            <main className="px-10 pt-5">
                <PresenceDataTable table={table} />
            </main>
        </AppLayout>
    );
}
