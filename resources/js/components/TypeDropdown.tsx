'use client';

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from '@/components/ui/select';

export function TypeDropdown({ children, onSetData }) {
    return (
        <Select>
            <SelectTrigger className="w-full">{children}</SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Tipo</SelectLabel>

                    <SelectItem value="tecnologia" onClick={() => onSetData('type', 'tecnologia')} className="flex justify-between">
                        Tecnologia
                    </SelectItem>

                    <SelectItem value="Gestão e Mercado" onClick={() => onSetData('type', 'Gestão e Mercado')} className="flex justify-between">
                        Gestão e Mercado
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
