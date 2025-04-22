import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Lecture, User } from '@/types/models';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: '/',
    },
    {
        title: 'Check in',
        href: '#',
    },
];

function CheckIn({ lecture }: { lecture: Lecture; }) {
    console.log(lecture);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <header className='pt-10'>
                <h1 className='text-2xl font-bold'>
                    Check In
                </h1>
                <p>
                    Verifique a presença dos inscritos para que possam receber certificados
                </p>
                <div>
                    <img src={lecture.speaker?.image}  />
                </div>
            </header>
        </AppLayout>
    );
}

export default CheckIn;
