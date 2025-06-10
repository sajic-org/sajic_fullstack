import CheckInDataTable from '@/components/check-in-data-table';
import Spinner from '@/components/spinner';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';

import { Head, InertiaFormProps, router, useForm, usePage } from '@inertiajs/react';

import { CheckInColumnsType, ShowedUpType } from '@/lib/check-in-columns-factory';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Lecture } from '@/types/models';

import { toast } from 'sonner';
import checkInColumns from '@/lib/check-in-columns-factory';

type checkInFormType = {
    checkedUsersIds: string[];
};

export type checkInFormProps = InertiaFormProps<checkInFormType>;

interface checkInPageProps {
    lecture: Lecture;
}

function openAndCloseEnrollment(lecture: Lecture) {
    router.patch(
        route('lectures.reopen_enrollment', { lecture: lecture }),
        { lecture: lecture },
        {
            preserveScroll: true,
            onSuccess: () => {
                toast(`Inscrições ${lecture.is_open_for_enrollment ? 'fechadas' : 'reabertas'}`, {
                    description: `Inscrições para a palestra ${lecture.title} ${lecture.is_open_for_enrollment ? 'fechadas' : 'reabertas'} com sucesso.`,
                });
            },
            onError: (errors) => {
                toast.error(`Erro ao ${lecture.is_open_for_enrollment ? 'fechar' : 'reabrir'} inscrições.`);
                console.error(errors);
            },
        },
    );
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

    const form = useForm<checkInFormType>({ checkedUsersIds: [] });
    const columnData = generateColumnsData(lecture);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Check-in" />
            <div className="mt-10 flex flex-wrap justify-between px-4 sm:px-6 md:max-w-7xl">
                <div className="pb-5">
                    <h1 className="text-2xl font-bold">Check In</h1>
                    <p>Verifique a presença dos inscritos para que possam receber certificados</p>
                    <div className="flex flex-wrap items-center gap-4 pt-4">
                        <img className="h-30 w-30 rounded-2xl" src={lecture.speaker?.image} />

                        <div>
                            <h2 className="text-lg font-semibold">{lecture.title}</h2>
                            <p>
                                com <span className="text-primary-blue">{lecture.speaker?.name}</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-baseline gap-3">
                    <div>
                        <span className="text-xs font-semibold">(caso as vagas esgotarem)</span>
                        <Button variant="link" onClick={() => openAndCloseEnrollment(lecture)} className="w-fit px-1">
                            {lecture.is_open_for_enrollment ? 'Fechar Inscrições' : 'Reabrir Inscrições'}
                        </Button>
                    </div>

                    <Button
                        disabled={form.processing}
                        className="bg-primary-blue cursor-pointer rounded-md px-9 py-5 text-xl font-medium text-white sm:gap-2"
                        onClick={() => form.patch(`/palestras/${lecture.id}/check-in`)}
                    >
                        {form.processing ? <Spinner size={8} /> : 'Salvar'}
                    </Button>
                </div>
            </div>

            <CheckInDataTable columns={checkInColumns} data={columnData} form={form} />
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
