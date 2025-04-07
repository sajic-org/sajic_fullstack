'use client';

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from '@/components/ui/select';

export function RoomDropdown({ children, rooms, onSetData }) {
    return (
        <Select>
            <SelectTrigger className="w-full">{children}</SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Salas</SelectLabel>
                    {rooms.map((room) => {
                        return (
                            <>
                                <SelectItem
                                    value={room.number}
                                    key={room.number}
                                    onClick={() => onSetData('room_number', room.number)}
                                    className="flex justify-between"
                                >
                                    {room.number}
                                    <p className="text-xs font-medium">cap.: 35</p>
                                </SelectItem>
                            </>
                        );
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
