import PresenceDataTable from '@/components/presence-data-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
    const [resetKey, setResetKey] = useState(0);
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
            columnFilters,
        },
    });

    //Cria um set para pegar todas os dados únicos e transforma de volta em uma array
    const semestres = [...new Set(attendees.map((attendee) => attendee.semester))];
    const cursos = [...new Set(attendees.map((attendee) => attendee.course))];
    const datas = [...new Set(attendees.map((attendee) => attendee.date))];

    function handleReset() {
        table.resetColumnFilters();
        setResetKey((prev) => prev + 1);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Presenças" />

            <header className="px-10 pt-10">
                <h1 className="pb-5 text-2xl font-bold">Listagem de Presenças</h1>
                <div className="flex flex-wrap gap-5 md:flex-nowrap md:justify-between">
                    <p>Verifique a presença dos alunos da UniSenac</p>
                    <div className="flex flex-col gap-1">
                        <Input
                            className="md:w-96"
                            placeholder="Filtrar por nome..."
                            value={table.getColumn('name')?.getFilterValue() as string}
                            onChange={(e) => table.getColumn('name')?.setFilterValue(e.target.value)}
                        />

                        <div id="selects" className="flex flex-wrap justify-center">
                            <Select key={`date-${resetKey}`} onValueChange={(data) => table.getColumn('date')?.setFilterValue(data)}>
                                <SelectTrigger className="sm:rounded-r-none">
                                    <SelectValue placeholder="Data" />
                                </SelectTrigger>
                                <SelectContent>
                                    {datas.map((data) => (
                                        <SelectItem value={data} key={data}>
                                            {data}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select key={`course-${resetKey}`} onValueChange={(curso) => table.getColumn('course')?.setFilterValue(curso)}>
                                <SelectTrigger className="sm:rounded-l-none sm:rounded-r-none sm:border-r-0 sm:border-l-0">
                                    <SelectValue placeholder="Curso" />
                                </SelectTrigger>
                                <SelectContent>
                                    {cursos.map((curso) => (
                                        <SelectItem value={curso} key={curso}>
                                            {curso}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select key={`semester-${resetKey}`} onValueChange={(semestre) => table.getColumn('semester')?.setFilterValue(semestre)}>
                                <SelectTrigger className="sm:rounded-l-none sm:rounded-r-none sm:border-r-0">
                                    <SelectValue placeholder="Semestre" />
                                </SelectTrigger>
                                <SelectContent>
                                    {semestres.map((semestre) => (
                                        <SelectItem value={semestre} key={semestre}>
                                            {semestre}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Button className="sm:rounded-l-none" type="reset" variant="outline" onClick={() => handleReset()}>
                                Limpar
                            </Button>
                        </div>
                    </div>
                </div>
            </header>
            <main className="px-10 pt-5">
                <PresenceDataTable table={table} />
            </main>
        </AppLayout>
    );
}
