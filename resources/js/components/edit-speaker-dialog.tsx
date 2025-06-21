import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LectureForm } from '@/pages/new-lecture-form';
import { Speaker } from '@/types/models';
import { InertiaFormProps, useForm, usePage } from '@inertiajs/react';
import { SquarePen } from 'lucide-react';
import { Dispatch, FormEventHandler, SetStateAction, useEffect } from 'react';
import { toast } from 'sonner';
import ConfirmSpeakerDeletionAlert from './confirm-speaker-deletion-alert';
import InputError from './input-error';
import { DialogTrigger } from './ui/dialog';
import { Textarea } from './ui/textarea';

interface Props {
    onSetSelectedSpeaker: Dispatch<SetStateAction<Speaker | undefined>>;
    onSetData: InertiaFormProps<Required<LectureForm>>['setData'];
    speaker: Speaker;
}

export default function EditSpeakerDialog({ onSetSelectedSpeaker, onSetData, speaker, }: Props) {
    interface SpeakerForm {
        name: string;
        description: string;
    }

    const { flash } = usePage().props;

    useEffect(() => {
        if (flash?.newSpeaker) {
            onSetData('speaker_id', flash.newSpeaker.id);
            onSetSelectedSpeaker(flash.newSpeaker);
        }
    }, [flash.newSpeaker, onSetData, onSetSelectedSpeaker]);

    const { data, setData, patch, errors } = useForm<Required<SpeakerForm>>({
        name: speaker.name,
        description: speaker.description,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('speakers.update', { speaker: speaker }), {
            preserveScroll: true,
            onSuccess: () => {
                if (Object.keys(errors).length === 0) {
                    //@ts-expect-error não quero entender
                    document.querySelector('[data-dialog-close]')?.click();
                }
                toast('Palestrante atualizado!', {
                    description: `Palestrante "${data.name}" foi atualizada com sucesso!`,
                });
            },
            onError: (errors) => {
                toast.error('Erro ao atualizar palestrante.');
                console.error(errors);
            },
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild className="mt-2">
                <div onClick={(e) => e.stopPropagation()}>
                    <SquarePen className="size-5 cursor-pointer" />
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]" onClick={(e) => e.stopPropagation()}>
                <DialogHeader>
                    <DialogTitle>Editar Palestrante</DialogTitle>
                </DialogHeader>

                <form onSubmit={submit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Nome
                            </Label>
                            <Input
                                id="name"
                                defaultValue={speaker.name}
                                required
                                onChange={(e) => setData('name', e.target.value)}
                                className="col-span-3"
                            />
                            <InputError message={errors.name} className="col-span-3 col-start-2" />
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="description" className="mt-2 text-right">
                                Sobre
                            </Label>
                            <Textarea
                                required
                                id="description"
                                name="description"
                                className="col-span-3"
                                defaultValue={speaker.description}
                                onChange={(e) => setData('description', e.target.value)}
                            />
                            <InputError message={errors.description} className="col-span-3 col-start-2" />
                        </div>
                    </div>
                    <DialogFooter>
                        <ConfirmSpeakerDeletionAlert speaker={speaker} />
                        <Button type="submit">Salvar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
