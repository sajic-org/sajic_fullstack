import { createColumnHelper, Row } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { checkInFormProps } from "@/pages/check-in"
import React, { useState } from "react"

export type ShowedUpType = {
    userId: number,
    presence: boolean,
}

export type CheckInColumnsType = {
    name: string,
    email: string,
    showed_up: ShowedUpType
}

const columnHelper = createColumnHelper<CheckInColumnsType>()

function checkInColumnsFactory(form: checkInFormProps) {

    const checkInColumns = [
        columnHelper.accessor('showed_up.presence', {
            header: 'Presença',
            cell: ({ row, getValue }) => {
                const [check, setCheck] = useState<boolean>(getValue())

                return (
                    <Checkbox
                        checked={check}
                        onCheckedChange={
                            checked => handleCheck(checked, setCheck, form, row)
                        }
                        aria-label="Dê a presença"
                        className="border-black w-5 h-5 data-[state=checked]:bg-green-300/85 data-[state=checked]:text-foreground"
                    />
                )
            },
            enableSorting: false,
        }),

        columnHelper.accessor('name', {
            header: () => <div className="text-right">Nome</div>,
            cell: ({ row }) => <div className="text-right">{row.getValue("name")}</div>,
        }),

        columnHelper.accessor('email', {
            header: () => <div className="text-right">E-mail</div>,
            cell: ({ row }) => <div className="text-right">{row.getValue("email")}</div>,
        })
    ]

    return checkInColumns
}


function handleCheck(checkValue: boolean | string, setCheck: React.Dispatch<React.SetStateAction<boolean>>, form: checkInFormProps, row: Row<CheckInColumnsType>) {
    const newChecked = !!checkValue
    const userId = row.original.showed_up.userId

    let usersInFormArray = [...form.data.checkedUsers]

    const userIndex = findUserInFormArray(userId, usersInFormArray)

    if (userIndex == -1) {
        usersInFormArray.push({
            userId: userId,
            presence: newChecked
        })

        form.setData({ checkedUsers: usersInFormArray })
    } else {
        removeUserFromFormArray(userIndex, usersInFormArray)

        form.setData({ checkedUsers: usersInFormArray })
    }

    setCheck(newChecked)
}

function removeUserFromFormArray(userIndex: number, showedUpArray: ShowedUpType[]) {

    showedUpArray.splice(userIndex, 1)
}

function findUserInFormArray(targetUserId: number, showedUpArray: ShowedUpType[]) {

    return showedUpArray.findIndex(user =>
        user.userId == targetUserId
    )
}

export default checkInColumnsFactory
