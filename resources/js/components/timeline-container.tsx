import React from 'react';
import Timeline from './timeline/timeline';
import TimelineContent from './timeline/timeline-content';
import TimelineHour from './timeline/timeline-hour';
import TimelineLecture from './timeline/timeline-lecture';

interface Lecture {
    day: string
    time: string
    name: string
    speaker: string
}

interface TimelineProps {
    timelineData: Lecture[]
}

interface LecturesByDay {
    [key: string]: {
        "Manhã": Lecture[],
        "Tarde": Lecture[],
        "Noite": Lecture[],
    }
}

function groupByDayReducer(grouped: LecturesByDay, lecture: Lecture) {
    if (!grouped[lecture.day]) {
        grouped[lecture.day] = {
            "Manhã": [],
            "Tarde": [],
            "Noite": [],
        };
    }
    const hour = Number(lecture.time.slice(0, 2))
    console.log(hour)

    if (hour <= 12) {
        grouped[lecture.day].Manhã.push(lecture)
    }
    else if (hour <= 18) {
        grouped[lecture.day].Tarde.push(lecture)
    }
    else {
        grouped[lecture.day].Noite.push(lecture)
    }

    return grouped
}

function generateTimelineDays(lecturesByDay: LecturesByDay) {
    let isRight = false
    let isBlue = false

    const TimelineDays = Object.keys(lecturesByDay).map(day => {


        const TimelineDay = Object.entries(lecturesByDay[day]).map(
            ([period, lectures]) => {
                const TimelinePeriod = (
                    <TimelineContent
                        key={period}
                        date={day}
                        turno={period}
                        lineColor={isBlue ? "primary-blue" : "white"}
                        variant={isRight ? "right" : "left"}
                    >
                        {lectures.map(lecture => {
                            const TimelineFragment = (
                                <React.Fragment key={lecture.name}>
                                    <TimelineHour h={lecture.time} />
                                    <TimelineLecture title={lecture.name} lecturer={lecture.speaker} />
                                </React.Fragment>
                            )

                            return TimelineFragment
                        })}
                    </TimelineContent>
                )

                isRight = toggle(isRight)

                return TimelinePeriod
            }
        )

        isBlue = toggle(isBlue)

        return (
            <Timeline date={day} key={day} section={isBlue ? "blue" : "white"}>
                {TimelineDay}
            </Timeline>
        )
    })

    return TimelineDays
}

//Simple helper function to invert boolean values
const toggle = (val: boolean) => val ? false : true

function TimelineContainer({ timelineData }: TimelineProps) {
    const lecturesByDay = timelineData.reduce(groupByDayReducer, {})

    const TimelineDays = generateTimelineDays(lecturesByDay)

    return (
        <section>
            {TimelineDays}
        </section>
    );
}

export default TimelineContainer;
