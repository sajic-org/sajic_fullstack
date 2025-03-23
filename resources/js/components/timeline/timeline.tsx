function Timeline({ children, section = 'white', date }: { children: any; section?: string; date: string }) {
    return (
        <div className={` ${section === 'blue' ? 'bg-primary-blue/90 text-white' : 'text-primary-blue'}`}>
            <h2
                className={`m-auto w-fit rounded-b-3xl px-6 pt-10 pb-12 text-7xl font-semibold shadow-lg ${section === 'blue' ? 'text-primary-blue bg-white' : 'bg-primary-blue/90 text-white'}`}
            >
                {date}
            </h2>
            <ul className={`relative mx-auto grid w-fit grid-cols-4 gap-x-3`}>{children}</ul>
        </div>
    );
}

export default Timeline;
