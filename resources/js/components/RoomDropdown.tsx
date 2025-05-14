'use client';

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from '@/components/ui/select';
import { isRoomAvailable, lecturesConflicting } from '@/lib/utils';
import { Info } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import UnavailableRoomWarning from './unavailable-room-warning';

export interface Room {
    number: string;
    capacity: number;
}

export function RoomDropdown({ children, rooms, onSetData, data }: { children: React.ReactNode; rooms: Room[]; onSetData: any }) {
    const [showInfo, setShowInfo] = useState<string>();
    const [isAvailable, setIsAvailable] = useState<boolean>(true);
    const portalRoot = document.getElementById('portal-root');

    function onSetRoom(number) {
        if (data.date && data.starts && data.ends) {
            const room = rooms.filter((r) => r.number == number)[0];

            const check = isRoomAvailable({
                room: room,
                date: data.date,
                starts: data.starts,
                ends: data.ends,
            });

            setIsAvailable(check);
        }
    }

    useEffect(() => {
        if (data.room_number) {
            onSetRoom(data.room_number);
        }
    }, [data.date, data.starts, data.ends, data.room_number]);

    return (
        <Select
            onValueChange={(value) => {
                onSetData('room_number', value);
                onSetRoom(value);
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
                                    </div>
                                </SelectItem>
                            </div>
                        );
                    })}

                    {!isAvailable &&
                        portalRoot &&
                        createPortal(
                            <div
                                onMouseEnter={() => setShowInfo(data.room_number)}
                                onMouseLeave={() => setShowInfo('')}
                                className="pointer-events-auto"
                            >
                                <Info strokeWidth={2.5} size={15} />
                            </div>,
                            portalRoot,
                        )}

                    {data.room_number &&
                        portalRoot &&
                        createPortal(
                            <UnavailableRoomWarning
                                room={data.room_number}
                                conflicts={lecturesConflicting({
                                    room: rooms.filter((r) => r.number == data.room_number)[0],
                                    date: data.date,
                                    starts: data.starts,
                                    ends: data.ends,
                                })}
                                className={showInfo == data.room_number ? 'block' : 'hidden'}
                            />,
                            portalRoot,
                        )}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
