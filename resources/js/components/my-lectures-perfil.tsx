import { useInitials } from '@/hooks/use-initials';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { User } from '@/types/models';

function MyLecturesPerfil({ user }: { user: User }) {
    const getInitials = useInitials();

    return (
        <div className="flex flex-col items-center gap-10">
            <Avatar className="h-70 w-70 overflow-hidden rounded-full shadow-md shadow-gray-400">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg bg-neutral-200 text-8xl text-black dark:bg-neutral-700 dark:text-white">
                    {getInitials(user.name)}
                </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center gap-1">
                <h2 className="font-bold">{user.name}</h2>
                <h3 className="text-light-text">{user.email}</h3>
            </div>
        </div>
    );
}

export default MyLecturesPerfil;
