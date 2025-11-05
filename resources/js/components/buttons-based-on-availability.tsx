import { unsubcribe } from '@/lib/utils';
import { Lecture, User } from '@/types/models';
import { Link } from '@inertiajs/react';
import { Check, CircleOff, CircleX, GraduationCap } from 'lucide-react';
import ParticipateDialog from './participate-dialog';
import { Button } from './ui/button';

interface Props {
    isFull: boolean;
    lecture: Lecture;
    user: User | undefined;
}

function ButtonBasedOnAvailability({ isFull, lecture, user }: Props) {
    const buttonBaseClass =
        'h-10 w-36 flex cursor-pointer items-center justify-center gap-3 rounded-md font-semibold sm:gap-2';

    if (!user) {
        return (
            <Link href={route('login')}>
                <Button
                    className={`${buttonBaseClass} bg-primary-blue hover:bg-primary-blue shadow-md hover:brightness-85`}
                >
                    Participar
                    <GraduationCap className="size-5.5" />
                </Button>
            </Link>
        );
    }

    const userLecture = user.lectures.find(
        (userLecture) => lecture.id === userLecture.id,
    );

    if (!userLecture) {
        if (!isFull || lecture.is_open_for_enrollment) {
            return (
                <ParticipateDialog
                    lecture={lecture}
                    user={user}
                >
                    <a
                        className={`${buttonBaseClass} bg-primary-blue hover:bg-primary-blue text-white hover:brightness-85`}
                    >
                        Participar
                        <GraduationCap className="size-5.5" />
                    </a>
                </ParticipateDialog>
            );
        } else {
            return (
                <Button
                    disabled
                    className={`${buttonBaseClass} text-light-text bg-gray-300`}
                >
                    Esgotado
                    <CircleOff className="size-5" />
                </Button>
            );
        }
    } else if (userLecture.lecture_attendances?.showed_up) {
        return (
                <Button
                    disabled
                    className={`${buttonBaseClass} bg-green-500`}
                >
                    Participado
                    <Check className="size-5" />
                </Button>
        );
    } else {
        return (
            <Button
                className={`${buttonBaseClass} bg-red-600 hover:bg-red-600 hover:brightness-85`}
                onClick={() => unsubcribe(lecture)}
            >
                Cancelar
                <CircleX className="size-5.5" />
            </Button>
        );
    }
}

export default ButtonBasedOnAvailability;
