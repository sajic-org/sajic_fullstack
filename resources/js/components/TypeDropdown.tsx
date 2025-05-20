'use client';

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from '@/components/ui/select';

export function TypeDropdown({ children, onSetData, defaultValue }: { defaultValue?: string }) {
    return (
        <Select defaultValue={defaultValue} onValueChange={(value) => onSetData('type', value)}>
            <SelectTrigger className="w-full">{children}</SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Tipo</SelectLabel>

                    <SelectItem value="Tecnologia" className="flex justify-between">
                        Tecnologia
                    </SelectItem>

                    <SelectItem value="Gestão e Mercado" className="flex justify-between">
                        Gestão e Mercado
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
