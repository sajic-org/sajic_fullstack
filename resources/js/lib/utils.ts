import { Lecture } from '@/types/models';
import { router } from '@inertiajs/react';
import { type ClassValue, clsx } from 'clsx';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function now() {
    return Date.now();
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
