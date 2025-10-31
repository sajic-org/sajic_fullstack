import { cn } from '@/lib/utils';
import { Lecture, User } from '@/types/models';
import { ArrowUpRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
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
                            ) : // Múltiplos palestrantes - fotos em grid 2x2 quando 5+
                            speakers.length >= 5 ? (
                                <div className="grid h-32 w-32 grid-cols-2 gap-1">
                                    {speakers
                                        .slice(0, 4)
                                        .map((speaker: any, idx: number) => {
                                            const remainingCount =
                                                speakers.length - 4;
                                            const isLast = idx === 3;
                                            const showOverlay =
                                                isLast && remainingCount > 0;
                                            // Se for a última e tiver mais palestrantes, mostra o 5º no modal
                                            const speakerToShow =
                                                isLast &&
                                                remainingCount === 1 &&
                                                speakers[4]
                                                    ? speakers[4]
                                                    : speaker;

                                            return (
                                                <SpeakerDialog
                                                    key={speaker.id}
                                                    speaker={speakerToShow}
                                                >
                                                    <div className="relative overflow-hidden rounded-xl border border-white shadow-sm transition duration-400 ease-in-out hover:brightness-60">
                                                        <img
                                                            src={speaker.image}
                                                            alt={speaker.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                        {showOverlay && (
                                                            <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-xs font-bold text-white">
                                                                +
                                                                {remainingCount}
                                                            </div>
                                                        )}
                                                    </div>
                                                </SpeakerDialog>
                                            );
                                        })}
                                </div>
                            ) : (
                                <div className="relative h-32 w-32">
                                    {speakers
                                        .slice(0, 3)
                                        .map((speaker: any, idx: number) => {
                                            const isLast =
                                                idx === speakers.length - 1 ||
                                                idx === 2;
                                            const remainingCount =
                                                speakers.length - 3;
                                            let size;
                                            if (speakers.length === 2) {
                                                size = '80%';
                                            } else if (speakers.length === 3) {
                                                size = '55%';
                                            } else {
                                                size =
                                                    idx === 2 ? '50%' : '60%';
                                            }

                                            return (
                                                <SpeakerDialog
                                                    key={speaker.id}
                                                    speaker={speaker}
                                                >
                                                    <div
                                                        className="absolute overflow-hidden rounded-xl border-2 border-white shadow-md transition duration-400 ease-in-out hover:z-10 hover:brightness-60"
                                                        style={{
                                                            width: size,
                                                            height: size,
                                                            left:
                                                                speakers.length ===
                                                                2
                                                                    ? idx === 0
                                                                        ? '0'
                                                                        : '81%'
                                                                    : speakers.length ===
                                                                        3
                                                                      ? idx ===
                                                                        0
                                                                          ? '0'
                                                                          : idx ===
                                                                              1
                                                                            ? '57%'
                                                                            : '30.5%'
                                                                      : idx ===
                                                                          0
                                                                        ? '0'
                                                                        : idx ===
                                                                            1
                                                                          ? '40%'
                                                                          : '50%',
                                                            top:
                                                                speakers.length ===
                                                                2
                                                                    ? idx === 0
                                                                        ? '0'
                                                                        : '0'
                                                                    : speakers.length ===
                                                                        3
                                                                      ? idx ===
                                                                        2
                                                                          ? '55%'
                                                                          : '0'
                                                                      : idx ===
                                                                          0
                                                                        ? '0'
                                                                        : idx ===
                                                                            1
                                                                          ? '0'
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
                                                                <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-xs font-bold text-white">
                                                                    +
                                                                    {
                                                                        remainingCount
                                                                    }
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
                                    <>
                                        {speakers.map((s: any, idx: number) => (
                                            <React.Fragment key={s.id}>
                                                <SpeakerDialog speaker={s}>
                                                    <span
                                                        className="text-primary-blue inline cursor-pointer font-medium capitalize"
                                                        style={
                                                            {
                                                                textDecoration:
                                                                    'none !important',
                                                            } as React.CSSProperties
                                                        }
                                                        onMouseEnter={(e) => {
                                                            e.stopPropagation();
                                                            e.currentTarget.style.setProperty(
                                                                'text-decoration',
                                                                'underline',
                                                                'important',
                                                            );
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.stopPropagation();
                                                            e.currentTarget.style.setProperty(
                                                                'text-decoration',
                                                                'none',
                                                                'important',
                                                            );
                                                        }}
                                                    >
                                                        {s.name}
                                                    </span>
                                                </SpeakerDialog>
                                                {idx < speakers.length - 1 &&
                                                    ', '}
                                            </React.Fragment>
                                        ))}
                                    </>,
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

                    {lecture.room && lecture.n_attendees !== undefined && (
                        <div className="mt-2 text-right text-sm text-gray-600">
                            {lecture.room.capacity - lecture.n_attendees > 0 ? (
                                <span>
                                    <span className="text-primary-blue font-semibold">
                                        {lecture.room.capacity -
                                            lecture.n_attendees}
                                    </span>{' '}
                                    {lecture.room.capacity -
                                        lecture.n_attendees ===
                                    1
                                        ? 'vaga disponível'
                                        : 'vagas disponíveis'}
                                </span>
                            ) : (
                                <span className="font-semibold text-red-600">
                                    Esgotado
                                </span>
                            )}
                        </div>
                    )}
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
                            className="text-primary-blue cursor-pointer font-medium capitalize"
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
