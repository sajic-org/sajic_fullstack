import { cn, unsubcribe } from '@/lib/utils';
import { User } from '@/types';
import { Lecture } from '@/types/models';
import { Link } from '@inertiajs/react';
import { CircleX, GraduationCap, ListChecks } from 'lucide-react';
import ParticipateDialog from './participate-dialog';
import SpeakerDialog from './speaker-drawer';
import { Button } from './ui/button';

export const LecturesGrid = ({ className, children }: { className?: string; children?: React.ReactNode }) => {
    return <div className={cn('mx-auto my-8 grid grid-cols-1 gap-4 md:max-w-7xl md:grid-cols-3', className)}>{children}</div>;
};

export const LecturesGridItem = ({ className, lecture, user }: { className?: string; lecture: Lecture; user: User }) => {
    return (
        <div
            className={cn(
                'group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-transparent bg-white p-4 text-start text-neutral-600 shadow-md transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none',
                className,
            )}
        >
            <div className="flex items-start justify-between gap-8 transition duration-200 group-hover/bento:translate-x-2">
                <SpeakerDialog speaker={lecture.speaker}>
                    <img
                        src={lecture.speaker?.image}
                        alt={lecture.speaker?.name}
                        className="aspect-square w-28 cursor-pointer rounded-xl object-cover"
                    />
                </SpeakerDialog>

                <div className="flex flex-col items-end gap-1">
                    {user && user.lectures.some((userLecture: Lecture) => userLecture.id === lecture.id) ? (
                        <Button variant="destructive" className="px-6 font-semibold shadow-md" onClick={() => unsubcribe(lecture)}>
                            Cancelar
                            <CircleX />
                        </Button>
                    ) : (
                        user && <ParticipateDialog lecture={lecture} />
                    )}

                    {user?.is_admin && (
                        <Link href={route('lectures.attendant_table', { lecture: lecture })}>
                            <button className="cursor-pointer rounded-md bg-orange-400 p-2 text-white">
                                <ListChecks size={18} />
                            </button>
                        </Link>
                    )}
                </div>

                {!user && (
                    <Link href={route('login')}>
                        <button className="bg-primary-blue flex cursor-pointer items-center gap-2 rounded-md p-2 text-white lg:px-4">
                            Participar
                            <GraduationCap className="size-5" />
                        </button>
                    </Link>
                )}
            </div>

            <div className="transition duration-200 group-hover/bento:translate-x-2 dark:text-neutral-200">
                <div className="mt-2 text-lg font-bold">{lecture.title}</div>
                <div className="font-normal">
                    com <span className="text-primary-blue font-medium capitalize">{lecture.speaker?.name}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span>Sala {lecture.room_number}</span>

                    <span className="text-sm font-medium">
                        {lecture.date}, {lecture.starts} - {lecture.ends}
                    </span>
                </div>
            </div>
        </div>
    );
};
