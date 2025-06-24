'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from '@/components/ui/select';
import { isRoomAvailable, lecturesConflicting } from '@/lib/utils';
import { LectureForm } from '@/pages/new-lecture-form';
import { Room } from '@/types/models';
import { useForm } from '@inertiajs/react';
import { Info } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import UnavailableRoomWarning from './unavailable-room-warning';

interface Props {
  children: React.ReactNode;
  rooms: Room[];
  data: Required<LectureForm>;

  //Typescript voodoo
  onSetData: ReturnType<typeof useForm<Required<LectureForm>>>['setData'];
}

export function RoomDropdown({ children, rooms, onSetData, data }: Props) {
  const [showInfo, setShowInfo] = useState<string>();
  const [isAvailable, setIsAvailable] = useState<boolean>(true);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);
  const [isScreenMedium, setIsScreenMedium] = useState<boolean>(false);

  useEffect(() => {
    setPortalRoot(document.getElementById('portal-root'));

    const checkScreenSize = () => {
      setIsScreenMedium(window.innerWidth >= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const onSetRoom = useCallback(
    (number: string) => {
      if (data.date && data.starts && data.ends) {
        const room = rooms.find((r) => r.number === number);
        if (room) {
          const check = isRoomAvailable({
            room: room,
            date: data.date,
            starts: data.starts,
            ends: data.ends,
          });
          setIsAvailable(check);
        }
      }
    },
    [data.date, data.starts, data.ends, rooms],
  );

  useEffect(() => {
    if (data.room_number) {
      onSetRoom(data.room_number);
    }
  }, [data.date, data.starts, data.ends, data.room_number, onSetRoom]);

  // Conditionally apply hover handlers only on medium+ screens
  const hoverHandlers = isScreenMedium
    ? {
        onMouseEnter: () => setShowInfo(data.room_number),
        onMouseLeave: () => setShowInfo(''),
      }
    : {};

  // Determine if warning should be visible
  const shouldShowWarning =
    !isAvailable &&
    data.room_number &&
    (!isScreenMedium || // Always show on small screens
      showInfo === data.room_number); // Show on hover for medium+ screens

  return (
    <Select
      defaultValue={data.room_number}
      onValueChange={(value) => {
        onSetData('room_number', value);
        onSetRoom(value);
      }}
    >
      <SelectTrigger className="w-full">{children}</SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Salas</SelectLabel>
          {rooms.map((room: Room) => (
            <div key={room.number}>
              <SelectItem value={room.number}>
                <div className="pointer-events-none flex w-full items-center justify-between">
                  <div className="pointer-events-auto mr-2 flex items-center gap-1">
                    {room.number}
                    <p className="text-xs font-medium">cap.: {room.capacity}</p>
                  </div>
                </div>
              </SelectItem>
            </div>
          ))}

          {!isAvailable &&
            portalRoot &&
            createPortal(
              <div
                {...hoverHandlers}
                className="pointer-events-auto"
              >
                <Info
                  strokeWidth={2.5}
                  size={15}
                />
              </div>,
              portalRoot,
            )}

          {shouldShowWarning &&
            portalRoot &&
            createPortal(
              <UnavailableRoomWarning
                room_number={data.room_number}
                conflicts={lecturesConflicting({
                  room: rooms.find((r) => r.number === data.room_number),
                  date: data.date,
                  starts: data.starts,
                  ends: data.ends,
                })}
                className="block"
              />,
              portalRoot,
            )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
