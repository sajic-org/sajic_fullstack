import CheckInDataTable from '@/components/check-in-data-table';
import AppLayout from '@/layouts/app-layout';

import {
    Head,
    InertiaFormProps,
    router,
    useForm,
    usePage,
} from '@inertiajs/react';

import { CheckInColumnsType } from '@/lib/check-in-columns-factory';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Lecture } from '@/types/models';

import { FormDataConvertible } from '@inertiajs/core';

import Spinner from '@/components/spinner';
import checkInColumns from '@/lib/check-in-columns-factory';
import { toast } from 'sonner';

type checkInFormType = {
    checkedUsersIds: string[];
};

export type checkInFormProps = InertiaFormProps<checkInFormType>;

// thank you typescript / inertiajs terrible typing
type LectureFormDataConvertible = Lecture & FormDataConvertible;

interface checkInPageProps {
    lecture: LectureFormDataConvertible;
}

function openAndCloseEnrollment(lecture: LectureFormDataConvertible) {
    router.patch(
        route('lectures.reopen_enrollment', { lecture: lecture }),
        { lecture: lecture },
        {
            preserveScroll: true,
            onSuccess: () => {
                toast(
                    `Inscrições ${lecture.is_open_for_enrollment ? 'fechadas' : 'reabertas'}`,
                    {
                        description: `Inscrições para a palestra ${lecture.title} ${lecture.is_open_for_enrollment ? 'fechadas' : 'reabertas'} com sucesso.`,
                    },
                );
            },
            onError: (errors) => {
                toast.error(
                    `Erro ao ${lecture.is_open_for_enrollment ? 'fechar' : 'reabrir'} inscrições.`,
                );
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
                    <p>
                        Verifique a presença dos inscritos para que possam
                        receber certificados
                    </p>
                    <div className="flex flex-wrap items-center gap-4 pt-4">
                        <img
                            className="cover h-30 w-30 rounded-2xl object-cover"
                            src={lecture.speaker?.image}
                        />

                        <div>
                            <h2 className="text-lg font-semibold">
                                {lecture.title}
                            </h2>
                            <p>
                                com{' '}
                                <span className="text-primary-blue">
                                    {lecture.speaker?.name}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-baseline gap-3">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => openAndCloseEnrollment(lecture)}
                            className="flex items-center gap-2 rounded-lg bg-amber-100 px-4 py-2 font-medium text-amber-700 transition-colors hover:bg-amber-200"
                        >
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                />
                            </svg>
                            {lecture.is_open_for_enrollment
                                ? 'Fechar Inscrições'
                                : 'Reabrir Inscrições'}
                        </button>

                        <button
                            disabled={form.processing}
                            className="flex cursor-pointer items-center gap-2 rounded-lg bg-slate-200 px-4 py-2 font-medium text-slate-700 transition-colors hover:bg-slate-300"
                            onClick={() =>
                                form.patch(`/palestras/${lecture.id}/check-in`)
                            }
                        >
                            {form.processing ? (
                                <Spinner size={8} />
                            ) : (
                                <>
                                    <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                                        />
                                    </svg>{' '}
                                    Salvar
                                </>
                            )}
                        </button>

                        <button
                            className="bg-primary-blue flex items-center gap-2 rounded-lg px-5 py-2 font-medium text-white shadow-sm transition-colors hover:bg-green-700"
                            onClick={() =>
                                form.patch(`/palestras/${lecture.id}/finish`)
                            }
                        >
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                            Finalizar
                        </button>
                    </div>
                </div>
            </div>

            <CheckInDataTable
                columns={checkInColumns}
                data={columnData}
                setData={form.setData}
            />
        </AppLayout>
    );
}

function generateColumnsData(lecture: Lecture) {
    if (!lecture.attendants) {
        return [];
    }

    const columnData: CheckInColumnsType[] = [];

    for (const user of lecture.attendants) {
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
