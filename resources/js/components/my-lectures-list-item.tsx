import { unsubcribe } from '@/lib/utils';
import { CircleX } from 'lucide-react';
import { Button } from './ui/button';
import { Lecture, User } from '@/types/models';

function MyLecturesListItem({lecture} :{lecture: Lecture}) {
    function formatDate(date: string | Date): string {
        if (date instanceof Date) {
          return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          });
        }
        return date;
      }
    
    console.log(lecture)
    return (
        <div className="border-border md:mx flex min-h-28 rounded-md border-2 p-2 shadow-md lg:w-full">
            <div className="flex w-full gap-3">
                {/* <SpeakerDialog speaker={lecture.speaker}> */}
                <img src={lecture.speaker?.image} alt="" className="my-auto h-20 w-20 rounded-md object-cover" />
                {/* </SpeakerDialog> */}
                <div className="my-auto text-nowrap">
                    <p className="text-primary-blue text-sm font-medium">{lecture.speaker?.name}</p>
                    <p className="text-md text-wrap max-w-44 md:max-w-72 font-bold">{lecture.title}</p>
                    <p className="text-sm">{formatDate(lecture.date)}, {lecture.starts} - {lecture.ends}</p>
                </div>
            </div>
            <Button variant="destructive" className="max-md:rounded-full md:px-6 font-semibold shadow-md" onClick={() => unsubcribe(lecture)}>
                <span className='max-md:hidden'>Cancelar</span>
                <CircleX />
            </Button>
        </div>
    );
}

export default MyLecturesListItem;
