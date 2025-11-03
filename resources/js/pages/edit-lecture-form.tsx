import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';

import { Transition } from '@headlessui/react';

import AddSpeakerDialog from '@/components/add-speaker-dialog';
import { DatePicker } from '@/components/date-picker';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import MultipleSpeakersInput from '@/components/multiple-speakers-input';
import { RoomDropdown } from '@/components/RoomDropdown';
import { TimeSelectorGroup } from '@/components/time-selector';
import { TypeDropdown } from '@/components/TypeDropdown';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SelectValue } from '@/components/ui/select';
import { LectureType, Room, Speaker } from '@/types/models';
import { FormEventHandler, SetStateAction, useState } from 'react';
import { toast } from 'sonner';
import { LectureForm } from './new-lecture-form';

export interface Lecture extends LectureForm {
    id: number;
    created_at: string;
    updated_at: string;
}

function EditLectureForm({
    lecture,
    speakers,
    rooms,
    types,
}: {
    lecture: Lecture;
    speakers: Speaker[];
    rooms: Room[];
    types: LectureType[];
}) {
    const page = usePage<SharedData>();
    const { auth } = page.props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `Admin ${auth.user.name.split(' ', 1)}`,
            href: route('user.lectures'),
        },
        {
            title: 'Editar Palestra',
            href: route('lectures.edit', { id: lecture.id }),
        },
    ];

    const lectureWithSpeakers = lecture as Lecture & { speakers?: Speaker[] };
    const initialSpeakers =
        lectureWithSpeakers.speakers &&
        Array.isArray(lectureWithSpeakers.speakers) &&
        lectureWithSpeakers.speakers.length > 0
            ? lectureWithSpeakers.speakers
            : lecture.speaker
              ? [lecture.speaker]
              : [];

    const [selectedSpeakers, setSelectedSpeakers] =
        useState<Speaker[]>(initialSpeakers);

    const [availableTypes, setAvailableTypes] = useState<string[]>(
        types.map((type) => type.title),
    );

    // Função segura para obter o tipo da palestra
    const getLectureType = (): string => {
        if (!lecture || !lecture.type) return '';
        if (
            typeof lecture.type === 'object' &&
            lecture.type !== null &&
            'title' in lecture.type
        ) {
            return (lecture.type as { title: string }).title || '';
        }
        if (typeof lecture.type === 'string') {
            return lecture.type;
        }
        return '';
    };

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm<LectureForm>({
            speaker_ids:
                initialSpeakers.length > 0
                    ? initialSpeakers.map((s: Speaker) => s.id)
                    : [],
            room_number: lecture.room_number || '',
            title: lecture.title || '',
            type: getLectureType(),
            date: lecture.date || '',
            starts: lecture.starts || '',
            ends: lecture.ends || '',

            speaker: '',
        });

    const handleAddSpeaker = (speaker: Speaker) => {
        if (!selectedSpeakers.find((s) => s.id === speaker.id)) {
            const newSelected = [...selectedSpeakers, speaker];
            setSelectedSpeakers(newSelected);
            setData(
                'speaker_ids',
                newSelected.map((s) => s.id),
            );
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('lectures.update', { id: lecture.id }), {
            preserveScroll: true,
            onSuccess: () => {
                toast('Palestra atualizada!', {
                    description: `Palestra "${data.title}" foi atualizada com sucesso!`,
                });
            },
            onError: (errors) => {
                toast.error('Erro ao atualizar palestra.');
                console.error(errors);
            },
        });
    };

    const onDelete = () => {
        router.delete(route('lectures.destroy', { lecture: lecture }), {
            preserveScroll: true,
            onSuccess: () => {
                toast('Palestra removida!', {
                    description: `A palestra "${data.title}" foi removida com sucesso`,
                });
            },
            onError: (errors) => {
                toast.error('Erro ao remover a palestra');
                console.error(errors);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Palestra" />

            <div className="mx-auto mb-20 w-full space-y-4 px-4 pt-12 sm:px-6 md:w-9/12 lg:w-2/3">
                <div className="flex justify-between">
                    <HeadingSmall
                        title="Editar Palestra"
                        description="Atualize os detalhes da palestra"
                    />

                    <button
                        className="cursor-pointer underline"
                        onClick={onDelete}
                    >
                        Excluir Palestra
                    </button>
                </div>

                <div className="mt-7 grid gap-2">
                    <Label htmlFor="title">
                        Palestrantes{' '}
                        {selectedSpeakers.length > 0 &&
                            `(${selectedSpeakers.length})`}
                    </Label>
                    <MultipleSpeakersInput
                        onSetData={setData}
                        speakers={speakers}
                        selectedSpeakers={selectedSpeakers}
                        onSetSelectedSpeakers={setSelectedSpeakers}
                    >
                        <AddSpeakerDialog
                            onSetSelectedSpeaker={(
                                speaker:
                                    | Speaker
                                    | SetStateAction<Speaker | undefined>,
                            ) => {
                                const actualSpeaker =
                                    typeof speaker === 'function'
                                        ? speaker(selectedSpeakers[0])
                                        : speaker;
                                if (actualSpeaker) {
                                    handleAddSpeaker(actualSpeaker);
                                }
                            }}
                            onSetData={setData}
                        />
                    </MultipleSpeakersInput>
                    <InputError
                        className="mt-2"
                        message={errors.speaker_ids || errors.speaker}
                    />
                </div>

                <form
                    onSubmit={submit}
                    className=""
                >
                    <div className="grid grid-cols-8 space-y-4 space-x-2">
                        <div className="col-span-8 sm:col-span-4">
                            <Label htmlFor="title">Título</Label>

                            <Input
                                id="title"
                                className="mt-1 block w-full"
                                value={data.title || ''}
                                onChange={(e) =>
                                    setData('title', e.target.value)
                                }
                                placeholder="Título da Palestra"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.title}
                            />
                        </div>

                        <div className="relative col-span-4 flex flex-col gap-[14px] sm:col-span-2">
                            <div className="flex gap-2">
                                <Label>Sala</Label>
                                <div id="portal-root"></div>
                            </div>

                            <RoomDropdown
                                rooms={rooms}
                                onSetData={setData}
                                data={data}
                            >
                                <SelectValue
                                    className="flex w-full justify-between"
                                    placeholder="Sala"
                                />
                            </RoomDropdown>
                            <InputError
                                className="mt-2"
                                message={errors.room_number}
                            />
                        </div>

                        <div className="col-span-4 flex flex-col gap-[14px] sm:col-span-2">
                            <Label>Tipo</Label>

                            <TypeDropdown
                                availableTypes={availableTypes}
                                onSetAvailableTypes={setAvailableTypes}
                                onSetData={setData}
                                defaultValue={data.type}
                            >
                                <SelectValue
                                    className="w-full"
                                    placeholder="Categoria"
                                />
                            </TypeDropdown>
                            <InputError
                                className="mt-2"
                                message={errors.type}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 space-y-4 space-x-2">
                        <div className="col-span-2 md:col-span-1">
                            <Label htmlFor="data">Data</Label>
                            <DatePicker
                                onSetData={setData}
                                defaultDate={lecture.date}
                            />
                            <InputError
                                className="mt-2"
                                message={errors.date}
                            />
                        </div>

                        <div className="col-span-2 flex flex-wrap gap-2 sm:flex-nowrap md:col-span-1">
                            {/* Das */}
                            <div className="w-full sm:w-1/2">
                                <TimeSelectorGroup
                                    onSetData={setData}
                                    defaultValue={data.starts}
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.starts}
                                />
                            </div>

                            {/* às */}
                            <div className="w-full sm:w-1/2">
                                <TimeSelectorGroup
                                    onSetData={setData}
                                    variant="ends"
                                    defaultValue={data.ends}
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.ends}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-7 ml-auto flex w-fit items-center gap-4">
                        <Button
                            disabled={processing}
                            className="px-8 py-5 text-base font-semibold"
                        >
                            Atualizar
                        </Button>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-neutral-600">
                                Atualizado
                            </p>
                        </Transition>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
export default EditLectureForm;
