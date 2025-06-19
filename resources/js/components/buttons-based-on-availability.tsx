import { Lecture, User } from "@/types/models";
import { CircleOff, CircleX, FileText, GraduationCap } from "lucide-react";
import ParticipateDialog from "./participate-dialog";
import { Button } from "./ui/button";
import { unsubcribe } from "@/lib/utils";
import { Link } from "@inertiajs/react"

interface Props {
    isFull: boolean;
    lecture: Lecture;
    user: User | undefined;
}

function ButtonBasedOnAvailability({ isFull, lecture, user }: Props) {
    const buttonBaseClass = "h-10 w-36 flex cursor-pointer items-center justify-center gap-3 rounded-md font-semibold sm:gap-2";

    if (!user) {
        return (
            <Link href={route('login')}>
                <Button className={`${buttonBaseClass} bg-primary-blue hover:bg-primary-blue hover:brightness-85 shadow-md`}>
                    Participar
                    <GraduationCap className="size-5.5" />
                </Button>
            </Link>
        );
    }

    const userLecture = user.lectures.find(userLecture => lecture.id === userLecture.id);

    if (!userLecture) {
        if (!isFull || lecture.is_open_for_enrollment) {
            return (
                <ParticipateDialog lecture={lecture} user={user}>
                    <a className={`${buttonBaseClass} text-white bg-primary-blue hover:bg-primary-blue hover:brightness-85`}>
                        Participar
                        <GraduationCap className="size-5.5" />
                    </a>
                </ParticipateDialog>
            );
        } else {
            return (
                <Button disabled className={`${buttonBaseClass} bg-gray-300 text-light-text`}>
                    Esgotado
                    <CircleOff className="size-5" />
                </Button>
            );
        }
    } else if (userLecture.lecture_attendances?.showed_up) {
        return (
            <a
                className={`${buttonBaseClass} bg-green-600 hover:bg-green-600 hover:brightness-85 text-white`}
                href={`/certificate/${userLecture.lecture_attendances.id}`}
            >
                Certificado
                <FileText className="size-5.5" />
            </a>
        );
    } else {
        return (
            <Button
                className={`${buttonBaseClass} bg-red-600 hover:bg-red-600 hover:brightness-85`}
                onClick={() => unsubcribe(lecture)}
            >
                Cancelar
                <CircleX className="size-5.5" />
            </Button>
        );
    }
}

export default ButtonBasedOnAvailability
