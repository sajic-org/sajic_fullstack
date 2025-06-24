import { Lecture, Room, User } from '@/types/models';
import { router } from '@inertiajs/react';
import { type ClassValue, clsx } from 'clsx';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function now() {
    return new Date();
}

export function isRoomAvailable({
    room,
    date,
    starts,
    ends,
}: {
    room: Room;
    date: string;
    starts: string;
    ends: string;
}): boolean {
    if (room.lectures) {
        const sameDateLectures = room.lectures.filter(
            (lecture) => lecture.date === date,
        );

        for (const lecture of sameDateLectures) {
            if (starts < lecture.ends && lecture.starts < ends) {
                return false;
            }
        }
    }

    return true;
}

export function lecturesConflicting({
    room,
    date,
    starts,
    ends,
}: {
    room: Room | undefined;
    date: string;
    starts: string;
    ends: string;
}): Lecture[] {
    if (!room) {
        return [];
    }

    const sameDateLectures = room.lectures!.filter(
        (lecture) => lecture.date === date,
    );

    const arr = [];
    for (const lecture of sameDateLectures) {
        if (starts < lecture.ends && lecture.starts < ends) {
            arr.push(lecture);
        }
    }

    return arr;
}

export function isUserAlreadyEnrolledAtThatTime(
    user: User,
    lectureToBeJoined: Lecture,
): Lecture[] {
    const sameDateLectures = user.lectures!.filter(
        (lecture: Lecture) => lecture.date === lectureToBeJoined.date,
    );

    const arr = [];
    for (const lecture of sameDateLectures) {
        if (
            lectureToBeJoined.starts < lecture.ends &&
            lecture.starts < lectureToBeJoined.ends
        ) {
            arr.push(lecture);
        }
    }

    return arr;
}

export function subscribe(lecture: Lecture) {
    router.post(
        route('user.attend-lecture'),
        { id: lecture.id },
        {
            preserveScroll: true,
            onSuccess: () => {
                toast('Inscrição realizada!', {
                    // dar a opcao de cancelar
                    description: `Você agora está inscrito na palestra "${lecture.title}"`,
                    action: {
                        label: 'Cancelar',
                        onClick: () => unsubcribe(lecture),
                    },
                });
            },
            onError: (errors) => {
                toast.error('Erro ao se inscrever.');
                console.error(errors);
            },
        },
    );
}

export function unsubcribe(lecture: Lecture) {
    router.post(
        route('user.leave-lecture'),
        { id: lecture.id },
        {
            preserveScroll: true,
            onSuccess: () => {
                toast('Pronto!', {
                    description: `Você não está mais inscrito na palestra "${lecture.title}"`,
                });
            },
            onError: (errors) => {
                toast.error('Erro ao se desenscrever.');
                console.error(errors);
            },
        },
    );
}
