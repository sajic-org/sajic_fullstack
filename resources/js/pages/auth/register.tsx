import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';

import { CoursesDropdown } from '@/components/CoursesDropdown';
import InputError from '@/components/input-error';
import { SemesterDropdown } from '@/components/SemesterDropdown';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    course: string;
    semester: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
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
    }, [!isUnisenacStudent]);

    const cursos = ['ADS', 'MKT', 'PG', 'REDES', 'OUTRO'];
    const semestres = ['1', '2', '3', '4', '5', '6', '7', '8', '8+'];

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Criar uma Conta" description="Insira seus detalhes abaixo para criar uma conta">
            <Head title="Register" />
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            placeholder="Nome Completo"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Endereço de E-mail</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            tabIndex={2}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="e-mail@exemplo.com.br"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Senha</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={3}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Senha"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Confirmar Senha</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            tabIndex={4}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="Confirmar Senha"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

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
                                    <InputError message={errors.course} />
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

                    <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Criar Conta
                    </Button>
                </div>

                <div className="text-muted-foreground text-center text-sm">
                    Já tem uma conta?{' '}
                    <TextLink href={route('login')} tabIndex={6}>
                        Login
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}
