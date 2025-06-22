import { ReactNode } from 'react';

const borderColorClass: Record<string, string> = {
    'primary-blue': 'border-primary-blue',
    'white': 'border-white',
};
const bgColorClass: Record<string, string> = {
    'primary-blue': 'bg-primary-blue',
    'white': 'bg-white',
};

function TimelineContent({
    variant = 'left',
    children,
    date,
    turno,
    lineColor = 'primary-blue',
}: {
    variant?: string;
    date: string;
    children: ReactNode;
    turno: string;
    lineColor?: string;
}) {
    const borderClass = borderColorClass[lineColor] || 'border-primary-blue';
    const bgClass = bgColorClass[lineColor] || 'bg-primary-blue';

    return (
        <>
            {variant === 'right' ? (
                <li className={`relative col-span-2 col-start-3 ${borderClass} border-l-4 py-6 pl-3`}>
                    <h3 className="mb-2 text-4xl font-bold">
                        {date} <span className="text-base font-normal">({turno})</span>
                    </h3>
                    <div className={`absolute top-9.5 -left-[9.65px] size-4 rounded-full ${bgClass}`}></div>
                    {children}
                </li>
            ) : (
                <>
                    <li className="col-span-2 py-5 max-sm:hidden">
                        <div className="relative mb-10 text-end">
                            <div className={`absolute top-4 -right-[22.3px] size-4 rounded-full ${bgClass}`}></div>
                            <h3 className="mx-1 mb-2 text-4xl font-bold">
                                <span className="text-lg font-normal">({turno}) </span> {date}
                            </h3>
                            {children}
                        </div>
                    </li>
                    <div className={`${borderClass} border-l-4 max-sm:hidden`}></div>

                    <li className={`relative col-span-2 col-start-3 ${borderClass} border-l-4 py-6 pl-3 sm:hidden`}>
                        <h3 className="mb-2 text-4xl font-bold">
                            {date} <span className="text-base font-normal">({turno})</span>
                        </h3>
                        <div className={`absolute top-9.5 -left-[9.65px] size-4 rounded-full ${bgClass}`}></div>
                        {children}
                    </li>
                </>
            )}
        </>
    );
}

export default TimelineContent;
