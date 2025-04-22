import { unsubcribe } from '@/lib/utils';
import { CircleX } from 'lucide-react';
import { Button } from './ui/button';
import { Lecture } from '@/types/models';

function MyLecturesListItem({lectures} :{lectures: Lecture}) {
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
    return (
        <div className="border-border md:mx flex h-28 rounded-md border-2 p-2 shadow-md lg:w-full">
            <div className="flex w-full gap-3">
                {/* <SpeakerDialog speaker={lecture.speaker}> */}
                <img src="https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80" alt="" className="my-auto h-20 w-20 rounded-md object-cover" />
                {/* </SpeakerDialog> */}
                <div className="my-auto text-nowrap">
                    <p className="text-primary-blue text-sm font-medium">{lectures.speaker?.name}</p>
                    <p className="text-md font-bold">{lectures.title}</p>
                    <p className="text-sm">{formatDate(lectures.date)}, {lectures.starts} - {lectures.ends}</p>
                </div>
            </div>
            <Button variant="destructive" className="max-md:rounded-full md:px-6 font-semibold shadow-md" onClick={() => unsubcribe(lectures)}>
                <span className='max-md:hidden'>Cancelar</span>
                <CircleX />
            </Button>
        </div>
    );
}

export default MyLecturesListItem;
