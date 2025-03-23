import Timeline from './timeline/timeline';
import TimelineContent from './timeline/timeline-content';
import TimelineHour from './timeline/timeline-hour';
import TimelineLecture from './timeline/timeline-lecture';

function TimelineContainer() {
    return (
        <section>
            {/* Blue Background Section */}
            <Timeline section="blue" date="15/10">
                <TimelineContent date="15/10" turno="manhã" lineColor="white">
                    <TimelineHour h="09:00" />
                    <TimelineLecture title="Oficina: NextJS 14 - Estrutura de uma aplicação profissional" lecturer="Ítalo Nolasco Ramos" />

                    <TimelineLecture title="Oficina: NextJS 14 - Estrutura de uma aplicação profissional" lecturer="Ítalo Nolasco Ramos" />

                    <TimelineHour h="10:30" />
                    <TimelineLecture title="Oficina: NextJS 14 - Estrutura de uma aplicação profissional" lecturer="Ítalo Nolasco Ramos" />
                </TimelineContent>

                <TimelineContent date="15/10" variant="right" turno="tarde" lineColor="white">
                    <TimelineHour h="09:00" />
                    <TimelineLecture title="Oficina: NextJS 14 - Estrutura de uma aplicação profissional" lecturer="Ítalo Nolasco Ramos" />
                    <TimelineHour h="09:00" />
                    <TimelineLecture title="Oficina: NextJS 14 - Estrutura de uma aplicação profissional" lecturer="Ítalo Nolasco Ramos" />{' '}
                </TimelineContent>

                <TimelineContent date="15/10" turno="noite" lineColor="white">
                    <TimelineHour h="09:00" />
                    <TimelineLecture title="Oficina: NextJS 14 - Estrutura de uma aplicação profissional" lecturer="Ítalo Nolasco Ramos" />

                    <TimelineHour h="09:00" />
                    <TimelineLecture title="Oficina: NextJS 14 - Estrutura de uma aplicação profissional" lecturer="Ítalo Nolasco Ramos" />
                </TimelineContent>
            </Timeline>

            {/* White Background Section */}
            <Timeline date="16/10">
                <TimelineContent date="16/10" turno="manhã" variant="right">
                    <TimelineHour h="09:00" />
                    <TimelineLecture title="Oficina: NextJS 14 - Estrutura de uma aplicação profissional" lecturer="Ítalo Nolasco Ramos" />

                    <TimelineHour h="09:00" />
                    <TimelineLecture title="Oficina: NextJS 14 - Estrutura de uma aplicação profissional" lecturer="Ítalo Nolasco Ramos" />
                </TimelineContent>

                <TimelineContent date="16/10" turno="tarde">
                    <TimelineHour h="09:00" />
                    <TimelineLecture title="Oficina: NextJS 14 - Estrutura de uma aplicação profissional" lecturer="Ítalo Nolasco Ramos" />
                    <TimelineHour h="09:00" />
                    <TimelineLecture title="Oficina: NextJS 14 - Estrutura de uma aplicação profissional" lecturer="Ítalo Nolasco Ramos" />{' '}
                </TimelineContent>

                <TimelineContent date="16/10" turno="noite" variant="right">
                    <TimelineHour h="09:00" />
                    <TimelineLecture title="Oficina: NextJS 14 - Estrutura de uma aplicação profissional" lecturer="Ítalo Nolasco Ramos" />

                    <TimelineHour h="09:00" />
                    <TimelineLecture title="Oficina: NextJS 14 - Estrutura de uma aplicação profissional" lecturer="Ítalo Nolasco Ramos" />
                </TimelineContent>
            </Timeline>

            {/* Second Blue Section */}
            <Timeline section="blue" date="17/10">
                <TimelineContent date="17/10" turno="manhã" lineColor="white">
                    <TimelineHour h="09:00" />
                    <TimelineLecture title="Oficina: NextJS 14 - Estrutura de uma aplicação profissional" lecturer="Ítalo Nolasco Ramos" />

                    <TimelineHour h="09:00" />
                    <TimelineLecture title="Oficina: NextJS 14 - Estrutura de uma aplicação profissional" lecturer="Ítalo Nolasco Ramos" />
                </TimelineContent>

                <TimelineContent date="17/10" variant="right" turno="tarde" lineColor="white">
                    <TimelineHour h="09:00" />
                    <TimelineLecture title="Oficina: NextJS 14 - Estrutura de uma aplicação profissional" lecturer="Ítalo Nolasco Ramos" />
                    <TimelineHour h="09:00" />
                    <TimelineLecture title="Oficina: NextJS 14 - Estrutura de uma aplicação profissional" lecturer="Ítalo Nolasco Ramos" />{' '}
                </TimelineContent>

                <TimelineContent date="17/10" turno="noite" lineColor="white">
                    <TimelineHour h="09:00" />
                    <TimelineLecture title="Oficina: NextJS 14 - Estrutura de uma aplicação profissional" lecturer="Ítalo Nolasco Ramos" />

                    <TimelineHour h="09:00" />
                    <TimelineLecture title="Oficina: NextJS 14 - Estrutura de uma aplicação profissional" lecturer="Ítalo Nolasco Ramos" />
                </TimelineContent>
            </Timeline>
        </section>
    );
}

export default TimelineContainer;
