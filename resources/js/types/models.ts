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
    is_open_for_enrollment: boolean;
    n_attendees?: number;
    is_active?: boolean | number;
    speaker_id?: number;
    speaker?: Speaker;
    room?: Room;
    attendants?: User[];
    lecture_attendances?: LectureAttendances; // Lecture and User pivot table
}

export interface Speaker {
    id: number;
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
    lecture_attendances?: LectureAttendances; // Lecture and User pivot table
    course?: string;
    semester?: string;
}

export interface LectureAttendances {
    id: string;
    lecture_id: number;
    user_id: number;
    showed_up: boolean | number; // This is actually a boolean tinyInt
}

export interface LecturePresence {
    name: string;
    date: string;
    course: string;
    semester: string;
}
