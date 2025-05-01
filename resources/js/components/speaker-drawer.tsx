import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Speaker } from '@/types/models';
import { CircleDashed } from 'lucide-react';
import { ReactNode } from 'react';

function SpeakerDialog({ children, speaker }: { children: ReactNode; speaker: Speaker | undefined }) {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px] md:max-w-3xl">
                <DialogHeader className="p-4">
                    <DialogTitle className="text-primary-blue text-xl">{speaker?.name}</DialogTitle>
                    <div className="grid items-start gap-4 md:grid-cols-5">
                        <img
                            src={speaker?.image}
                            alt={`Foto de ${speaker?.name}`}
                            className="col-span-2 aspect-square w-full rounded-xl object-cover object-center"
                        />
                        <DialogDescription className="col-span-3 h-full max-w-full px-4 break-all">{speaker?.description}</DialogDescription>
                    </div>
                </DialogHeader>
                <ul className="h-60 overflow-y-scroll px-4 pb-4">
                    <h4 className="text-lg font-bold text-neutral-800">
                        Palestras de <span className="text-primary-blue">{speaker?.name}</span>
                    </h4>

                    {speaker?.lectures?.map((item, index) => {
                        return (
                            <li className="m-2 text-neutral-600" key={index}>
                                <p className="font-medium">{item.date}</p>

                                <div className="ml-3 flex items-center gap-2">
                                    <CircleDashed className="mt-0.5 size-3" />
                                    <p>{item.title}</p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </DialogContent>
        </Dialog>
    );
}

export default SpeakerDialog;
