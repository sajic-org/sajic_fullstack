import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';

import { Transition } from '@headlessui/react';

import AddSpeakerDialog from '@/components/add-speaker-dialog';
import { DatePicker } from '@/components/date-picker';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Room, RoomDropdown } from '@/components/RoomDropdown';
import SpeakerSearchInput from '@/components/speaker-search-input';
import { TimeSelectorGroup } from '@/components/time-selector';
import { TypeDropdown } from '@/components/TypeDropdown';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SelectValue } from '@/components/ui/select';
import { Speaker } from '@/types/models';
import { FormEventHandler, useEffect, useState } from 'react';
import { toast } from 'sonner';

export interface LectureForm {
    speaker_id: number;
    room_number: string;
    title: string;
    type: string;
    date: string | Date;
    starts: string;
    ends: string;
    [key: string]: any | unknown;
}

export interface Lecture extends LectureForm {
    id: number;
    created_at: string;
    updated_at: string;
}

function EditLectureForm({ lecture, speakers, rooms }: { lecture: Lecture; speakers: Speaker[]; rooms: Room[] }) {
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

    const currentSpeaker = speakers.find((speaker) => speaker.id === lecture.speaker_id);
    const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | undefined>(currentSpeaker);

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<LectureForm>({
        speaker_id: lecture.speaker_id,
        room_number: lecture.room_number,
        title: lecture.title,
        type: lecture.type,
        date: lecture.date,
        starts: lecture.starts,
        ends: lecture.ends,
    });

    useEffect(() => {
        if (data.speaker_id) {
            const speaker = speakers.find((s) => s.id === data.speaker_id);
            if (speaker && (!selectedSpeaker || selectedSpeaker.id !== speaker.id)) {
                setSelectedSpeaker(speaker);
            }
        }
    }, [data.speaker_id, speakers, selectedSpeaker]);

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

            <div className="mx-auto mb-20 space-y-6 px-4 pt-12 sm:px-6 md:w-2/3">
                <div className="flex justify-between">
                    <HeadingSmall title="Editar Palestra" description="Atualize os detalhes da palestra" />

                    <button className="cursor-pointer underline" onClick={onDelete}>
                        Excluir Palestra
                    </button>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="title">Palestrante</Label>
                    {selectedSpeaker ? (
                        <div className="flex items-center justify-between gap-5">
                            <div className="mt-2 flex items-center gap-4 font-light">
                                <img src={selectedSpeaker.image} alt={selectedSpeaker.name} className="size-10 rounded-full object-cover shadow-md" />
                                <span>{selectedSpeaker.name}</span>
                            </div>

                            <Button
                                variant="outline"
                                className="w-fit"
                                onClick={() => {
                                    setSelectedSpeaker(undefined);
                                    setData('speaker_id', null);
                                }}
                            >
                                Outro Palestrante?
                            </Button>
                        </div>
                    ) : (
                        <>
                            <SpeakerSearchInput onSetData={setData} onSetSelectedSpeaker={setSelectedSpeaker} speakers={speakers}>
                                <AddSpeakerDialog onSetSelectedSpeaker={setSelectedSpeaker} onSetData={setData} />
                            </SpeakerSearchInput>
                            <InputError className="mt-2" message={errors.speaker} />
                        </>
                    )}
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-8 gap-2">
                        <div className="col-span-4">
                            <Label htmlFor="title">Título</Label>

                            <Input
                                id="title"
                                className="mt-1 block w-full"
                                value={data.title || ''}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="Título da Palestra"
                            />

                            <InputError className="mt-2" message={errors.title} />
                        </div>

                        <div className="relative col-span-2 flex flex-col gap-[14px]">
                            <div className="flex gap-2">
                                <Label>Sala</Label>
                                <div id="portal-root"></div>
                            </div>

                            <RoomDropdown rooms={rooms} onSetData={setData} data={data}>
                                <SelectValue className="flex w-full justify-between" placeholder="Sala" />
                            </RoomDropdown>
                            <InputError className="mt-2" message={errors.room_number} />
                        </div>

                        <div className="col-span-2 flex flex-col gap-[14px]">
                            <Label>Tipo</Label>

                            <TypeDropdown onSetData={setData} defaultValue={data.type}>
                                <SelectValue className="w-full" placeholder="Categoria" />
                            </TypeDropdown>
                            <InputError className="mt-2" message={errors.type} />
                        </div>
                    </div>

                    <div>
                        <div className="grid grid-cols-8 gap-2">
                            <div className="col-span-4">
                                <Label htmlFor="data">Data</Label>
                                <DatePicker onSetData={setData} defaultDate={lecture.date} />
                                <InputError className="mt-2" message={errors.date} />
                            </div>

                            {/* Das */}
                            <div className="col-span-2">
                                <TimeSelectorGroup onSetData={setData} defaultValue={data.starts} />
                                <InputError className="mt-2" message={errors.starts} />
                            </div>

                            {/* às */}
                            <div className="col-span-2">
                                <TimeSelectorGroup onSetData={setData} variant="ends" defaultValue={data.ends} />
                                <InputError className="mt-2" message={errors.ends} />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button disabled={processing}>Atualizar</Button>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-neutral-600">Atualizado</p>
                        </Transition>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
export default EditLectureForm;
