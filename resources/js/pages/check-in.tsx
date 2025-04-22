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

function CheckIn({ lecture, users = [] }: { lecture: Lecture; users?: User[] }) {
    console.log(lecture, '\n', users);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div>cuuuuuuuuuuuu</div>
        </AppLayout>
    );
}

export default CheckIn;
