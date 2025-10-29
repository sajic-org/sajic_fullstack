import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LectureForm } from '@/pages/new-lecture-form';
import { Speaker } from '@/types/models';
import { InertiaFormProps, useForm } from '@inertiajs/react';
import { SquarePen, UploadIcon } from 'lucide-react';
import { Dispatch, FormEventHandler, SetStateAction, useState } from 'react';
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

interface PartialSpeakerForm {
    image?: File;
    image_link?: string;
    name: string;
    description: string;
}

export default function EditSpeakerDialog({ speaker }: Props) {
    const [imagePreview, setImagePreview] = useState<string | undefined>(
        speaker.image,
    );

    const { data, setData, post, errors } = useForm<
        Required<PartialSpeakerForm>
    >({
        name: speaker.name,
        description: speaker.description,
        image: null,
        image_link: speaker.image || '',
        _method: 'PATCH',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('speakers.update', { speaker: speaker }), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                if (Object.keys(errors).length === 0) {
                    //@ts-expect-error não quero entender
                    document.querySelector('[data-dialog-close]')?.click();
                }
                toast('Palestrante atualizado!', {
                    description: `Palestrante "${data.name}" foi atualizado com sucesso!`,
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
            <DialogTrigger
                asChild
                className="mt-2"
            >
                <div onClick={(e) => e.stopPropagation()}>
                    <SquarePen className="size-5 cursor-pointer" />
                </div>
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-[425px]"
                onClick={(e) => e.stopPropagation()}
            >
                <DialogHeader>
                    <DialogTitle>Editar Palestrante</DialogTitle>
                </DialogHeader>

                <form onSubmit={submit}>
                    <div className="grid gap-8 py-4">
                        <div className="grid grid-cols-4 items-start gap-2">
                            <Label
                                htmlFor="image"
                                className="mt-6 text-right"
                            >
                                Foto
                            </Label>

                            <div className="relative col-span-3 m-auto mt-4 flex aspect-square w-1/2 flex-col justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 shadow-sm transition-all hover:border-gray-400 hover:bg-gray-100">
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="h-full w-full rounded-lg object-cover"
                                    />
                                ) : (
                                    <>
                                        <UploadIcon className="m-auto h-8 w-8 text-gray-400" />
                                        <p className="mb-2 text-center text-xs text-gray-500">
                                            Clique para selecionar uma imagem
                                        </p>
                                    </>
                                )}
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setData('image', file);
                                            setData('image_link', '');

                                            setImagePreview(
                                                URL.createObjectURL(file),
                                            );
                                        }
                                    }}
                                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                                />
                            </div>
                            <div className="text-muted-foreground col-span-3 col-start-2 grid grid-cols-3 items-center gap-1 text-center">
                                <hr />
                                <p>OU</p>
                                <hr />
                            </div>

                            <Input
                                className="col-span-3 col-start-2"
                                placeholder="Cole o link da imagem"
                                defaultValue={speaker.image}
                                onChange={(e) => {
                                    setData('image_link', e.target.value);
                                    if (e.target.value) {
                                        setImagePreview(e.target.value);
                                    }
                                }}
                            />

                            <InputError
                                message={errors.image}
                                className="col-span-3 col-start-2"
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                                htmlFor="name"
                                className="text-right"
                            >
                                Nome
                            </Label>
                            <Input
                                id="name"
                                defaultValue={speaker.name}
                                required
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                className="col-span-3"
                            />
                            <InputError
                                message={errors.name}
                                className="col-span-3 col-start-2"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label
                                htmlFor="description"
                                className="mt-2 text-right"
                            >
                                Sobre
                            </Label>
                            <Textarea
                                required
                                id="description"
                                name="description"
                                className="col-span-3"
                                defaultValue={speaker.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                            />
                            <InputError
                                message={errors.description}
                                className="col-span-3 col-start-2"
                            />
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
