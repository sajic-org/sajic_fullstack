import { User } from '@/types/models';
import MyLecturesListItem from './my-lectures-list-item';
function MyLecturesList({ user }: { user: User }) {
    return (
        <div className="border-border mx-auto h-[28rem] w-full space-y-2 overflow-y-scroll rounded-xl border-2 p-2 pr-6 md:w-4/5 lg:w-full">
            {user.lectures?.map((item, i) => (
                <MyLecturesListItem key={i} lectures={item} />
            ))}
        </div>
    );
}

export default MyLecturesList;

