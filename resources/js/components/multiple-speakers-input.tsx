import { Alert, AlertDescription } from '@/components/ui/alert';
import { LectureForm } from '@/pages/new-lecture-form';
import { Speaker } from '@/types/models';
import { InertiaFormProps } from '@inertiajs/react';
import { X } from 'lucide-react';
import {
    Dispatch,
    ReactNode,
    SetStateAction,
    useEffect,
    useState,
} from 'react';
import EditSpeakerDialog from './edit-speaker-dialog';
import { Input } from './ui/input';

function MultipleSpeakersInput({
    onSetData,
    speakers,
    selectedSpeakers,
    onSetSelectedSpeakers,
    children,
}: {
    onSetData: InertiaFormProps<LectureForm>['setData'];
    speakers: Speaker[];
    selectedSpeakers: Speaker[];
    onSetSelectedSpeakers: Dispatch<SetStateAction<Speaker[]>>;
    children: ReactNode;
}) {
    const [query, setQuery] = useState('');
    const [filteredSpeakers, setFilteredSpeakers] = useState<Speaker[]>([]);

    useEffect(() => {
        // Filtra speakers que ainda não foram selecionados
        const selectedIds = selectedSpeakers.map((s) => s.id);
        const results = speakers.filter(
            (s: Speaker) =>
                s.name.toLowerCase().includes(query.toLowerCase()) &&
                !selectedIds.includes(s.id),
        );
        setFilteredSpeakers(results);
    }, [query, speakers, selectedSpeakers]);

    const handleAddSpeaker = (speaker: Speaker) => {
        if (!selectedSpeakers.find((s) => s.id === speaker.id)) {
            const newSelected = [...selectedSpeakers, speaker];
            onSetSelectedSpeakers(newSelected);
            onSetData(
                'speaker_ids',
                newSelected.map((s) => s.id),
            );
            setQuery('');
        }
    };

    const handleRemoveSpeaker = (speakerId: number) => {
        const newSelected = selectedSpeakers.filter((s) => s.id !== speakerId);
        onSetSelectedSpeakers(newSelected);
        onSetData(
            'speaker_ids',
            newSelected.map((s) => s.id),
        );
    };

    return (
        <div className="space-y-2">
            {/* Lista de palestrantes selecionados */}
            {selectedSpeakers.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {selectedSpeakers.map((speaker) => (
                        <div
                            key={speaker.id}
                            className="bg-muted flex items-center gap-2 rounded-md border px-3 py-1.5"
                        >
                            <img
                                src={speaker.image}
                                alt={speaker.name}
                                className="size-6 rounded-full object-cover"
                            />
                            <span className="text-sm">{speaker.name}</span>
                            <button
                                type="button"
                                onClick={() => handleRemoveSpeaker(speaker.id)}
                                className="text-muted-foreground hover:text-foreground ml-1"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Campo de busca */}
            <div className="relative">
                <Input
                    id="speaker"
                    type="text"
                    className="mt-1 block w-full"
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                    autoComplete="off"
                    placeholder="Buscar palestrante por nome"
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
                                    onClick={() => handleAddSpeaker(s)}
                                >
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={s.image}
                                            className="size-7 rounded-full object-cover"
                                        />{' '}
                                        <span>{s.name}</span>
                                    </div>

                                    <EditSpeakerDialog
                                        onSetSelectedSpeaker={(speaker) => {
                                            // Atualiza o speaker na lista
                                            const updated =
                                                selectedSpeakers.map((sel) =>
                                                    sel.id === speaker.id
                                                        ? speaker
                                                        : sel,
                                                );
                                            onSetSelectedSpeakers(updated);
                                            onSetData(
                                                'speaker_ids',
                                                updated.map((s) => s.id),
                                            );
                                        }}
                                        onSetData={onSetData}
                                        speaker={s}
                                    />
                                </AlertDescription>
                            );
                        })}
                        {children}
                    </Alert>
                )}
            </div>
        </div>
    );
}

export default MultipleSpeakersInput;
