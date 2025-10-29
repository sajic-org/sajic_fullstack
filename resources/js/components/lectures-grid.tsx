import { cn } from '@/lib/utils';
import { Lecture, User } from '@/types/models';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import AdminButtons from './admin-buttons';
import ButtonBasedOnAvailability from './buttons-based-on-availability';
import SpeakerDialog from './speaker-drawer';

export const LecturesGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                'mx-auto my-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:max-w-7xl lg:grid-cols-3',
                className,
            )}
        >
            {children}
        </div>
    );
};

export const LecturesGridItem = ({
    className,
    lecture,
    user,
}: {
    className?: string;
    lecture: Lecture;
    user?: User;
}) => {
    const [portalElement, setPortalElement] = useState<HTMLElement | null>(
        null,
    );

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
                {(() => {
                    const speakers =
                        Array.isArray((lecture as any).speakers) &&
                        (lecture as any).speakers.length > 0
                            ? (lecture as any).speakers
                            : lecture.speaker
                              ? [lecture.speaker]
                              : [];
                    const firstSpeaker =
                        speakers && speakers.length > 0 ? speakers[0] : null;

                    return firstSpeaker ? (
                        <div className="relative h-32 w-32">
                            {speakers.length === 1 ? (
                                // Um único palestrante
                                <SpeakerDialog speaker={firstSpeaker}>
                                    <div className="relative h-32 w-32 overflow-hidden rounded-xl">
                                        <img
                                            src={firstSpeaker.image}
                                            alt={firstSpeaker.name}
                                            className="h-full w-full cursor-pointer object-cover transition duration-400 ease-in-out hover:brightness-60"
                                        />
                                        <div
                                            className="pointer-events-none absolute inset-0 rounded-xl"
                                            style={{
                                                background:
                                                    'linear-gradient(135deg, transparent 60%, rgba(255,255,255,0.1) 70%, rgba(0,0,0,0.4) 100%)',
                                                boxShadow:
                                                    'inset -20px -20px 20px rgba(0,0,0,0.2)',
                                            }}
                                        >
                                            <div
                                                className="absolute right-1.5 bottom-1.5 flex h-6 w-6 items-center justify-center rounded-full"
                                                style={{
                                                    background:
                                                        'rgba(255,255,255,0.2)',
                                                    backdropFilter: 'blur(8px)',
                                                }}
                                            >
                                                <ArrowUpRight
                                                    size={14}
                                                    strokeWidth={2}
                                                    color="#FFFFFF"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </SpeakerDialog>
                            ) : (
                                // Múltiplos palestrantes - fotos sobrepostas
                                <div className="relative h-32 w-32">
                                    {speakers
                                        .slice(0, 3)
                                        .map((speaker: any, idx: number) => {
                                            const isLast =
                                                idx ===
                                                Math.min(speakers.length, 3) -
                                                    1;
                                            const remainingCount =
                                                speakers.length - 3;

                                            return (
                                                <SpeakerDialog
                                                    key={speaker.id}
                                                    speaker={speaker}
                                                >
                                                    <div
                                                        className="absolute overflow-hidden rounded-xl border-2 border-white shadow-md transition duration-400 ease-in-out hover:z-10 hover:brightness-60"
                                                        style={{
                                                            width:
                                                                speakers.length ===
                                                                2
                                                                    ? '65%'
                                                                    : idx === 2
                                                                      ? '50%'
                                                                      : '60%',
                                                            height:
                                                                speakers.length ===
                                                                2
                                                                    ? '65%'
                                                                    : idx === 2
                                                                      ? '50%'
                                                                      : '60%',
                                                            left:
                                                                idx === 0
                                                                    ? '0'
                                                                    : idx === 1
                                                                      ? speakers.length ===
                                                                        2
                                                                          ? '35%'
                                                                          : '40%'
                                                                      : '50%',
                                                            top:
                                                                idx === 0
                                                                    ? '0'
                                                                    : idx === 1
                                                                      ? speakers.length ===
                                                                        2
                                                                          ? '35%'
                                                                          : '0'
                                                                      : '50%',
                                                            zIndex:
                                                                speakers.length -
                                                                idx,
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        <img
                                                            src={speaker.image}
                                                            alt={speaker.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                        {isLast &&
                                                            remainingCount >
                                                                0 && (
                                                                <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-sm font-bold text-white">
                                                                    +
                                                                    {
                                                                        remainingCount
                                                                    }
                                                                </div>
                                                            )}
                                                        {idx === 0 && (
                                                            <div
                                                                className="absolute right-1 bottom-1 flex h-5 w-5 items-center justify-center rounded-full bg-white/90 shadow-sm"
                                                                style={{
                                                                    backdropFilter:
                                                                        'blur(4px)',
                                                                }}
                                                            >
                                                                <ArrowUpRight
                                                                    size={10}
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    color="#000000"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </SpeakerDialog>
                                            );
                                        })}
                                </div>
                            )}

                            {portalElement &&
                                createPortal(
                                    <span>
                                        {speakers.map((s: any, idx: number) => (
                                            <span key={s.id}>
                                                {s.name}
                                                {idx < speakers.length - 1 &&
                                                    ', '}
                                            </span>
                                        ))}
                                    </span>,
                                    portalElement,
                                )}
                        </div>
                    ) : null;
                })()}

                <div className="flex flex-col items-end gap-1">
                    <ButtonBasedOnAvailability
                        isFull={lecture.n_attendees! >= lecture.room!.capacity}
                        lecture={lecture}
                        user={user}
                    />

                    {user?.is_admin && <AdminButtons lecture={lecture} />}
                </div>
            </div>

            <div className="flex h-full flex-col justify-between transition duration-200 group-hover/bento:translate-x-2 dark:text-neutral-200">
                <div className="mt-2 mb-auto text-lg font-bold">
                    {lecture.title}
                </div>
                <div>
                    <div className="font-normal">
                        com{' '}
                        <span
                            id={lecture.id.toString()}
                            className="text-primary-blue cursor-pointer font-medium capitalize hover:underline"
                        >
                            {/*
                            O nome do palestrante tá vindo do portal dentro do trigger do speakerdialog...
                            nesse arquivo, aqui em cima
                            */}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span>
                            Sala {lecture.room_number}{' '}
                            <span className="text-muted-foreground font-medium">
                                -{' '}
                                {lecture.room?.building === 'goncalves'
                                    ? 'Gonçalves'
                                    : 'Félix'}
                            </span>
                        </span>

                        <span className="text-sm font-medium">
                            {lecture.date}, {lecture.starts} - {lecture.ends}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
