import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { GraduationCap } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from './ui/button';

function ParticipateDialog() {
    return (
        <Dialog>
            <DialogTrigger>
                <Button>
                    Participar
                    <GraduationCap className="size-5" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tem certeza?</DialogTitle>
                    <DialogDescription>Você será adicionado à lista de participantes e levará na bundinha se não comparecer</DialogDescription>
                </DialogHeader>
                <Button
                    className="ml-auto w-fit px-8"
                    onClick={() =>
                        toast('Agora você está inscrito', {
                            description: 'à palestra The Pursuit of Knowledge',
                            action: {
                                label: 'Cancelar',
                                onClick: () => console.log('Cancelar'),
                            },
                        })
                    }
                >
                    Tenho Certeza
                </Button>
            </DialogContent>
        </Dialog>
    );
}

export default ParticipateDialog;
