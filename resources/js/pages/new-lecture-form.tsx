import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';

import { Transition } from '@headlessui/react';

import { DatePicker } from '@/components/date-picker';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { RadioGroupDropdown } from '@/components/radio-group-dropdown';
import SpeakerSearchInput from '@/components/speaker-search-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowDownNarrowWide } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

function NewLectureForm({ speakers, rooms }) {
    const page = usePage<SharedData>();
    const { auth } = page.props;

    // Cópia do profile settings modificada visualmente, funcionalidades precisam ser adaptadas
    interface LectureForm {
        speaker_id: number;
        room_number: string;
        title: string;
        type: string;
        date: Date;
        starts: string;
        ends: string;
    }

    const [selectedSpeaker, setSelectedSpeaker] = useState();

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm<Required<LectureForm>>();

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

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        setData('speaker_id', selectedSpeaker.id);
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

                <form onSubmit={submit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Palestrante</Label>
                        {selectedSpeaker ? (
                            <div className="flex items-center gap-5">
                                <div className="flex gap-2">
                                    <img src={selectedSpeaker.img} alt={selectedSpeaker.name} className="rounded-full" />
                                    <span className="font-medium">{selectedSpeaker.name}</span>
                                </div>

                                <Button variant="outline" className="w-fit" onClick={() => setSelectedSpeaker(null)}>
                                    Outro Palestrante?
                                </Button>
                            </div>
                        ) : (
                            <SpeakerSearchInput onSetData={setData} onSetSelectedSpeaker={setSelectedSpeaker} speakers={speakers} />
                        )}
                    </div>

                    <div className="grid grid-cols-5 gap-2">
                        <div className="col-span-3">
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

                            <RadioGroupDropdown rooms={rooms} onSetData={setData}>
                                <div className="w-full text-left">{data.room_number}</div>
                                <ArrowDownNarrowWide className="ml-auto" />
                            </RadioGroupDropdown>
                        </div>
                    </div>

                    <div>
                        <div className="grid gap-2 md:grid-cols-3">
                            <div>
                                <Label htmlFor="email">Data</Label>
                                <DatePicker />
                            </div>
                            <div>
                                {/* Step = 1, o motivo do formato ser --:--:-- -> garante que o input aceitará o formato 24h e não dependerá das configurações do navegador */}
                                <Label htmlFor="email">Das</Label>
                                <Input
                                    id="from"
                                    type="time"
                                    step={1}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('from', e.target.value)}
                                    required
                                    placeholder="Das"
                                />
                            </div>
                            <div>
                                <Label htmlFor="email">Às</Label>
                                <Input
                                    id="to"
                                    type="time"
                                    step={1}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('to', e.target.value)}
                                    required
                                    placeholder="Às"
                                />
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
