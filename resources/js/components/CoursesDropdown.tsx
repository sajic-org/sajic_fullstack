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

export function CoursesDropdown({
  courses,
  onValueChange,
  value,
}: {
  courses: string[];
  onValueChange: (value: string) => void;
  value: string;
}) {
  const radio_itens = courses.map((course) => {
    return (
      <DropdownMenuRadioItem
        key={course}
        value={course}
      >
        {course}
      </DropdownMenuRadioItem>
    );
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{value || 'Selecione seu curso'}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Cursos</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={onValueChange}
        >
          {radio_itens}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
