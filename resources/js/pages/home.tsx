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
                <meta
                    name="description"
                    content="Semana Acadêmica | Jornada de Iniciação Científica "
                />

                <meta
                    property="og:url"
                    content="https://sajic.marce1in.com.br/"
                />
                <meta
                    property="og:type"
                    content="website"
                />
                <meta
                    property="og:title"
                    content="SAJIC 2025"
                />
                <meta
                    property="og:description"
                    content="Semana Acadêmica | Jornada de Iniciação Científica "
                />
                <meta
                    property="og:image"
                    content="https://sajic.marce1in.com.br/favicon.ico"
                />

                <meta
                    name="twitter:card"
                    content="summary_large_image"
                />
                <meta
                    property="twitter:domain"
                    content="sajic.marce1in.com.br"
                />
                <meta
                    property="twitter:url"
                    content="https://sajic.marce1in.com.br/"
                />
                <meta
                    name="twitter:title"
                    content="SAJIC 2025"
                />
                <meta
                    name="twitter:description"
                    content="Semana Acadêmica | Jornada de Iniciação Científica "
                />
                <meta
                    name="twitter:image"
                    content="https://sajic.marce1in.com.br/favicon.ico"
                />
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
