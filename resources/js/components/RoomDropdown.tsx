'use client';

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from '@/components/ui/select';
import { Info } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import UnavailableRoomInfo from './unavailable-room-info';

export interface Room {
    number: string;
    capacity: number;
}

export function RoomDropdown({ children, rooms, onSetData }: { children: React.ReactNode; rooms: Room[]; onSetData: any }) {
    const [showInfo, setShowInfo] = useState(false);
    const portalRoot = document.getElementById('portal-root');

    useEffect(() => {
        console.log(showInfo);
    }, [showInfo]);
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
                                <SelectItem value={room.number} key={room.number} className="flex justify-between">
                                    <div className="flex w-full gap-2">
                                        {room.number}
                                        <p className="text-xs font-medium">cap.: {room.capacity}</p>
                                    </div>
                                    <div>
                                        <Info
                                            strokeWidth={2.5}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setShowInfo(true);
                                            }}
                                        />
                                    </div>
                                </SelectItem>
                                {portalRoot && createPortal(<UnavailableRoomInfo className={showInfo ? 'block' : 'hidden'} />, portalRoot)}
                            </div>
                        );
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
