import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { GraduationCap, Link } from 'lucide-react';
import { Button } from './ui/button';

function ParticipateDialog({ lecture }) {
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
                <Link
                    href={route('user.attend-lecture')}
                    method="post"
                    data={lecture}
                    // onClick={() => {
                    //     toast('Agora você está inscrito', {
                    //         description: 'à palestra The Pursuit of Knowledge',
                    //         action: {
                    //             label: 'Cancelar',
                    //             onClick: () => console.log('TODO'),
                    //         },
                    //     });
                    // }}
                >
                    Tenho Certeza
                </Link>
            </DialogContent>
        </Dialog>
    );
}

export default ParticipateDialog;
