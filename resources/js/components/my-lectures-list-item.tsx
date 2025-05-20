import { unsubcribe } from '@/lib/utils';
import { Lecture } from '@/types/models';
import { CircleX } from 'lucide-react';
import SpeakerDialog from './speaker-drawer';
import { Button } from './ui/button';

function MyLecturesListItem({ lecture }: { lecture: Lecture }) {
    return (
        <div className="border-border md:mx flex min-h-28 rounded-md border-2 p-2 shadow-md lg:w-full">
            <div className="flex w-full gap-3">
                <SpeakerDialog speaker={lecture.speaker}>
                    <img src={lecture.speaker?.image} alt="" className="my-auto h-20 w-20 cursor-pointer rounded-md object-cover" />
                </SpeakerDialog>
                <div className="my-auto text-nowrap">
                    <p className="text-primary-blue text-sm font-medium">{lecture.speaker?.name}</p>
                    <p className="text-md max-w-44 font-bold text-wrap md:max-w-72">{lecture.title}</p>
                    <p className="text-sm">
                        {lecture.date}, {lecture.starts} - {lecture.ends}
                    </p>
                </div>
            </div>
            <Button variant="destructive" className="font-semibold shadow-md max-md:rounded-full md:px-6" onClick={() => unsubcribe(lecture)}>
                <span className="max-md:hidden">Cancelar</span>
                <CircleX />
            </Button>
        </div>
    );
}

export default MyLecturesListItem;
