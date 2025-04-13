import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { router } from '@inertiajs/react';
import { GraduationCap } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from './ui/button';

function ParticipateDialog({ lecture }) {
    function join(id: number) {
        router.post(
            route('user.attend-lecture'),
            { id: id },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast('Inscrição realizada!', {
                        // dar a opcao de cancelar
                        description: `Você agora está inscrito na palestra "${lecture.title}"`,
                        action: {
                            label: 'Cancelar',
                            onClick: () => unsubcribe(id),
                        },
                    });
                },
                onError: (errors) => {
                    toast.error('Erro ao se inscrever.');
                    console.error(errors);
                },
            },
        );
    }

    function unsubcribe(id: number) {
        router.post(
            route('user.leave-lecture'),
            { id: id },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast('Pronto!', {
                        description: `Você não está mais inscrito na palestra "${lecture.title}"`,
                    });
                },
                onError: (errors) => {
                    toast.error('Erro ao se desenscrever.');
                    console.error(errors);
                },
            },
        );
    }

    return (
        <Dialog>
            <DialogTrigger className="bg-primary-blue flex cursor-pointer items-center gap-2 rounded-md p-2 text-white lg:px-4">
                Participar
                <GraduationCap className="size-5" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tem certeza?</DialogTitle>
                    <DialogDescription>Você será adicionado à lista de participantes e levará na bundinha se não comparecer</DialogDescription>
                </DialogHeader>
                <Button
                    className="ml-auto w-fit"
                    onClick={() => {
                        join(lecture.id);
                    }}
                >
                    Tenho Certeza
                </Button>
            </DialogContent>
        </Dialog>
    );
}

export default ParticipateDialog;
