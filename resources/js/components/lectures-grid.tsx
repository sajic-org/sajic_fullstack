import { cn, unsubcribe } from '@/lib/utils';
import { Lecture, User } from '@/types/models';
import { Link } from '@inertiajs/react';
import { CircleX, GraduationCap, ListChecks, SquarePen } from 'lucide-react';
import ParticipateDialog from './participate-dialog';
import SpeakerDialog from './speaker-drawer';
import { Button } from './ui/button';

export const LecturesGrid = ({ className, children }: { className?: string; children?: React.ReactNode }) => {
    return <div className={cn('mx-auto my-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:max-w-7xl lg:grid-cols-3', className)}>{children}</div>;
};

export const LecturesGridItem = ({ className, lecture, user }: { className?: string; lecture: Lecture; user: User | undefined }) => {
    return (
        <div
            className={cn(
                'group/bento shadow-input max row-span-1 mx-auto flex w-full flex-col justify-between space-y-2 rounded-xl border border-transparent bg-white p-4 text-start text-neutral-600 shadow-md transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none',
                className,
            )}
        >
            <div className="flex items-start justify-between gap-8 transition duration-200 group-hover/bento:translate-x-2">
                <SpeakerDialog speaker={lecture.speaker}>
                    <img
                        src={lecture.speaker?.image}
                        alt={lecture.speaker?.name}
                        className="aspect-square w-40 cursor-pointer rounded-xl object-cover sm:w-28"
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
                    )}
                </div>

                {!user && (
                    <Link href={route('login')}>
                        <button className="bg-primary-blue flex cursor-pointer items-center gap-3 rounded-md px-4 py-2 font-medium text-white max-sm:text-lg sm:gap-2">
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
        </div>
    );
};
