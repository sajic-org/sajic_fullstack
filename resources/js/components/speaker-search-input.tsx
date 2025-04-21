import { Alert, AlertDescription } from '@/components/ui/alert';
import { LectureForm } from '@/pages/new-lecture-form';
import { Speaker } from '@/types/models';
import { InertiaFormProps } from '@inertiajs/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import AddSpeakerDialog from './add-speaker-dialog';
import { Input } from './ui/input';

function SpeakerSearchInput({
    onSetData,
    speakers,
    onSetSelectedSpeaker,
}: {
    onSetData: InertiaFormProps<LectureForm>['setData'];
    speakers: Speaker[];
    onSetSelectedSpeaker: Dispatch<SetStateAction<Speaker | undefined>>;
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
                <Alert className="absolute left-8 mt-2 max-w-md sm:min-w-[100px]">
                    {filteredSpeakers.map((s) => {
                        return (
                            <AlertDescription
                                className="my-2 flex cursor-pointer items-center gap-2 text-base"
                                key={s.id}
                                onClick={() => {
                                    onSetData('speaker_id', s.id);
                                    onSetSelectedSpeaker(s);
                                }}
                            >
                                <img src={s.image} className="size-7 rounded-full" /> {s.name}
                            </AlertDescription>
                        );
                    })}

                    <AddSpeakerDialog />
                </Alert>
            )}
        </div>
    );
}

export default SpeakerSearchInput;
