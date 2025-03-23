import { cn } from '@/lib/utils';
import ParticipateDialog from './participate-dialog';
import SpeakerDialog from './speaker-drawer';

export const LecturesGrid = ({ className, children }: { className?: string; children?: React.ReactNode }) => {
    return <div className={cn('mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-3', className)}>{children}</div>;
};

const speaker = {
    name: 'Gladimir  Catarino',
    description:
        'Suspendisse vel neque in risus dignissim euismod. Vivamus quis erat sapien. Aliquam ac est vitae ligula commodo convallis vel sit amet enim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec mattis libero et lectus vehicula rhoncus. Phasellus quis tellus quis ipsum consequat malesuada. Praesent eleifend, neque eget porta elementum, arcu diam hendrerit velit, eu ornare urna erat et sem. Aliquam commodo justo quis nunc feugiat, nec semper dolor lacinia. Donec porttitor lacinia ipsum vel tincidunt. Etiam malesuada ex diam, ut faucibus sapien scelerisque sit amet.',
    image: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
    lectures: [
        {
            title: 'Introduction to Backend Devin',
            date: '2023-10-15',
        },
        {
            title: 'Advanced Machine Something',
            date: '2023-11-20',
        },
    ],
};
export const LecturesGridItem = ({
    className,
    lecture,
}: {
    className?: string;
    lecture: {
        title: string | React.ReactNode;
        description: string | React.ReactNode;
        image?: string;
        time: string;
    };
}) => {
    //receber o tipo da palestra (tecnologia, etc) e fazer os loops baseado nisso
    return (
        <div
            className={cn(
                'group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-transparent bg-white p-4 text-start text-neutral-600 shadow-md transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none',
                className,
            )}
        >
            <div className="flex items-start justify-between gap-8 transition duration-200 group-hover/bento:translate-x-2">
                <SpeakerDialog speaker={speaker}>
                    <img
                        // src={lecture.speaker.image}
                        // alt={lecture.speaker.name}
                        src={speaker.image}
                        alt={speaker.name}
                        className="aspect-square w-28 cursor-pointer rounded-xl object-cover"
                    />
                </SpeakerDialog>

                <ParticipateDialog />
            </div>

            <div className="transition duration-200 group-hover/bento:translate-x-2 dark:text-neutral-200">
                <div className="mt-2 mb-2 text-lg font-bold">{lecture.title}</div>
                <div className="text-sm font-normal">{lecture.description}</div>
                <div className="mt-1 ml-auto w-fit text-sm font-semibold text-neutral-500">{lecture.time}</div>
            </div>
        </div>
    );
};
