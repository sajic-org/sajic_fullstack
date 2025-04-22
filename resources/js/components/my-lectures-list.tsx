import { Lecture } from '@/types/models';
import MyLecturesListItem from './my-lectures-list-item';
function MyLecturesList({ lectures }: { lectures: Lecture[] }) {
    return (
        <div className="border-border mx-auto h-[28rem] w-full space-y-2 overflow-y-scroll rounded-xl border-2 p-2 pr-6 md:w-4/5 lg:w-full">
            {lectures?.map((item, i) => <MyLecturesListItem key={i} lecture={item} />)}
        </div>
    );
}

export default MyLecturesList;
