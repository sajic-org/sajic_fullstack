import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusIcon, UploadIcon } from 'lucide-react';
import { DialogTrigger } from './ui/dialog';
import { Textarea } from './ui/textarea';

function AddSpeakerDialog() {
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

                <form action="">
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="picture" className="mt-6 text-right">
                                Foto
                            </Label>

                            <div className="shadow-l-sm relative col-span-3 m-auto my-4 flex aspect-square w-1/2 flex-col justify-center rounded-lg opacity-50 shadow-sm shadow-gray-600">
                                <UploadIcon className="m-auto" />
                                <input type="file" id="picture" src="" alt="" className="absolute h-full w-full cursor-pointer opacity-0" />
                            </div>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Nome
                            </Label>
                            <Input id="name" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="about" className="mt-2 text-right">
                                Sobre
                            </Label>
                            <Textarea id="about" className="col-span-3" />
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
