import { Label } from '@radix-ui/react-label';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select';
import { useForm } from '@inertiajs/react';
import { LectureForm } from '@/pages/new-lecture-form';

interface Props {
    defaultValue?: string;
    variant?: keyof LectureForm;
    onSetData: ReturnType<typeof useForm<Required<LectureForm>>>['setData'];
}

export function TimeSelectorGroup({ variant = 'starts', onSetData, defaultValue, }: Props) {
    const [time, setTime] = useState<string[]>(['00', '00']);

    useEffect(() => {
        onSetData(`${variant}`, `${time[0]}:${time[1]}`);
    }, [time, variant, onSetData]);
    return (
        <div>
            <Label htmlFor="starts">{variant === 'starts' ? 'Das' : 'Às'}</Label>

            <div className="flex items-center gap-1 pt-1">
                {/* Horas */}
                <TimeSelector maxNum={22} placeholder="hh" onSetTime={setTime} time={time} minNum={8} defaultValue={defaultValue?.split(':')[0]} />

                <span className="text-xl">:</span>

                {/* Minutos */}
                <TimeSelector step={15} placeholder="mm" label="Minutos" onSetTime={setTime} time={time} defaultValue={defaultValue?.split(':')[1]} />
            </div>
        </div>
    );
}

interface TimeSelectorProps {
    defaultValue?: string;
    step?: number;
    maxNum?: number;
    minNum?: number;
    placeholder: string;
    label?: string;
    time: string[];
    onSetTime: Dispatch<SetStateAction<string[]>>;
}

function TimeSelector({ step = 1, maxNum = 60, minNum = 0, placeholder, label = 'Horas', onSetTime, time, defaultValue }: TimeSelectorProps) {
    const timeArr = genTimeArray(step, maxNum, minNum);

    return (
        <Select
            defaultValue={defaultValue}
            onValueChange={(v) => {
                if (label === 'Horas') {
                    onSetTime([v, time[1]]);
                } else {
                    onSetTime([time[0], v]);
                }
            }}
        >
            <SelectTrigger className="w-full min-w-0">
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
