import { Lecture } from '@/types/models';
import { Link } from '@inertiajs/react';
import { ListChecks, SquarePen } from 'lucide-react';

interface props {
    lecture: Lecture;
}

function AdminButtons({ lecture }: props) {
    return (
        <div className="flex gap-1">
            <Link href={route('lectures.edit', { lecture: lecture })}>
                <button className="size-10 cursor-pointer rounded-md bg-orange-400 text-white hover:bg-orange-400 hover:brightness-85">
                    <SquarePen className="m-auto size-5" />
                </button>
            </Link>

            <Link href={route('lectures.attendant_table', { lecture: lecture })}>
                <button className="size-10 cursor-pointer rounded-md bg-orange-400 text-white hover:bg-orange-400 hover:brightness-85">
                    <ListChecks className="m-auto size-5.5" />
                </button>
            </Link>
        </div>
    );
}

export default AdminButtons;
