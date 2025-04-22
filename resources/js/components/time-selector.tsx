import { Dispatch } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select';

interface TimeSelectorProps {
    step?: number;
    maxNum?: number;
    minNum?: number;
    placeholder: string;
    label: string;
    variant: string;
    time: string[];
    onSetTime: Dispatch.SetStateAction<string[]>;
}

function TimeSelector({ step = 1, maxNum = 60, minNum = 0, placeholder, label, onSetTime, variant, time }: TimeSelectorProps) {
    const timeArr = genTimeArray(step, maxNum, minNum);

    return (
        <Select
            onValueChange={(value) => {
                if (variant === 'hour') {
                    onSetTime([value, time[1]]);
                } else {
                    onSetTime([time[0], value]);
                }
            }}
        >
            <SelectTrigger>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{label}</SelectLabel>
                    {timeArr.map((time) => (
                        <SelectItem value={time} key={time}>
                            {time}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

function genTimeArray(step: number = 1, maxNum: number = 60, minNum = 0) {
    const time = [];

    for (let i = minNum; i < maxNum; i += step) {
        time.push(stringfyTime(i));
    }

    return time;
}

function stringfyTime(time: number) {
    if (time < 10) {
        return '0' + time.toString();
    } else {
        return time.toString();
    }
}

export default TimeSelector;
