enum LectureType {
    TECNOLOGIA = 'Tecnologia',
    GESTAO_E_MERCADO = 'Gestão e Mercado',
}

export interface Lecture {
    title: string;
    type: LectureType;
    date: string | Date;
    starts: string;
    ends: string;
    is_active?: boolean | number;
    speaker_id: number;
    room_number: string;
}

export interface Speaker {
    name: string;
    description: string;
    image: string;
    lectures?: Lecture[];
}

export interface Room {
    number: string;
    capacity: number;
    lectures?: Lecture[];
}
