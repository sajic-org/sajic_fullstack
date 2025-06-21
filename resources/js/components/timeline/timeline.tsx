import { ReactNode } from 'react';

function Timeline({ children, section = 'white', date }: { children: ReactNode; section?: string; date: string }) {
    const bgImage = section === 'blue' ? "bg-[url('/assets/timeline_blue_bg_plexus.webp')]" : "bg-[url('/assets/timeline_white_bg_plexus.webp')]";

    return (
        <div
            className={` ${bgImage} bg-cover bg-no-repeat bg-blend-multiply ${section === 'blue' ? 'bg-primary-blue bg-left text-white' : 'text-primary-blue bg-center'}`}
        >
            <h2
                className={`m-auto w-fit rounded-b-3xl px-6 pt-10 pb-12 text-7xl font-semibold shadow-lg ${section === 'blue' ? 'text-primary-blue bg-white' : 'bg-primary-blue text-white'}`}
            >
                {date}
            </h2>
            <ul className={`relative mx-auto grid w-fit grid-cols-4 gap-x-3`}>{children}</ul>
        </div>
    );
}

export default Timeline;
