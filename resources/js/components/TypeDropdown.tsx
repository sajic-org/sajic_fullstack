'use client';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
} from '@/components/ui/select';
import { LectureForm } from '@/pages/new-lecture-form';
import { useForm } from '@inertiajs/react';
import { CornerDownLeft } from 'lucide-react';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { Input } from './ui/input';

interface Props {
    availableTypes: string[];
    onSetAvailableTypes: Dispatch<SetStateAction<string[]>>;
    defaultValue?: string;
    children: React.ReactNode;
    onSetData: ReturnType<typeof useForm<Required<LectureForm>>>['setData'];
}

export function TypeDropdown({
    availableTypes,
    onSetAvailableTypes,
    children,
    onSetData,
    defaultValue,
}: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [newType, setNewType] = useState('');

    const handleAddType = () => {
        if (newType.trim()) {
            onSetAvailableTypes((availableTypes) => [
                ...availableTypes,
                newType.trim(),
            ]);
            onSetData('type', newType.trim());
            setNewType('');
            inputRef.current?.focus();
        }
    };

    return (
        <Select
            defaultValue={defaultValue}
            onValueChange={(value) => onSetData('type', value)}
        >
            <SelectTrigger className="w-full">{children}</SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Categoria</SelectLabel>
                    {availableTypes.map((type) => {
                        return (
                            <SelectItem
                                key={type}
                                value={type}
                                className="flex justify-between"
                            >
                                {type}
                            </SelectItem>
                        );
                    })}
                    <div className="flex gap-1 p-2">
                        <Input
                            placeholder="Nova Categoria"
                            value={newType}
                            onChange={(e) => setNewType(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAddType();
                                }
                            }}
                            ref={inputRef}
                        />
                        <CornerDownLeft
                            size={20}
                            onClick={handleAddType}
                            className="border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex h-9 w-fit cursor-pointer rounded-md border bg-transparent px-2 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        />
                    </div>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
