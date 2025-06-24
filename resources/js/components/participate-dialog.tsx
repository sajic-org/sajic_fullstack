import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { isUserAlreadyEnrolledAtThatTime, subscribe } from '@/lib/utils';
import { Lecture, User } from '@/types/models';
import { ReactNode } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';

function ParticipateDialog({
    lecture,
    children,
    user,
}: {
    lecture: Lecture;
    children: ReactNode;
    user: User;
}) {
    const lectureConflicting: Lecture =
        isUserAlreadyEnrolledAtThatTime(user, lecture)[0] || null;

    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tem certeza?</DialogTitle>
                    <DialogDescription>
                        Você será adicionado à lista de participantes.
                    </DialogDescription>
                </DialogHeader>
                <Button
                    className="ml-auto w-fit"
                    onClick={() => {
                        if (lectureConflicting) {
                            toast(
                                'Você já está inscrito numa palestra neste horário:',
                                {
                                    description: `${lectureConflicting.title} - dia ${lectureConflicting.date}, das ${lectureConflicting.starts} às ${lectureConflicting.ends}`,
                                },
                            );
                        } else {
                            subscribe(lecture);
                        }
                    }}
                >
                    Tenho Certeza
                </Button>
            </DialogContent>
        </Dialog>
    );
}

export default ParticipateDialog;
