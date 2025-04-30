import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { InertiaFormProps, useForm, usePage } from '@inertiajs/react';
import checkInColumnsFactory, { CheckInColumnsType, ShowedUpType } from '@/lib/check-in-columns-factory';
import CheckInDataTable from '@/components/check-in-data-table';
import Spinner from '@/components/spinner';
import { useState } from 'react';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Lecture } from '@/types/models';

type checkInFormType = {
    checkedUsers: ShowedUpType[];
};

export type checkInFormProps = InertiaFormProps<checkInFormType>

interface checkInPageProps {
    lecture: Lecture
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
    const form = useForm<checkInFormType>({ checkedUsers: [] })

    const [columnData, setColumnData] = useState<CheckInColumnsType[]>(generateColumnsData(lecture))
    const checkInColumns = checkInColumnsFactory(form, setColumnData)

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className='flex justify-between pt-10 flex-wrap pb-5'>
                <header className='pb-5 px-10'>
                    <h1 className='text-2xl font-bold'>
                        Check In
                    </h1>
                    <p>
                        Verifique a presença dos inscritos para que possam receber certificados
                    </p>
                    <div className='flex gap-4 items-center pt-4 flex-wrap'>
                        <img
                            className='w-30 h-30 rounded-2xl'
                            src="/assets/edecio.jpeg"
                        />

                        <div>
                            <h2 className='text-lg font-semibold'>
                                {lecture.title}
                            </h2>
                            <p>com {" "}
                                <span className='text-primary-blue'>
                                    {lecture.speaker?.name}
                                </span>
                            </p>
                        </div>
                    </div>
                </header>

                <Button
                    disabled={form.processing}
                    className="pb-5 mx-10 bg-primary-blue flex h-12 w-32 items-center gap-3 rounded-lg px-9 py-3.5 text-lg text-white shadow-lg drop-shadow-md"
                    onClick={() => form.patch(`/palestras/${lecture.id}/check-in`)}
                >
                    {form.processing ? <Spinner size={8} /> : "Salvar"}
                </Button>
            </div>

            <CheckInDataTable columns={checkInColumns} data={columnData} />
        </AppLayout>
    );
}

function generateColumnsData(lecture: Lecture) {
    if (!lecture.attendants) {
        return []
    }

    const columnData: CheckInColumnsType[] = []

    for (let user of lecture.attendants) {
        if (!user.lecture_attendances) {
            return []
        }

        columnData.push({
            email: user.email,
            name: user.name,
            showed_up: {
                presence: Boolean(user.lecture_attendances.showed_up),
                userId: user.id
            }
        })
    }

    return columnData
}

export default CheckIn;
