import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Lecture } from '@/types/models';

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
            <div className='flex justify-around pt-10 flex-wrap'>
                <header>
                    <h1 className='text-2xl font-bold'>
                        Check In
                    </h1>
                    <p>
                        Verifique a presença dos inscritos para que possam receber certificados
                    </p>
                    <div className='flex gap-4 items-center pt-4'>
                        <img
                            className='w-30 h-30 rounded-2xl'
                            src="/assets/edecio.jpeg"
                        />

                        <div>
                            <h2 className='text-lg font-semibold'>
                                {lecture.title}
                            </h2>
                            <p>com {" "}
                                <span className='text-primary-blue'>
                                    {lecture.speaker?.name}
                                </span>
                            </p>
                        </div>
                    </div>
                </header>

                <Button
                    className="bg-primary-blue flex h-12 w-32 items-center gap-3 rounded-lg px-9 py-3.5 text-lg text-white shadow-lg drop-shadow-md"
                >
                    Salvar
                </Button>
            </div>

        </AppLayout>
    );
}

export default CheckIn;
