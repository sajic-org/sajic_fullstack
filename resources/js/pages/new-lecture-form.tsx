import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';

import { Transition } from '@headlessui/react';

import { DatePicker } from '@/components/date-picker';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Room, RoomDropdown } from '@/components/RoomDropdown';
import SpeakerSearchInput from '@/components/speaker-search-input';
import TimeSelector from '@/components/time-selector';
import { TypeDropdown } from '@/components/TypeDropdown';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SelectValue } from '@/components/ui/select';
import { Speaker } from '@/types/models';
import { FormEventHandler, useState } from 'react';

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
    const [starts, setStarts] = useState(['00', '00']);
    const [ends, setEnds] = useState(['00', '00']);

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
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nova Palestra" />

            <div className="mx-auto mb-20 space-y-6 px-4 pt-12 md:w-2/3">
                <HeadingSmall title="Nova Palestra" description="Publique aqui novas palestras" />

                <div className="grid gap-2">
                    <Label htmlFor="title">Palestrante</Label>
                    {selectedSpeaker ? (
                        <div className="flex items-center justify-between gap-5">
                            <div className="mt-2 flex items-center gap-4 font-light">
                                <img src={selectedSpeaker.image} alt={selectedSpeaker.name} className="size-10 rounded-full" />
                                <span>{selectedSpeaker.name}</span>
                            </div>

                            <Button variant="outline" className="w-fit" onClick={() => setSelectedSpeaker(undefined)}>
                                Outro Palestrante?
                            </Button>
                        </div>
                    ) : (
                        <SpeakerSearchInput onSetData={setData} onSetSelectedSpeaker={setSelectedSpeaker} speakers={speakers} />
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
                                required
                                placeholder="Título da Palestra"
                            />

                            <InputError className="mt-2" message={errors.title} />
                        </div>

                        <div className="col-span-2 flex flex-col gap-[14px]">
                            <Label>Sala</Label>

                            <RoomDropdown rooms={rooms} onSetData={setData}>
                                <SelectValue className="w-full" placeholder="Sala" />
                            </RoomDropdown>
                        </div>

                        <div className="col-span-2 flex flex-col gap-[14px]">
                            <Label>Tipo</Label>

                            <TypeDropdown onSetData={setData}>
                                <SelectValue className="w-full" placeholder="Categoria" />
                            </TypeDropdown>
                        </div>
                    </div>

                    <div>
                        <div className="grid grid-cols-8 gap-2">
                            <div className="col-span-4">
                                <Label htmlFor="data">Data</Label>
                                <DatePicker onSetData={setData} />
                            </div>

                            {/* Das */}
                            <div className="col-span-2">
                                <Label htmlFor="starts">Das</Label>

                                <div className="flex items-center gap-1 pt-1">
                                    {/* Horas */}
                                    <TimeSelector
                                        maxNum={23}
                                        placeholder="hh"
                                        label="Horas"
                                        time={starts}
                                        onSetTime={setStarts}
                                        variant="hour"
                                        minNum={8}
                                    />

                                    <span className="text-xl">:</span>

                                    {/* Minutos */}
                                    <TimeSelector step={15} placeholder="mm" label="Minutos" time={starts} onSetTime={setStarts} variant="min" />
                                </div>
                            </div>

                            {/* às */}
                            <div className="col-span-2">
                                <Label htmlFor="ends">Às</Label>

                                <div className="flex items-center gap-1 pt-1">
                                    {/* Horas */}
                                    <TimeSelector
                                        maxNum={23}
                                        minNum={8}
                                        placeholder="hh"
                                        label="Horas"
                                        time={ends}
                                        onSetTime={setEnds}
                                        variant="hour"
                                    />

                                    <span className="text-xl">:</span>

                                    {/* Minutos */}
                                    <TimeSelector step={15} placeholder="mm" label="Minutos" time={ends} onSetTime={setEnds} variant="min" />
                                </div>
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
