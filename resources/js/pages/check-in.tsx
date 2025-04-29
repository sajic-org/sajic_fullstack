import CheckInDataTable from '@/components/check-in-data-table';
import Spinner from '@/components/spinner';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import checkInColumnsFactory, { CheckInColumnsType, ShowedUpType } from '@/lib/check-in-columns-factory';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Lecture } from '@/types/models';
import { InertiaFormProps, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

type checkInFormType = {
    checkedUsers: ShowedUpType[];
};

export type checkInFormProps = InertiaFormProps<checkInFormType>;

interface checkInPageProps {
    lecture: Lecture;
}

function CheckIn({ lecture }: checkInPageProps) {
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

    const form = useForm<checkInFormType>({ checkedUsers: [] });

    const [columnData, setColumnData] = useState<CheckInColumnsType[]>(generateColumnsData(lecture));

    const checkInColumns = checkInColumnsFactory(form, setColumnData);

    console.log(form.data);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <main className="mx-auto w-full px-6 pt-10 md:max-w-5xl">
                <div className="flex justify-between gap-5">
                    <div>
                        <h1 className="text-2xl font-bold">Check In</h1>
                        <p>Verifique a presença dos inscritos para que possam receber certificados</p>
                        <div className="flex flex-wrap items-center gap-4 pt-4">
                            <img className="h-35 w-35 rounded-2xl" src="/assets/edecio.jpeg" />

                            <div>
                                <h2 className="mb-1 w-fit text-2xl font-semibold">{lecture.title}</h2>
                                <p>
                                    com <span className="text-primary-blue text-lg font-medium">{lecture.speaker?.name}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <Button
                        disabled={form.processing}
                        className="p-4 px-5 text-lg"
                        onClick={() => form.patch(route('lectures.check-in', { lecture: lecture }))}
                    >
                        {form.processing ? <Spinner size={8} /> : 'Salvar'}
                    </Button>
                </div>

                <CheckInDataTable columns={checkInColumns} data={columnData} />
            </main>
        </AppLayout>
    );
}

function generateColumnsData(lecture: Lecture) {
    if (!lecture.attendants) {
        return [];
    }

    const columnData: CheckInColumnsType[] = [];

    for (let user of lecture.attendants) {
        if (!user.lecture_attendances) {
            return [];
        }

        columnData.push({
            email: user.email,
            name: user.name,
            showed_up: {
                presence: Boolean(user.lecture_attendances.showed_up),
                userId: user.id,
            },
        });
    }

    return columnData;
}

export default CheckIn;
