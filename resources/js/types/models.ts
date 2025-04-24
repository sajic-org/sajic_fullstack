enum LectureType {
    TECNOLOGIA = 'Tecnologia',
    GESTAO_E_MERCADO = 'Gestão e Mercado',
}

export interface Lecture {
    id: number;
    title: string;
    type: LectureType;
    date: string;
    starts: string;
    ends: string;
    room_number: string;
    is_active?: boolean | number;
    speaker_id?: number;
    speaker?: Speaker;
    attendants?: User[];
}

export interface Speaker {
    id: number;
    name: string;
    description: string;
    image: string;
    lectures?: Lecture[];
}

export interface Room {
    id: number;
    number: string;
    capacity: number;
    lectures?: Lecture[];
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    is_admin: number | boolean;
    is_unisenac_student: number | boolean;
    created_at: string;
    updated_at: string;
    lectures: Lecture[];
    lecture_user?: LectureUser // Lecture and User pivot table

    [key: string]: unknown; // This allows for additional properties...
}

export interface LectureUser {
    lecture_id: number,
    user_id: number,
    showed_up: number // This is actually a boolean tinyInt
}
