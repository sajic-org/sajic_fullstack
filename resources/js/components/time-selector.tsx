import { Button } from "@headlessui/react"
import { Popover, PopoverTrigger } from "./ui/popover"
import { Clock } from "lucide-react"
import { useState } from "react"
import { PopoverContent } from "@radix-ui/react-popover"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"

interface TimeSelectorProps {
    step?: number,
    maxNum?: number,
    placeholder: string
    label: string
}

function TimeSelector({ step = 1, maxNum = 60, placeholder, label }: TimeSelectorProps) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

    const time = genTimeArray(step, maxNum)

    return (
        <Select>
            <SelectTrigger>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent >
                <SelectGroup>
                    <SelectLabel>{label}</SelectLabel>
                    {time.map(
                        time => <SelectItem value={time}>{time}</SelectItem>)
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

function genTimeArray(step: number = 1, maxNum: number = 60,) {
    const time = []

    for (let i = 0; i < maxNum; i += step) {
        time.push(stringfyTime(i))
    }

    return time
}

function stringfyTime(time: number) {
    if (time < 10) {
        return "0" + time.toString()
    } else {
        return time.toString()
    }
}

export default TimeSelector
