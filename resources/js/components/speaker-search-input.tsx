import { Alert, AlertDescription } from '@/components/ui/alert';
import { useEffect, useState } from 'react';
import AddSpeakerDialog from './add-speaker-dialog';
import { Input } from './ui/input';

function SpeakerSearchInput({ data, onSetData, speakers }) {
    const [query, setQuery] = useState('');
    const [queryResults, setQueryResults] = useState([]);

    console.log(speakers);

    useEffect(() => {
        const results = speakers.filter((s) => s.name.toLowerCase().includes(query));
        setQueryResults(results);
    }, [query]);

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

            {query && (
                <Alert className="absolute left-8 mt-2 max-w-md sm:min-w-[100px]">
                    <AlertDescription className="my-2 flex items-center gap-2 text-base">
                        <img src="https://avatars.githubusercontent.com/u/140647677?v=4" className="size-7 rounded-full" /> Gorecockson
                    </AlertDescription>

                    {speakers.map((s) => {
                        <AlertDescription
                            className="my-2 flex items-center gap-2 text-base"
                            onClick={() => {
                                onSetData('speaker_id', s.id);
                            }}
                        >
                            <img src="https://avatars.githubusercontent.com/u/140647677?v=4" className="size-7 rounded-full" /> {s.name}
                        </AlertDescription>;
                    })}

                    <AddSpeakerDialog />
                </Alert>
            )}
        </div>
    );
}

export default SpeakerSearchInput;
