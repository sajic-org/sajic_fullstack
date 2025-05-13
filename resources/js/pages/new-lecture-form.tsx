import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';

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
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';

export interface LectureForm {
    speaker_id: number;
    room_number: string;
    title: string;
    type: string;
    date: Date;
    starts: string;
    ends: string;
    [key: string]: any | unknown;
}

function NewLectureForm({ speakers, rooms }: { speakers: Speaker[]; rooms: Room[] }) {
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
        console.log(data);

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

            <div className="mx-auto mb-20 space-y-6 px-4 pt-12 sm:px-6 md:w-2/3">
                <HeadingSmall title="Nova Palestra" description="Publique aqui novas palestras" />

                <div className="grid gap-2">
                    <Label htmlFor="title">Palestrante</Label>
                    {selectedSpeaker ? (
                        <div className="flex items-center justify-between gap-5">
                            <div className="mt-2 flex items-center gap-4 font-light">
                                <img src={selectedSpeaker.image} alt={selectedSpeaker.name} className="size-10 rounded-full object-cover shadow-md" />
                                <span>{selectedSpeaker.name}</span>
                            </div>

                            <Button variant="outline" className="w-fit" onClick={() => setSelectedSpeaker(undefined)}>
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
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="Título da Palestra"
                            />

                            <InputError className="mt-2" message={errors.title} />
                        </div>

                        <div className="relative col-span-2 flex flex-col gap-[14px]" id="portal-root">
                            <Label>Sala</Label>

                            <RoomDropdown rooms={rooms} onSetData={setData}>
                                <SelectValue className="w-full" placeholder="Sala" />
                            </RoomDropdown>
                            <InputError className="mt-2" message={errors.room_number} />
                        </div>

                        <div className="col-span-2 flex flex-col gap-[14px]">
                            <Label>Tipo</Label>

                            <TypeDropdown onSetData={setData}>
                                <SelectValue className="w-full" placeholder="Categoria" />
                            </TypeDropdown>
                            <InputError className="mt-2" message={errors.type} />
                        </div>
                    </div>

                    <div>
                        <div className="grid grid-cols-8 gap-2">
                            <div className="col-span-4">
                                <Label htmlFor="data">Data</Label>
                                <DatePicker onSetData={setData} />
                                <InputError className="mt-2" message={errors.date} />
                            </div>

                            {/* Das */}
                            <div className="col-span-2">
                                <TimeSelectorGroup onSetData={setData} />
                                <InputError className="mt-2" message={errors.starts} />
                            </div>

                            {/* às */}
                            <div className="col-span-2">
                                <TimeSelectorGroup onSetData={setData} variant="ends" />
                                <InputError className="mt-2" message={errors.ends} />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button disabled={processing}>Publicar</Button>

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
