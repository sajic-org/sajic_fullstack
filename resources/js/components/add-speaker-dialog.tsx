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
import { InertiaFormProps, useForm, usePage } from '@inertiajs/react';
import { PlusIcon, UploadIcon } from 'lucide-react';
import {
    Dispatch,
    FormEventHandler,
    SetStateAction,
    useEffect,
    useState,
} from 'react';
import { toast } from 'sonner';
import InputError from './input-error';
import { DialogTrigger } from './ui/dialog';
import { Textarea } from './ui/textarea';

interface Props {
    onSetSelectedSpeaker: Dispatch<SetStateAction<Speaker | undefined>>;
    onSetData: InertiaFormProps<LectureForm>['setData'];
}

interface SpeakerForm {
    id: number;
    image?: File;
    image_link?: string;
    name: string;
    description: string;
}

export interface flashPage {
    flash: {
        newSpeaker: {
            id: number;
            image?: string;
            name: string;
            image_link?: string;
            description: string;
        };
    };
}

function AddSpeakerDialog({ onSetSelectedSpeaker, onSetData }: Props) {
    const [areImageOrLinkSelected, setAreImageOrLinkSelected] = useState(false);

    const { flash } = usePage<Required<flashPage>>().props;

    useEffect(() => {
        if (flash?.newSpeaker) {
            onSetData('speaker_id', flash.newSpeaker.id);
            onSetSelectedSpeaker(flash.newSpeaker);
        }
    }, [flash.newSpeaker, onSetData, onSetSelectedSpeaker]);

    const { data, setData, post, errors } = useForm<Required<SpeakerForm>>();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (!areImageOrLinkSelected) {
            toast.error('Erro ao criar palestrante!', {
                description: `Uma imagem ou um link de uma imagem devem ser inseridos.`,
            });
        } else {
            post(route('speakers.store', data), {
                preserveScroll: true,
                onSuccess: () => {
                    if (Object.keys(errors).length === 0) {
                        //@ts-expect-error não quero entender
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
        }
    };

    return (
        <Dialog>
            <DialogTrigger
                asChild
                className="mt-2"
            >
                <Button
                    variant="outline"
                    className="w-fit"
                >
                    <PlusIcon className="mt-0.5 size-4" />
                    Adicionar Palestrante
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Novo Palestrante</DialogTitle>
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
                                {data.image ? (
                                    <img
                                        src={URL.createObjectURL(data.image)}
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
                                        setData(
                                            'image',
                                            e.target.files?.[0] || null,
                                        );

                                        setAreImageOrLinkSelected(true);
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
                                onChange={(e) => {
                                    setData('image_link', e.target.value);
                                    e.target.value &&
                                        setAreImageOrLinkSelected(true);
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
                        <Button type="submit">Salvar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default AddSpeakerDialog;
