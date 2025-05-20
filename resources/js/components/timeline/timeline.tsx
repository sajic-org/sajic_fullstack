import { ReactNode } from 'react';

function Timeline({ children, section = 'white', date }: { children: ReactNode; section?: string; date: string }) {
    return (
        <div className={` ${section === 'blue' ? 'bg-primary-blue text-white' : 'text-primary-blue'}`}>
            <h2
                className={`m-auto w-fit px-6 pt-10 pb-12 text-7xl font-semibold shadow-lg sm:rounded-b-3xl ${section === 'blue' ? 'text-primary-blue bg-white' : 'bg-primary-blue text-white'} max-sm:m-0 max-sm:mr-auto max-sm:rounded-br-full max-sm:pr-11 max-sm:pl-1 max-sm:text-left`}
            >
                {date}
            </h2>
            <ul className={`relative mx-auto grid w-fit grid-cols-4 gap-x-3 max-sm:grid-cols-1`}>{children}</ul>
        </div>
    );
}

export default Timeline;
