'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SemesterDropdownProps {
  semesters: string[];
  value: string;
  onValueChange: (value: string) => void;
}

export function SemesterDropdown({
  semesters,
  value,
  onValueChange,
}: SemesterDropdownProps) {
  const radio_itens = semesters.map((semester) => {
    return (
      <DropdownMenuRadioItem
        key={semester}
        value={semester}
      >
        {semester}º semestre
      </DropdownMenuRadioItem>
    );
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {value ? `${value}º` : 'Selecione seu semestre'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Semestre</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(val) => onValueChange(val)}
        >
          {radio_itens}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
