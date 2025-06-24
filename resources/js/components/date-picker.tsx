'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn, now } from '@/lib/utils';
import { format, parse } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';

interface Props {
  onSetData: (key: string, value: string) => void;
  defaultDate?: string | Date;
}

export function DatePicker({ onSetData, defaultDate }: Props) {
  const getInitialDate = () => {
    if (!defaultDate) return now();

    if (typeof defaultDate === 'string') {
      try {
        return parse(defaultDate, 'dd/MM', new Date());
      } catch (e) {
        console.error('Error parsing date:', e);
        return now();
      }
    }

    return defaultDate;
  };

  const [date, setDate] = React.useState<Date>(getInitialDate());

  React.useEffect(() => {
    onSetData('date', format(date, 'dd/MM'));
  }, [date, onSetData]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'mt-1 w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'dd/MM') : <span>Selecionar a data</span>}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => setDate(newDate || now())}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
