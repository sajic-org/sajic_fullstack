import React, { ReactNode, cloneElement, isValidElement } from 'react';
import TimelineContent from './timeline-content';

interface Props {
    children: ReactNode;
    section?: string;
    date: string;
}

interface TimelineContentProps {
    lineColor: string;
}

function Timeline({ children, section = 'white', date }: Props) {
    const bgImage =
        section === 'blue'
            ? "bg-[url('/assets/timeline_blue_bg_plexus.webp')]"
            : "bg-[url('/assets/timeline_white_bg_plexus.webp')]";
    const lineColor = section === 'blue' ? 'white' : 'primary-blue';

    const childrenWithProps = React.Children.map(children, (child) =>
        isValidElement(child) && child.type === TimelineContent
            ? cloneElement(child as React.ReactElement<TimelineContentProps>, {
                  lineColor,
              })
            : child,
    );

    return (
        <div
            className={` ${bgImage} bg-cover bg-no-repeat bg-blend-multiply ${section === 'blue' ? 'bg-primary-blue bg-left text-white' : 'text-primary-blue bg-center'}`}
        >
            <h2
                className={`max-sm:m-0 max-sm:mr-auto max-sm:rounded-br-full max-sm:pr-11 max-sm:pl-1 max-sm:text-left m-auto w-fit rounded-b-3xl px-6 pt-10 pb-12 text-7xl font-semibold shadow-lg sm:rounded-b-3xl ${section === 'blue' ? 'text-primary-blue bg-white' : 'bg-primary-blue text-white'}`}
            >
                {date}
            </h2>
            <ul className={`relative mx-auto grid w-fit grid-cols-4 gap-x-3 max-sm:grid-cols-1`}>
                {childrenWithProps}
            </ul>
        </div>
    );
}

export default Timeline;
