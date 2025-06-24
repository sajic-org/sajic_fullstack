import { cn } from '@/lib/utils';
import { Lecture } from '@/types/models';

interface Props {
  className?: string;
  conflicts: Lecture[];
  room_number: string;
}

export default function UnavailableRoomWarning({
  className,
  conflicts,
  room_number,
}: Props) {
  return (
    <div
      className={cn(
        'absolute bottom-18 z-50 min-w-xs rounded-md bg-black/90 p-4 font-medium text-white max-md:-left-1 md:-right-15',
        className,
      )}
    >
      <p>A sala {room_number} está sendo utilizada nesse horario por:</p>
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
