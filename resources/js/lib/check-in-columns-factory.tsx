import { Checkbox } from '@/components/ui/checkbox';
import { createColumnHelper, Row } from '@tanstack/react-table';
import { useEffect } from 'react';

export type ShowedUpType = {
  userId: number;
  presence: boolean;
};

export type CheckInColumnsType = {
  name: string;
  email: string;
  showed_up: ShowedUpType;
};

const columnHelper = createColumnHelper<CheckInColumnsType>();

const checkInColumns = [
  columnHelper.accessor('name', {
    header: () => <div className="pl-5">Nome</div>,
    cell: ({ row }) => <div className="pl-5">{row.getValue('name')}</div>,
  }),

  columnHelper.accessor('email', {
    header: () => <div className="pl-5">E-mail</div>,
    cell: ({ row }) => <div className="pl-5">{row.getValue('email')}</div>,
  }),

  columnHelper.accessor('showed_up.presence', {
    header: () => <div className="text-right md:pr-[50%]">Presença</div>,
    cell: ({ row }) => <PresenceCell row={row} />,
  }),
];

//Checkbox component
const PresenceCell = ({ row }: { row: Row<CheckInColumnsType> }) => {
  useEffect(() => {
    if (row.original.showed_up.presence) {
      row.toggleSelected();
    }

    // disable eslint here because I know that row.original is static
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mr-7 flex justify-end md:mr-6 md:pr-[50%]">
      <Checkbox
        aria-label="Dê a presença"
        checked={row.getIsSelected()}
        onCheckedChange={row.getToggleSelectedHandler()}
        disabled={row.original.showed_up.presence}
        className="data-[state=checked]:text-foreground h-5 w-5 border-black data-[state=checked]:bg-green-300/85"
      />
    </div>
  );
};

export default checkInColumns;
