import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';

import { Transition } from '@headlessui/react';

import { DatePicker } from '@/components/date-picker';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import SpeakerSearchInput from '@/components/speaker-search-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormEventHandler } from 'react';

function NewLectureForm() {
    // Cópia do profile settings modificada visualmente, funcionalidades precisam ser adaptadas

    const page = usePage<SharedData>();
    // const { auth } = page.props;

    interface ProfileForm {
        // name: string;
        // email: string;
    }

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<Required<ProfileForm>>({
        // name: auth.user.name,
        // email: auth.user.email,
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Palestras',
            href: '/palestras',
        },
        {
            title: 'Nova Palestra',
            href: '/nova-palestra',
        },
    ];

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // patch(route('profile.update'), {
        //     preserveScroll: true,
        // });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nova Palestra" />

            <div className="mx-auto mb-20 space-y-6 px-4 pt-12 md:w-2/3">
                <HeadingSmall title="Nova Palestra" description="Publique aqui novas palestras" />

                <form onSubmit={submit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Palestrante</Label>
                        <SpeakerSearchInput data={data} onSetData={setData} />
                    </div>

                    <div className="grid gap-2">
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

                    <div>
                        <div className="grid gap-2 md:grid-cols-3">
                            <div>
                                <Label htmlFor="email">Data</Label>
                                <DatePicker />
                            </div>
                            <div>
                                {/* Step = 1, o motivo do formato ser --:--:-- está servindo para garantir que o input aceitará o formato 24h e não dependerá das configurações do navegador */}
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

                        <InputError className="mt-2" message={errors.email} />
                        <InputError className="mt-2" message={errors.email} />
                        <InputError className="mt-2" message={errors.email} />
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
