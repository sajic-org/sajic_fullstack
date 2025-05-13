import { cn } from '@/lib/utils';
import { Room } from './RoomDropdown';

export default function UnavailableRoomInfo({ className, room }: { className?: string; room: Room }) {
    return (
        <div className={cn('absolute right-5 bottom-5 z-50 min-w-xs rounded-md bg-black/90 p-4 font-medium text-white', className)}>
            <p>A sala {room.number} está sendo utilizada nesse horario por:</p>
            <ul className="mt-1 space-y-2">
                <li>
                    - Rosquinha Caseira, <br /> das 16:15 às 17:00
                </li>
                <li className="text-nowrap">
                    - Rosquinha Caseira, <br /> das 17:00 às 17:30
                </li>
            </ul>
        </div>
    );
}
