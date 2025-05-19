import { Alert, AlertDescription } from '@/components/ui/alert';
import { LectureForm } from '@/pages/new-lecture-form';
import { Speaker } from '@/types/models';
import { InertiaFormProps } from '@inertiajs/react';
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import EditSpeakerDialog from './edit-speaker-dialog';
import { Input } from './ui/input';

function SpeakerSearchInput({
    onSetData,
    speakers,
    onSetSelectedSpeaker,
    children,
}: {
    onSetData: InertiaFormProps<LectureForm>['setData'];
    speakers: Speaker[];
    onSetSelectedSpeaker: Dispatch<SetStateAction<Speaker | undefined>>;
    children: ReactNode;
}) {
    const [query, setQuery] = useState('');
    const [filteredSpeakers, setFilteredSpeakers] = useState<Speaker[]>([]);

    useEffect(() => {
        const results = speakers.filter((s: Speaker) => s.name.toLowerCase().includes(query.toLowerCase()));
        setFilteredSpeakers(results);
    }, [query, speakers]);

    return (
        <div className="relative">
            <Input
                id="speaker"
                type="text"
                className="mt-1 block w-full"
                onChange={(e) => setQuery(e.target.value)}
                autoComplete="off"
                placeholder="Encontre por nome"
            />

            {query && (
                <Alert className="absolute left-8 z-40 mt-2 max-w-md sm:min-w-[100px]">
                    {filteredSpeakers.length === 0 && (
                        <AlertDescription className="my-2 flex cursor-pointer items-center gap-2 pl-1 text-base font-medium">
                            Nenhum palestrante encontrado
                        </AlertDescription>
                    )}
                    {filteredSpeakers.map((s) => {
                        return (
                            <AlertDescription
                                className="my-2 flex cursor-pointer items-center justify-between text-base"
                                key={s.id}
                                onClick={() => {
                                    onSetData('speaker_id', s.id);
                                    onSetSelectedSpeaker(s);
                                }}
                            >
                                <div className="flex items-center gap-2">
                                    <img src={s.image} className="size-7 rounded-full object-cover" /> <span>{s.name}</span>
                                </div>

                                <EditSpeakerDialog onSetSelectedSpeaker={onSetSelectedSpeaker} onSetData={onSetData} speaker={s} />
                            </AlertDescription>
                        );
                    })}
                    {children}
                </Alert>
            )}
        </div>
    );
}

export default SpeakerSearchInput;
