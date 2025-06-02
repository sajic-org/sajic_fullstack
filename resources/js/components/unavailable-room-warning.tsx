import { cn } from '@/lib/utils';
import { Lecture } from '@/types/models';
import { Room } from './RoomDropdown';

export default function UnavailableRoomWarning({ className, conflicts, room }: { className?: string; conflicts: Lecture[]; room: Room }) {
    return (
        <div
            className={cn(
                'absolute bottom-18 z-50 min-w-xs rounded-md bg-black/90 p-4 font-medium text-white max-md:-left-1 md:-right-15',
                className,
            )}
        >
            <p>A sala {room.number} está sendo utilizada nesse horario por:</p>
            <ul className="mt-1 space-y-2">
                {conflicts.map((lecture) => (
                    <li>
                        - {lecture.title}, <br /> das {lecture.starts} às {lecture.ends}
                    </li>
                ))}
            </ul>
        </div>
    );
}
