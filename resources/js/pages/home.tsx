import Hero from '@/components/hero';
import { PastEditions } from '@/components/past-editions';
import SecondHero from '@/components/second_hero';
import Spinner from '@/components/spinner';
import TimelineContainer from '@/components/timeline-container';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Lecture } from '@/types/models';
import { Deferred, Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Home',
        href: '/',
    },
];

export default function Home({ lectures }: { lectures: Lecture[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head>
                <title>Home</title>
            </Head>

            <Hero />
            <SecondHero />

            <PastEditions />

            <Deferred
                data="lectures"
                fallback={<Spinner />}
            >
                <TimelineContainer timelineData={processLectures(lectures)} />
            </Deferred>
        </AppLayout>
    );
}

function processLectures(lectures: Lecture[]) {
    return lectures.map((lecture) => ({
        day: lecture.date,
        time: lecture.starts,
        name: lecture.title,
        speaker: lecture.speaker?.name,
    }));
}
