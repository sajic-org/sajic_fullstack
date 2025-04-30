import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Speaker } from '@/types/models';
import { useForm, usePage } from '@inertiajs/react';
import { PlusIcon, UploadIcon } from 'lucide-react';
import { FormEventHandler, useEffect } from 'react';
import InputError from './input-error';
import { DialogTrigger } from './ui/dialog';
import { Textarea } from './ui/textarea';

function AddSpeakerDialog({ speakers, onSetSelectedSpeaker }: { createdSpeaker?: Speaker }) {
    interface SpeakerForm {
        image: string;
        name: string;
        description: string;
    }
    const { flash } = usePage().props;

    if (flash?.newSpeaker) {
        console.log('New Speaker:', flash?.newSpeaker);
    }

    useEffect(() => {
        if (flash?.newSpeaker) {
            onSetSelectedSpeaker(flash.newSpeaker);
        }
    }, [flash.newSpeaker]);

    const { data, setData, post, errors } = useForm<Required<SpeakerForm>>();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('speakers.store', data), {
            preserveScroll: true,
            onSuccess: () => {
                console.log('Flash:', flash.newSpeaker);
                if (flash.newSpeaker) {
                    onSetSelectedSpeaker(flash.newSpeaker);
                }
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
                                    onChange={(e) => setData('image', e.target.files[0])}
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
                        {/* {errors.image || errors.name || errors.description ? (
                            <Button className="bg-gray-600 hover:bg-gray-600">Salvar</Button>
                        ) : (
                            <DialogClose type="submit">
                                <Button>Salvar</Button>
                            </DialogClose>
                        )} */}
                        <DialogClose type="submit">
                            <Button>Salvar</Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default AddSpeakerDialog;
