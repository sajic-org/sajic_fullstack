import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
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

    //Enquanto não tem a logica funcionando eu criei esses arrays
    const cursos = [
        {
            name: 'Analise e desenvolvimentos de sistemas',
            abv: 'ADS',
        },
        {
            name: 'Marketing',
            abv: 'MKT',
        },
        {
            name: 'Processos Gerenciais',
            abv: 'PG',
        },
    ];

    const semestres = [
        {
            num: 1,
        },
        {
            num: 2,
        },
        {
            num: 3,
        },
        {
            num: 4,
        },
        {
            num: 5,
        },
        {
            num: 6,
        },
    ];

    const radioSemestres = semestres.map((semestre) => {
        return (
            <div className="mt-2 ml-6 flex items-center gap-2">
                <Input
                    className="w-3.5"
                    id={`${semestre.num}sem`}
                    name="semestre"
                    type="radio"
                    value={semestre.num}
                    onChange={(e) => setData('semestre', e.target.value)}
                    disabled={processing}
                />
                <Label htmlFor="scholarship">{semestre.num} semestre</Label>
            </div>
        );
    });

    const radioCursos = cursos.map((curso) => {
        return (
            <div className="mt-2 ml-6 flex items-center gap-2">
                <Input
                    className="w-3.5"
                    id={curso.abv}
                    name="curso"
                    type="radio"
                    value={curso.name}
                    onChange={(e) => setData('curso', e.target.value)}
                    disabled={processing}
                />
                <Label htmlFor="scholarship">{curso.name}</Label>
            </div>
        );
    });

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
                                checked={data.is_unisenac_student}
                                onChange={(e) => setData('is_unisenac_student', e.target.checked)}
                                disabled={processing}
                                className="max-w-4"
                            />
                            <Label htmlFor="alunoUnisenac">Aluno UniSenac?</Label>
                        </div>
                        {data.is_unisenac_student && (
                            <>
                                <div className="flex flex-col">
                                    <Label className="mb-1 block text-sm font-semibold">Selecione seu curso: </Label>
                                    {radioCursos}
                                </div>
                                {data.curso && (
                                    <>
                                        <div className="ml-5 flex flex-col">
                                            <Label className="mb-1 block text-sm font-semibold">Selecione seu semestre: </Label>
                                            {radioSemestres}
                                        </div>
                                    </>
                                )}
                            </>
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
