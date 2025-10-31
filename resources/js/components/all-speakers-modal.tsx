import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Speaker } from '@/types/models';
import { CircleDashed } from 'lucide-react';
import { ReactNode, useState } from 'react';

interface AllSpeakersModalProps {
    speakers: Speaker[];
    children: ReactNode;
}

function AllSpeakersModal({ speakers, children }: AllSpeakersModalProps) {
    const [open, setOpen] = useState(false);
    const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(
        null,
    );

    return (
        <>
            <Dialog
                open={open}
                onOpenChange={setOpen}
            >
                <DialogTrigger asChild>{children}</DialogTrigger>
                <DialogContent className="max-h-[85vh] overflow-y-scroll sm:max-w-[700px]">
                    <DialogHeader>
                        <DialogTitle className="text-primary-blue text-2xl">
                            Todos os Palestrantes ({speakers.length})
                        </DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-1 gap-3 py-4 sm:grid-cols-2">
                        {speakers.map((speaker) => (
                            <button
                                key={speaker.id}
                                type="button"
                                onClick={() => {
                                    setSelectedSpeaker(speaker);
                                    setOpen(false);
                                }}
                                className="group flex w-full cursor-pointer items-center gap-3 rounded-lg border p-3 text-left transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900"
                            >
                                <img
                                    src={speaker.image}
                                    alt={speaker.name}
                                    className="size-12 rounded-full object-cover"
                                />
                                <span className="group-hover:text-primary-blue font-medium break-words text-neutral-700 dark:text-neutral-300">
                                    {speaker.name}
                                </span>
                            </button>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>

            {/* Modal individual do palestrante selecionado */}
            {selectedSpeaker && (
                <Dialog
                    open={!!selectedSpeaker}
                    onOpenChange={(isOpen) => {
                        if (!isOpen) setSelectedSpeaker(null);
                    }}
                >
                    <DialogContent className="max-h-[95vh] overflow-y-scroll sm:max-w-[450px] md:max-w-3xl">
                        <DialogHeader className="p-4">
                            <DialogTitle className="text-primary-blue text-xl">
                                {selectedSpeaker.name}
                            </DialogTitle>
                            <div className="flex-col items-start gap-4 max-md:flex md:grid md:grid-cols-5">
                                <img
                                    src={selectedSpeaker.image}
                                    alt={`Foto de ${selectedSpeaker.name}`}
                                    className="col-span-2 mx-auto aspect-square w-full rounded-xl object-cover object-center max-md:max-w-sm"
                                />
                                <DialogDescription className="col-span-3 h-full max-w-full text-left sm:px-4">
                                    {selectedSpeaker.description}
                                </DialogDescription>
                            </div>
                        </DialogHeader>

                        {selectedSpeaker.lectures &&
                            selectedSpeaker.lectures.length > 0 && (
                                <ul className="h-60 overflow-y-scroll px-4 pb-4">
                                    <h4 className="text-lg font-bold text-neutral-800">
                                        Palestras de{' '}
                                        <span className="text-primary-blue">
                                            {selectedSpeaker.name}
                                        </span>
                                    </h4>

                                    {selectedSpeaker.lectures.map(
                                        (item, index) => (
                                            <li
                                                className="m-2 text-neutral-600"
                                                key={index}
                                            >
                                                <p className="font-medium">
                                                    {item.date}
                                                </p>

                                                <div className="ml-3 flex items-center gap-2">
                                                    <CircleDashed className="mt-0.5 size-3" />
                                                    <p>{item.title}</p>
                                                </div>
                                            </li>
                                        ),
                                    )}
                                </ul>
                            )}
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}

export default AllSpeakersModal;
