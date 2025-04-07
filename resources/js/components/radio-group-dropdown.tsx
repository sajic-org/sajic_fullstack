'use client';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export function RadioGroupDropdown({ children, rooms, onSetData }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="shadow-xs">
                    {children}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuRadioGroup>
                    {rooms.map((room) => {
                        return (
                            <>
                                <DropdownMenuRadioItem
                                    value={room.number}
                                    onClick={() => onSetData('room_number', room.number)}
                                    className="flex justify-between"
                                >
                                    {room.number}
                                    <p className="text-xs font-medium">cap.: 35</p>
                                </DropdownMenuRadioItem>
                            </>
                        );
                    })}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
