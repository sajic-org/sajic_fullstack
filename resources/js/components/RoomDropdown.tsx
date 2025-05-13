'use client';

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from '@/components/ui/select';
import { Info } from 'lucide-react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import UnavailableRoomInfo from './unavailable-room-info';

export interface Room {
    number: string;
    capacity: number;
}

export function RoomDropdown({ children, rooms, onSetData }: { children: React.ReactNode; rooms: Room[]; onSetData: any }) {
    const [showInfo, setShowInfo] = useState<string>();
    const portalRoot = document.body;

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
                            <div>
                                <SelectItem value={room.number} key={room.number}>
                                    <div className="pointer-events-none flex w-full items-center justify-between">
                                        <div className="pointer-events-auto mr-2 flex items-center gap-1">
                                            {room.number}
                                            <p className="text-xs font-medium">cap.: {room.capacity}</p>
                                        </div>
                                        <div
                                            onMouseEnter={() => setShowInfo(room.number)}
                                            onMouseLeave={() => setShowInfo('')}
                                            className="pointer-events-auto"
                                        >
                                            <Info strokeWidth={2.5} size={20} />
                                        </div>
                                    </div>
                                </SelectItem>
                                {portalRoot &&
                                    createPortal(
                                        <UnavailableRoomInfo room={room} className={showInfo == room.number ? 'block' : 'hidden'} />,
                                        portalRoot,
                                    )}
                            </div>
                        );
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
