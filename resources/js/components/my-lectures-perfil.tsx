import { useInitials } from "@/hooks/use-initials";
import { User } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";


function MyLecturesPerfil({user} : {user: User}){
    const getInitials = useInitials();

    return(
        <div className="flex items-center flex-col gap-10">
            <Avatar className="h-60 w-60 overflow-hidden rounded-full">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 text-8xl dark:text-white">
                    {getInitials(user.name)}
                </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center gap-1">
                <h2 className="font-bold">{user.name}</h2>
                <h3 className="text-light-text">{user.email}</h3>
            </div>
        </div>
    )
}

export default MyLecturesPerfil