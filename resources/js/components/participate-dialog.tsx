import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { subscribe } from '@/lib/utils';
import { Lecture } from '@/types/models';
import { ReactNode } from 'react';
import { Button } from './ui/button';

function ParticipateDialog({ lecture, children }: { lecture: Lecture; children: ReactNode }) {
    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tem certeza?</DialogTitle>
                    <DialogDescription>Você será adicionado à lista de participantes.</DialogDescription>
                </DialogHeader>
                <Button
                    className="ml-auto w-fit"
                    onClick={() => {
                        subscribe(lecture);
                    }}
                >
                    Tenho Certeza
                </Button>
            </DialogContent>
        </Dialog>
    );
}

export default ParticipateDialog;
