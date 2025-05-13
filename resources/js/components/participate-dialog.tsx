import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { subscribe } from '@/lib/utils';
import { GraduationCap } from 'lucide-react';
import { Button } from './ui/button';

function ParticipateDialog({ lecture }) {
    return (
        <Dialog>
            <DialogTrigger className="bg-primary-blue flex cursor-pointer items-center gap-3 rounded-md px-4 py-2 font-medium text-white sm:gap-2">
                Participar
                <GraduationCap className="size-5" />
            </DialogTrigger>
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
