import { unsubcribe } from '@/lib/utils';
import { Button } from './ui/button';

function MyLecturesListItem({
    lecture,
}: {
    lecture: {
        title: string | React.ReactNode;
        image?: string;
        time: string;
    };
}) {
    return (
        <div className="border-border md:mx flex h-28 rounded-md border-2 p-2 shadow-md lg:w-full">
            <div className="flex w-full gap-3">
                <img src={lecture.image} alt="" className="my-auto h-20 w-20 rounded-md object-cover" />
                <div className="my-auto text-nowrap">
                    <p className="text-primary-blue text-sm font-medium">{lecture.teacher}</p>
                    <p className="text-md font-bold">{lecture.title}</p>
                    <p className="text-sm">{lecture.time}</p>
                </div>
            </div>
            <Button variant="destructive" className="px-6 font-semibold shadow-md" onClick={() => unsubcribe(lecture)}>
                Cancelar
            </Button>
        </div>
    );
}

export default MyLecturesListItem;
