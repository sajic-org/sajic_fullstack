import { Button } from '@/components/ui/button';
import { Speaker } from '@/types/models';
import { router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from './ui/alert-dialog';

export default function ConfirmSpeakerDeletionAlert({ speaker }: { speaker: Speaker }) {
    function confirmDeletion() {
        router.delete(route('speakers.destroy', { speaker: speaker }), {
            preserveScroll: true,
            onSuccess: () => {
                toast('Palestrante removido', {
                    description: `Palestrante ${speaker.name} e suas palestras foram removidas.`,
                });
            },
            onError: (errors) => {
                toast.error('Erro ao remover palestrante.');
                console.error(errors);
            },
        });
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive">
                    Remover <Trash2 />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Tens Certeza</AlertDialogTitle>
                    <AlertDialogDescription>
                        Essa ação não pode ser desfeita. Isso irá permanentemente excluir o(a) palestrante e todas as palestras atreladas a ele(a).
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <Button variant="destructive" onClick={confirmDeletion}>
                        Remover
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
