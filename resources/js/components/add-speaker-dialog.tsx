import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { PlusIcon, UploadIcon } from 'lucide-react';
import { FormEventHandler } from 'react';
import { DialogTrigger } from './ui/dialog';
import { Textarea } from './ui/textarea';

function AddSpeakerDialog() {
    interface SpeakerForm {
        image: string;
        name: string;
        description: string;
    }

    const { data, setData, post } = useForm<Required<SpeakerForm>>();

    const submit: FormEventHandler = (e) => {
        console.log(data);

        e.preventDefault();

        post(route('speakers.store', data), {
            preserveScroll: true,
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
                            <Label htmlFor="picture" className="mt-6 text-right">
                                Foto
                            </Label>

                            <div className="shadow-l-sm relative col-span-3 m-auto my-4 flex aspect-square w-1/2 flex-col justify-center rounded-lg opacity-50 shadow-sm shadow-gray-600">
                                <UploadIcon className="m-auto" />
                                <input
                                    type="file"
                                    id="picture"
                                    name="image"
                                    onChange={(e) => setData('image', e.target.files[0])}
                                    className="absolute h-full w-full cursor-pointer opacity-0"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Nome
                            </Label>
                            <Input id="name" onChange={(e) => setData('name', e.target.value)} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="description" className="mt-2 text-right">
                                Sobre
                            </Label>
                            <Textarea
                                id="description"
                                name="description"
                                className="col-span-3"
                                onChange={(e) => setData('description', e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose>
                            <Button type="submit">Salvar</Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default AddSpeakerDialog;
