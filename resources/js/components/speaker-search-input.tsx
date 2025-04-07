import { Alert, AlertDescription } from '@/components/ui/alert';
import { useEffect, useState } from 'react';
import AddSpeakerDialog from './add-speaker-dialog';
import { Input } from './ui/input';

function SpeakerSearchInput({ onSetData, speakers }) {
    const [query, setQuery] = useState('');
    const [filteredSpeakers, setFilteredSpeakers] = useState([]);

    console.log(speakers);

    useEffect(() => {
        const results = speakers.filter((s) => s.name.toLowerCase().includes(query));
        setFilteredSpeakers(results);
    }, [query, speakers]);

    return (
        <div className="relative">
            <Input
                id="speaker"
                type="text"
                className="mt-1 block w-full"
                onChange={(e) => setQuery(e.target.value)}
                required
                placeholder="Encontre por nome"
            />

            {filteredSpeakers && (
                <Alert className="absolute left-8 mt-2 max-w-md sm:min-w-[100px]">
                    {speakers.map((s) => {
                        return (
                            <AlertDescription
                                className="my-2 flex items-center gap-2 text-base"
                                key={s.id}
                                onClick={() => {
                                    onSetData('speaker_id', s.id);
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
