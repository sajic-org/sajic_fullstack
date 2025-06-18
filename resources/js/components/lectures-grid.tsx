import { cn, unsubcribe } from '@/lib/utils';
import { Lecture, User } from '@/types/models';
import { Link } from '@inertiajs/react';
import { ArrowUpRight, CircleOff, CircleX, GraduationCap, ListChecks, SquarePen } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import ParticipateDialog from './participate-dialog';
import SpeakerDialog from './speaker-drawer';

export const LecturesGrid = ({ className, children }: { className?: string; children?: React.ReactNode }) => {
    return <div className={cn('mx-auto my-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:max-w-7xl lg:grid-cols-3', className)}>{children}</div>;
};

export function ButtonBasedOnAvailability({ isFull, lecture, user }: { isFull: boolean; lecture: Lecture; user: User }) {
    return (
        <>
            {!isFull || lecture.is_open_for_enrollment ? (
                <ParticipateDialog lecture={lecture} user={user}>
                    <button className="bg-primary-blue flex cursor-pointer items-center gap-3 rounded-md px-4 py-2.5 font-medium text-white sm:gap-2">
                        Participar
                        <GraduationCap className="size-5.5" />
                    </button>
                </ParticipateDialog>
            ) : (
                <button className="text-light-text mb-1 flex cursor-pointer items-center rounded-md bg-gray-300 px-4 py-2.5 font-medium sm:gap-2">
                    Esgotado <CircleOff className="size-5" />
                </button>
            )}
        </>
    );
}

export const LecturesGridItem = ({ className, lecture, user }: { className?: string; lecture: Lecture; user?: User }) => {
    const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

    //Precisa ter useEffect pq o elemento que abre o dialog renderiza antes doq
    //o div onde fica o nome do palestrante (e tem o ID)
    useEffect(() => {
        const container = document.getElementById(lecture.id.toString());
        setPortalElement(container);
    }, [lecture.id]);

    return (
        <div
            className={cn(
                'group/bento shadow-input max row-span-1 mx-auto flex w-full flex-col justify-between space-y-2 rounded-xl border border-transparent bg-white p-4 text-start text-neutral-600 shadow-md transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none',
                className,
            )}
        >
            <div className="flex items-start justify-between transition duration-200 group-hover/bento:translate-x-2">
                <SpeakerDialog speaker={lecture.speaker}>
                    <div className="relative h-32 w-32 overflow-hidden rounded-xl">
                        <img
                            src={lecture.speaker?.image}
                            alt={lecture.speaker?.name}
                            className="h-full w-full cursor-pointer object-cover transition duration-400 ease-in-out hover:brightness-60"
                        />
                        <div
                            className="pointer-events-none absolute inset-0 rounded-xl"
                            style={{
                                background: 'linear-gradient(135deg, transparent 60%, rgba(255,255,255,0.1) 70%, rgba(0,0,0,0.4) 100%)',
                                boxShadow: 'inset -20px -20px 20px rgba(0,0,0,0.2)',
                            }}
                        >
                            <div
                                className="absolute right-1.5 bottom-1.5 flex h-6 w-6 items-center justify-center rounded-full"
                                style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}
                            >
                                <ArrowUpRight size={14} strokeWidth={2} color="#FFFFFF" />
                            </div>
                        </div>

                        {/* O nome do palestrante é enviado para baixo */}
                        {portalElement && createPortal(<span>{lecture.speaker?.name}</span>, portalElement)}
                    </div>
                </SpeakerDialog>

                <div className="flex flex-col items-end gap-1">
                    {user && user.lectures.some((userLecture: Lecture) => userLecture.id === lecture.id) ? (
                        <button
                            className="text-md flex cursor-pointer items-center gap-3 rounded-md bg-red-600 px-4.5 py-2.5 font-semibold text-white sm:gap-2"
                            onClick={() => unsubcribe(lecture)}
                        >
                            Cancelar
                            <CircleX className="size-5.5" />
                        </button>
                    ) : (
                        user && <ButtonBasedOnAvailability isFull={lecture.n_attendees >= lecture.room?.capacity} lecture={lecture} user={user} />
                    )}

                    {user?.is_admin ? (
                        <div className="flex gap-1">
                            <Link href={route('lectures.edit', { lecture: lecture })}>
                                <button className="size-10 cursor-pointer rounded-md bg-orange-400 text-white">
                                    <SquarePen className="m-auto size-5" />
                                </button>
                            </Link>

                            <Link href={route('lectures.attendant_table', { lecture: lecture })}>
                                <button className="size-10 cursor-pointer rounded-md bg-orange-400 text-white">
                                    <ListChecks className="m-auto size-5.5" />
                                </button>
                            </Link>
                        </div>
                    ) : (
                        ''
                    )}
                </div>

                {!user && (
                    <Link href={route('login')}>
                        <button className="bg-primary-blue flex cursor-pointer items-center gap-3 rounded-md px-4 py-2.5 font-medium text-white shadow-md sm:gap-2">
                            Participar
                            <GraduationCap className="size-5.5" />
                        </button>
                    </Link>
                )}
            </div>

            <div className="flex h-full flex-col justify-between transition duration-200 group-hover/bento:translate-x-2 dark:text-neutral-200">
                <div className="mt-2 mb-auto text-lg font-bold">{lecture.title}</div>
                <div>
                    <div className="font-normal">
                        com{' '}
                        <span id={lecture.id.toString()} className="text-primary-blue cursor-pointer font-medium capitalize hover:underline">
                            {/*
                            O nome do palestrante tá vindo do portal dentro do trigger do speakerdialog...
                            nesse arquivo, aqui em cima
                            */}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Sala {lecture.room_number}</span>

                        <span className="text-sm font-medium">
                            {lecture.date}, {lecture.starts} - {lecture.ends}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
