import { cn } from '@/lib/utils';
import { Lecture, User } from '@/types/models';
import { ArrowUpRight } from 'lucide-react';
import SpeakerDialog from './speaker-drawer';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import AdminButtons from './admin-buttons';
import ButtonBasedOnAvailability from './buttons-based-on-availability';

export const LecturesGrid = ({ className, children }: { className?: string; children?: React.ReactNode }) => {
    return <div className={cn('mx-auto my-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:max-w-7xl lg:grid-cols-3', className)}>{children}</div>;
};

export const LecturesGridItem = ({ className, lecture, user }: { className?: string; lecture: Lecture; user?: User }) => {
    const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

    //Precisa ter useEffect pq o elemento que abre o dialog renderiza antes doq
    //o div onde fica o nome do palestrante (e tem o ID)
    useEffect(() => {
        const container = document.getElementById(lecture.id.toString());
        setPortalElement(container)
    }, [lecture.id])

    return (
        <div
            className={cn(
                'group/bento shadow-input max row-span-1 mx-auto flex w-full flex-col justify-between space-y-2 rounded-xl border border-transparent bg-white p-4 text-start text-neutral-600 shadow-md transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none',
                className,
            )}
        >
            <div className="flex items-start justify-between transition duration-200 group-hover/bento:translate-x-2">
                <SpeakerDialog speaker={lecture.speaker}>
                    <div className="relative overflow-hidden rounded-xl w-32 h-32">
                        <img
                            src={lecture.speaker?.image}
                            alt={lecture.speaker?.name}
                            className="w-full h-full object-cover cursor-pointer transition duration-400 ease-in-out hover:brightness-60"
                        />
                        <div
                            className="absolute inset-0 rounded-xl pointer-events-none"
                            style={{
                                background:
                                    "linear-gradient(135deg, transparent 60%, rgba(255,255,255,0.1) 70%, rgba(0,0,0,0.4) 100%)",
                                boxShadow: "inset -20px -20px 20px rgba(0,0,0,0.2)",
                            }}
                        >
                            <div
                                className="absolute bottom-1.5 right-1.5 w-6 h-6 rounded-full flex items-center justify-center"
                                style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}
                            >
                                <ArrowUpRight size={14} strokeWidth={2} color="#FFFFFF" />
                            </div>
                        </div>

                        {/* O nome do palestrante é enviado para baixo */}
                        {portalElement && createPortal(
                            <span>
                                {lecture.speaker?.name}
                            </span>,
                            portalElement
                        )}
                    </div>

                </SpeakerDialog>

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
                <div className="mt-2 mb-auto text-lg font-bold">{lecture.title}</div>
                <div>
                    <div className="font-normal">
                        com <span
                            id={lecture.id.toString()}
                            className="text-primary-blue font-medium capitalize cursor-pointer hover:underline">
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
