'use client';

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from '@/components/ui/select';

export interface Room {
    number: string;
    capacity: number;
}

export function RoomDropdown({ children, rooms, onSetData }: { children: React.ReactNode; rooms: Room[]; onSetData: any }) {
    return (
        <Select
            onValueChange={(value) => {
                onSetData('room_number', value);
            }}
        >
            <SelectTrigger className="w-full">{children}</SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Salas</SelectLabel>
                    {rooms.map((room: Room) => {
                        return (
                            <>
                                <SelectItem value={room.number} key={room.number} className="flex justify-between">
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
