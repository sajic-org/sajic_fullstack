import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LectureForm } from '@/pages/new-lecture-form';
import { Speaker } from '@/types/models';
import { InertiaFormProps, useForm, usePage } from '@inertiajs/react';
import { PlusIcon, UploadIcon } from 'lucide-react';
import { Dispatch, FormEventHandler, SetStateAction, useEffect } from 'react';
import { toast } from 'sonner';
import InputError from './input-error';
import { DialogTrigger } from './ui/dialog';
import { Textarea } from './ui/textarea';

function AddSpeakerDialog({
    onSetSelectedSpeaker,
    onSetData,
}: {
    onSetSelectedSpeaker: Dispatch<SetStateAction<Speaker | undefined>>;
    onSetData: InertiaFormProps<LectureForm>['setData'];
}) {
    interface SpeakerForm {
        image: string;
        name: string;
        description: string;
    }

    const { flash } = usePage().props;

    useEffect(() => {
        if (flash?.newSpeaker) {
            onSetData('speaker_id', flash.newSpeaker.id);
            onSetSelectedSpeaker(flash.newSpeaker);
        }
    }, [flash.newSpeaker]);

    const { data, setData, post, errors } = useForm<Required<SpeakerForm>>();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('speakers.store', data), {
            preserveScroll: true,
            onSuccess: () => {
                if (Object.keys(errors).length === 0) {
                    document.querySelector('[data-dialog-close]')?.click();
                }
                toast('Palestrante adicionado!', {
                    description: `Palestrante ${data.name} foi adicionado com sucesso!`,
                });
            },
            onError: (errors) => {
                toast.error('Erro ao adicionar palestrante.');
                console.error(errors);
            },
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild className="mt-2">
                <Button variant="outline" className="w-fit">
                    <PlusIcon className="mt-0.5 size-4" />
                    Adicionar Palestrante
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Novo Palestrante</DialogTitle>
                </DialogHeader>

                <form onSubmit={submit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="image" className="mt-6 text-right">
                                Foto
                            </Label>

                            <div className="shadow-l-sm relative col-span-3 m-auto mt-4 flex aspect-square w-1/2 flex-col justify-center rounded-lg opacity-50 shadow-sm shadow-gray-600">
                                <UploadIcon className="m-auto" />
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    required
                                    onChange={(e) => setData('image', e.target.files[0] || null)}
                                    className="absolute h-full w-full cursor-pointer opacity-0"
                                />
                            </div>
                            {data.image && <p className="text-light-text col-span-5 pl-20 text-center">Imagem Selecionada</p>}
                            <InputError message={errors.image} className="col-span-3 col-start-2" />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Nome
                            </Label>
                            <Input id="name" required onChange={(e) => setData('name', e.target.value)} className="col-span-3" />
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
                                onChange={(e) => setData('description', e.target.value)}
                            />
                            <InputError message={errors.description} className="col-span-3 col-start-2" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Salvar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default AddSpeakerDialog;
