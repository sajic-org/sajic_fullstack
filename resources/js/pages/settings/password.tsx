import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useEffect, useRef, useState } from 'react';

import { CoursesDropdown } from '@/components/CoursesDropdown';
import HeadingSmall from '@/components/heading-small';
import { SemesterDropdown } from '@/components/SemesterDropdown';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Password() {
    const page = usePage<SharedData>();
    const { auth } = page.props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `${auth.user.name.split(' ', 1)}`,
            href: '#',
        },
        {
            title: 'Password settings',
            href: '/configuracoes',
        },
    ];

    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
        is_unisenac_student: false,
        course: '',
        semester: '',
    });

    const [isUnisenacStudent, setIsUnisenacStudent] = useState<boolean>(data.course || data.semester ? true : false);

    useEffect(() => {
        if (!isUnisenacStudent) {
            setData({
                ...data,
                course: '',
                semester: '',
            });
        }
    }, [isUnisenacStudent]);

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    const cursos = ['ADS', 'MKT', 'PG', 'Redes', 'Outro'];
    const semestres = ['1', '2', '3', '4', '5', '6', '7', '8', '8+'];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />

            <SettingsLayout>
                <div className="w-full space-y-6">
                    <div>
                        <div className="flex items-center gap-2">
                            <Input
                                id="alunoUnisenac"
                                type="checkbox"
                                checked={isUnisenacStudent}
                                onChange={(e) => setIsUnisenacStudent(e.target.checked)}
                                disabled={processing}
                                className="max-w-4"
                            />
                            <Label htmlFor="alunoUnisenac">Aluno UniSenac</Label>
                        </div>
                        {isUnisenacStudent && (
                            <div className="flex space-x-2">
                                <div>
                                    <CoursesDropdown
                                        courses={cursos}
                                        value={data.course}
                                        onValueChange={(value: string) => setData('course', value)}
                                    />
                                </div>

                                {data.course && data.course != 'Outro' ? (
                                    <div>
                                        <SemesterDropdown
                                            semesters={semestres}
                                            value={data.semester}
                                            onValueChange={(value) => setData('semester', value)}
                                        />
                                        <InputError message={errors.semester} />
                                    </div>
                                ) : (
                                    ''
                                )}
                            </div>
                        )}
                    </div>
                    <HeadingSmall
                        title="Atualizar Senha"
                        description="Certifique-se que sua conta esta usando uma senha longa e aleatória para manter-se seguro"
                    />

                    <form onSubmit={updatePassword} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="current_password">Senha Atual</Label>

                            <Input
                                id="current_password"
                                ref={currentPasswordInput}
                                value={data.current_password}
                                onChange={(e) => setData('current_password', e.target.value)}
                                type="password"
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                placeholder="Senha Atual"
                            />

                            <InputError message={errors.current_password} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">Nova Senha</Label>

                            <Input
                                id="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                type="password"
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                placeholder="Nova Senha"
                            />

                            <InputError message={errors.password} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">Confirmar Senha</Label>

                            <Input
                                id="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                type="password"
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                placeholder="Confirmar Senha"
                            />

                            <InputError message={errors.password_confirmation} />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Salvar Senha</Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Salvo</p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
