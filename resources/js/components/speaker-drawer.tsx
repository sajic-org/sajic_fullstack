import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CircleDashed } from 'lucide-react';

function SpeakerDialog({ children, speaker }) {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px] md:max-w-3xl">
                <DialogHeader className="p-4">
                    <DialogTitle>
                        <h3 className="text-primary-blue text-xl">{speaker.name}</h3>
                    </DialogTitle>
                    <div className="flex items-center gap-4">
                        <img
                            src="https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80"
                            alt={`Foto de ${speaker.name}`}
                            className="aspect-square rounded-xl object-cover object-center md:max-w-1/3"
                        />
                        <DialogDescription className="px-4">{speaker.description}</DialogDescription>
                    </div>
                </DialogHeader>
                <ul className="px-4 pb-4">
                    <h4 className="text-lg font-bold text-neutral-800">
                        Palestras de <span className="text-primary-blue">{speaker.name}</span>
                    </h4>

                    {speaker.lectures.map((item, index) => {
                        return (
                            <li className="m-2 text-neutral-600">
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
