import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { router } from '@inertiajs/react';
import { GraduationCap } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from './ui/button';

function ParticipateDialog({ lecture }) {
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
                        router.post(
                            route('user.attend-lecture'),
                            { id: lecture.id },
                            {
                                onSuccess: () => {
                                    toast('Inscrição realizada!', {
                                        // dar a opcao de cancelar
                                        description: `Você agora está inscrito na palestra "${lecture.title}"`,
                                    });
                                },
                                onError: (errors) => {
                                    toast.error('Erro ao se inscrever.');
                                    console.error(errors);
                                },
                            },
                        );
                    }}
                >
                    Tenho Certeza
                </Button>
            </DialogContent>
        </Dialog>
    );
}

export default ParticipateDialog;
