import { cn } from "@/lib/utils";

export default function UnavailableRoomInfo({ className }: { className?: string }) {
    return (
        <div className={cn('absolute top-12 left-48 z-50 rounded-md bg-gray-900 p-4 font-medium text-white', className)}>
            <p>A sala 201 está sendo utilizada nesse horario por:</p>
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
