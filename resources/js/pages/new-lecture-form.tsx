import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';

import { Transition } from '@headlessui/react';

import AddSpeakerDialog from '@/components/add-speaker-dialog';
import { DatePicker } from '@/components/date-picker';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { RoomDropdown } from '@/components/RoomDropdown';
import SpeakerSearchInput from '@/components/speaker-search-input';
import { TimeSelectorGroup } from '@/components/time-selector';
import { TypeDropdown } from '@/components/TypeDropdown';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SelectValue } from '@/components/ui/select';
import { Room, Speaker } from '@/types/models';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';

export interface LectureForm {
    speaker_id: number | null;
    room_number: string;
    title: string;
    type: string;
    date: string;
    starts: string;
    ends: string;

    //error message
    speaker: string;
}

interface Props {
    speakers: Speaker[];
    rooms: Room[]
}

function NewLectureForm({ speakers, rooms }: Props) {
    const page = usePage<SharedData>();
    const { auth } = page.props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `Admin ${auth.user.name.split(' ', 1)}`,
            href: route('user.lectures'),
        },
        {
            title: 'Nova Palestra',
            href: '/nova-palestra',
        },
    ];

    const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker>();

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm<Required<LectureForm>>();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('lectures.store'), {
            preserveScroll: true,
            onSuccess: () => {
                toast('Inscrição realizada!', {
                    description: `Palestra "${data.title}" adicionada!`,
                });
            },
            onError: (errors) => {
                toast.error('Erro ao criar palestra.');
                console.error(errors);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nova Palestra" />

            <div className="mx-auto mb-20 w-full space-y-4 px-4 pt-12 sm:px-6 md:w-9/12 lg:w-2/3">
                <HeadingSmall title="Nova Palestra" description="Publique aqui novas palestras" />

                <div className="mt-7 grid gap-2">
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

                <form onSubmit={submit}>
                    <div className="grid grid-cols-8 space-y-4 space-x-2">
                        <div className="col-span-8 sm:col-span-4">
                            <Label htmlFor="title">Título</Label>

                            <Input
                                id="title"
                                className="mt-1 block w-full"
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="Título da Palestra"
                            />

                            <InputError className="mt-2" message={errors.title} />
                        </div>

                        <div className="relative col-span-4 flex flex-col gap-[14px] sm:col-span-2">
                            <div className="flex gap-2">
                                <Label>Sala</Label>
                                <div id="portal-root"></div>
                            </div>

                            <RoomDropdown rooms={rooms} onSetData={setData} data={data}>
                                <SelectValue className="flex w-full justify-between" placeholder="Sala" />
                            </RoomDropdown>
                            <InputError className="mt-2" message={errors.room_number} />
                        </div>

                        <div className="col-span-4 flex flex-col gap-[14px] sm:col-span-2">
                            <Label>Tipo</Label>

                            <TypeDropdown onSetData={setData} defaultValue={data.type}>
                                <SelectValue className="w-full" placeholder="Categoria" />
                            </TypeDropdown>
                            <InputError className="mt-2" message={errors.type} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 space-y-4 space-x-2">
                        <div className="col-span-2 md:col-span-1">
                            <Label htmlFor="data">Data</Label>
                            <DatePicker onSetData={setData} />
                            <InputError className="mt-2" message={errors.date} />
                        </div>

                        <div className="col-span-2 flex flex-wrap gap-2 sm:flex-nowrap md:col-span-1">
                            {/* Das */}
                            <div className="w-full sm:w-1/2">
                                <TimeSelectorGroup onSetData={setData} />
                                <InputError className="mt-2" message={errors.starts} />
                            </div>

                            {/* às */}
                            <div className="w-full sm:w-1/2">
                                <TimeSelectorGroup onSetData={setData} variant="ends" />
                                <InputError className="mt-2" message={errors.ends} />
                            </div>
                        </div>
                    </div>

                    <div className="mt-7 ml-auto flex w-fit items-center gap-4">
                        <Button disabled={processing} className="px-8 py-5 text-base font-semibold">
                            Publicar
                        </Button>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-neutral-600">Publicado</p>
                        </Transition>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
export default NewLectureForm;
