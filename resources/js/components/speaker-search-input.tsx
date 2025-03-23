import { Alert, AlertDescription } from '@/components/ui/alert';
import { useState } from 'react';
import AddSpeakerDialog from './add-speaker-dialog';
import { Input } from './ui/input';

function SpeakerSearchInput({ data, onSetData }) {
    const [query, onSetQuery] = useState('');

    // (e) => onSetData('speaker', e.target.value)
    {
        /* {query && <div className="bg-primary dark:text-primary absolute w-auto p-0 text-white">{query}</div>} */
    }
    return (
        <div className="relative">
            <Input
                id="speaker"
                type="text"
                className="mt-1 block w-full"
                onChange={(e) => onSetQuery(e.target.value)}
                required
                placeholder="Encontre por nome"
            />

            {query && (
                <Alert className="absolute left-8 mt-2 max-w-lg sm:min-w-[100px]">
                    <AlertDescription className="my-3 flex items-center gap-2 text-base">
                        <img src="https://avatars.githubusercontent.com/u/140647677?v=4" className="size-7 rounded-full" /> Gorecockson
                    </AlertDescription>

                    <AlertDescription className="my-3 flex items-center gap-2 text-base">
                        <img src="https://avatars.githubusercontent.com/u/140647677?v=4" className="size-7 rounded-full" /> Gorecockson
                    </AlertDescription>

                    <AlertDescription className="my-3 flex items-center gap-2 text-base">
                        <img src="https://avatars.githubusercontent.com/u/140647677?v=4" className="size-7 rounded-full" /> Gorecockson
                    </AlertDescription>

                    <AddSpeakerDialog />
                </Alert>
            )}
        </div>
    );
}

export default SpeakerSearchInput;
