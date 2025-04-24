function TimelineContent({
    variant = 'left',
    children,
    date,
    turno,
    lineColor = 'primary-blue',
}: {
    variant?: string;
    date: string;
    children: any;
    turno: string;
    lineColor?: string;
}) {
    return (
        <>
            {variant === 'right' ? (
                <li className={`relative col-span-2 col-start-3 border-l-4 border-${lineColor} py-6 pl-3`}>
                    <h3 className="mb-2 text-4xl font-bold">
                        {date} <span className="text-base font-normal">({turno})</span>
                    </h3>
                    <div className={`absolute top-9.5 -left-[9.65px] size-4 rounded-full bg-${lineColor}`}></div>
                    {children}
                </li>
            ) : (
                <>
                    <li className="col-span-2 py-5">
                        <div className="relative mb-10 text-end">
                            <div className={`absolute top-4 -right-[22.3px] size-4 rounded-full bg-${lineColor} `}></div>
                            <h3 className="mx-1 mb-2 text-4xl font-bold">
                                <span className="text-lg font-normal">({turno}) </span> {date}
                            </h3>
                            {children}
                        </div>
                    </li>
                    <div className={`border-${lineColor} border-l-4`}></div>
                </>
            )}
        </>
    );
}

export default TimelineContent;
