import { Checkbox } from '@/components/ui/checkbox';
import { checkInFormProps } from '@/pages/check-in';
import { createColumnHelper, Row } from '@tanstack/react-table';
import { Dispatch, SetStateAction } from 'react';

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

function checkInColumnsFactory(form: checkInFormProps, setColumnData: Dispatch<SetStateAction<CheckInColumnsType[]>>) {
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
            cell: ({ row }) => {
                return (
                    <div className="mr-7 flex justify-end md:mr-6 md:pr-[50%]">
                        <Checkbox
                            checked={row.original.showed_up.presence}
                            onCheckedChange={(checked) => handleCheck(checked, row, form, setColumnData)}
                            aria-label="Dê a presença"
                            className="data-[state=checked]:text-foreground h-5 w-5 border-black data-[state=checked]:bg-green-300/85"
                        />
                    </div>
                );
            },
            enableSorting: false,
        }),
    ];

    return checkInColumns;
}

function handleCheck(
    checkValue: boolean | string,
    row: Row<CheckInColumnsType>,
    form: checkInFormProps,
    setColumnData: Dispatch<SetStateAction<CheckInColumnsType[]>>,
) {
    const newChecked = !!checkValue;
    const userId = row.original.showed_up.userId;

    let usersInFormArray = [...form.data.checkedUsers];

    const userIndex = findUserInFormArray(userId, usersInFormArray);

    if (userIndex == -1) {
        usersInFormArray.push({
            userId: userId,
            presence: newChecked,
        });

        form.setData({ checkedUsers: usersInFormArray });
    } else {
        removeUserFromFormArray(userIndex, usersInFormArray);

        form.setData({ checkedUsers: usersInFormArray });
    }

    setColumnData((old) =>
        old.map((row) => (row.showed_up.userId === userId ? { ...row, showed_up: { ...row.showed_up, presence: newChecked } } : row)),
    );
}

function removeUserFromFormArray(userIndex: number, showedUpArray: ShowedUpType[]) {
    showedUpArray.splice(userIndex, 1);
}

function findUserInFormArray(targetUserId: number, showedUpArray: ShowedUpType[]) {
    return showedUpArray.findIndex((user) => user.userId == targetUserId);
}

export default checkInColumnsFactory;
