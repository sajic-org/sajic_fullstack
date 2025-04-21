import { User } from '@/types';
import MyLecturesListItem from './my-lectures-list-item';

function MyLecturesList({ user }: { user: User }) {
    return (
        <div className="border-border mx-auto h-[28rem] w-full space-y-2 overflow-y-scroll rounded-xl border-2 p-2 pr-6 md:w-4/5 lg:w-full">
            {lectures.map((item, i) => (
                <MyLecturesListItem key={i} lecture={item} />
            ))}
        </div>
    );
}

export default MyLecturesList;

const lectures = [
    {
        title: 'The Dawn of Innovation',
        teacher: 'Gladimir Catarino',
        time: '17/10, 09:30 - 11:30',
        image: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
    },
    {
        title: 'The Digital Revolution',
        teacher: 'Angelo Luz.',
        time: '17/10, 09:30 - 11:30',
        image: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
    },
    {
        title: 'The Art of Design',
        teacher: 'Edecio Iepsen',
        time: '17/10, 09:30 - 11:30',
        image: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
    },
    {
        title: 'The Dawn of Innovation',
        teacher: 'Gladimir Catarino',
        time: '17/10, 09:30 - 11:30',
        image: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
    },
    {
        title: 'The Dawn of Innovation',
        teacher: 'Gladimir Catarino',
        time: '17/10, 09:30 - 11:30',
        image: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
    },
];
