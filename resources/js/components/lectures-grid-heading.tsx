import { cn } from '@/lib/utils';

function LecturesGridHeading({
    className,
    title,
    description,
    image,
    icon,
}: {
    className?: string;
    title: string | React.ReactNode;
    description: string | React.ReactNode;
    image: string;
    icon?: any;
}) {
    return (
        <div
            className={cn(
                'group/bento shadow-input row-span-1 flex flex-col justify-between space-y-2 rounded-xl border border-transparent bg-white p-4 text-neutral-600 shadow-md dark:border-white/[0.2] dark:bg-black dark:shadow-none',
                className,
            )}
        >
            <img src={image} alt={title} className="flex h-full min-h-[6rem] w-full flex-1 rounded-xl object-cover" />

            <div className="">
                {icon}
                <div className="mt-2 mb-2 text-lg font-bold dark:text-neutral-200">{title}</div>
                <div className="text-sm font-normal dark:text-neutral-300">{description}</div>
            </div>
        </div>
    );
}

export default LecturesGridHeading;
