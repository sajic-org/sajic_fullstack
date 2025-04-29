import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Lecture, User } from '@/types/models';
import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';

function CheckIn({ lecture }: { lecture: Lecture }) {
    const page = usePage<SharedData>();
    const { auth } = page.props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Palestras',
            href: '/palestras',
        },
        {
            title: `Admin ${auth.user.name.split(' ', 1)}`,
            href: route('user.lectures'),
        },
        {
            title: 'Check in',
            href: '#',
        },
    ];

    const [checked, setChecked] = useState([]);

    useEffect(() => {
        console.log(checked);
        setData('user_ids', checked);
    }, [checked]);

    function handleChecking(id) {
        if (checked.includes(id)) {
            setChecked(checked.filter((number) => number !== id));
        } else {
            setChecked([...checked, id]);
        }
    }

    const { setData, patch } = useForm();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('lectures.check-in', { lecture: lecture }), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <main className="mx-auto px-6 pt-10 md:max-w-7xl">
                <h1 className="text-2xl font-bold">Check In</h1>
                <p>Verifique a presença dos inscritos para que possam receber certificados</p>
                <div>
                    <img src={lecture.speaker?.image} />
                </div>

                <form action="" onSubmit={submit}>
                    <Button type="submit">Salvar</Button>
                    <ul className="w-full">
                        {lecture.attendants?.map((a: User) => {
                            return (
                                <li className="flex max-w-7xl justify-between" key={`checkbox-${a.id}`}>
                                    <span>{a.name}</span>
                                    <span>{a.email}</span>
                                    <input type="checkbox" id={`checkbox-${a.id}`} onClick={() => handleChecking(a.id)} />
                                </li>
                            );
                        })}
                    </ul>
                </form>
            </main>
        </AppLayout>
    );
}

export default CheckIn;
