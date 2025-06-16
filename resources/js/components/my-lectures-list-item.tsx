import { unsubcribe } from '@/lib/utils';
import { Lecture } from '@/types/models';
import { CircleX, FileText } from 'lucide-react';
import SpeakerDialog from './speaker-drawer';

function MyLecturesListItem({ lecture }: { lecture: Lecture }) {
    return (
        <div className="border-border min-h-28 rounded-md border-2 p-2 shadow-md lg:w-full">
            <div className="flex">
                <div className="flex w-full gap-3">
                    <SpeakerDialog speaker={lecture.speaker}>
                        <img src={lecture.speaker?.image} alt="" className="my-auto aspect-square max-w-20 cursor-pointer rounded-md object-cover" />
                    </SpeakerDialog>

                    <div className="my-auto w-full text-nowrap">
                        <p className="text-primary-blue text-sm font-medium">{lecture.speaker?.name}</p>
                        <p className="text-md font-bold text-wrap md:max-w-72">{lecture.title}</p>

                        <div className="flex items-center justify-between">
                            <p className="text-sm">
                                {lecture.date}, {lecture.starts} - {lecture.ends}
                            </p>
                            
                            {/* Buttons on Mobile */}
                            {lecture.lecture_attendances.showed_up ? (
                                <a
                                    href={`/certificate/${lecture.lecture_attendances.id}`}
                                    className="ml-auto flex h-fit cursor-pointer items-center gap-3 rounded-sm bg-blue-500 p-2 text-sm font-semibold text-white sm:gap-2 md:hidden md:rounded-md md:px-4.5 md:py-2.5"
                                >
                                    <span>Certificado</span>
                                    <FileText className="size-5.5" />
                                </a>
                            ) : (
                                <button
                                    className="ml-auto flex h-fit cursor-pointer items-center gap-3 rounded-sm bg-red-600 p-2 text-sm font-semibold text-white sm:gap-2 md:hidden md:rounded-md md:px-4.5 md:py-2.5"
                                    onClick={() => unsubcribe(lecture)}
                                >
                                    <span>Cancelar</span>
                                    <CircleX className="size-5.5" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Buttons on Desktop */}
                {lecture.lecture_attendances.showed_up ? (
                    <a
                        href={`/certificate/${lecture.lecture_attendances.id}`}
                        className="text-md hidden h-fit cursor-pointer items-center gap-3 rounded-sm bg-blue-500 p-2 font-semibold text-white sm:gap-2 md:flex md:rounded-md md:px-4.5 md:py-2.5"
                    >
                        <span>Certificado</span>
                        <FileText className="size-5.5" />
                    </a>
                ) : (
                    <button
                        className="text-md hidden h-fit cursor-pointer items-center gap-3 rounded-sm bg-red-600 p-2 font-semibold text-white sm:gap-2 md:flex md:rounded-md md:px-4.5 md:py-2.5"
                        onClick={() => unsubcribe(lecture)}
                    >
                        <span>Cancelar</span>
                        <CircleX className="size-5.5" />
                    </button>
                )}
            </div>

            <div className="w-full bg-yellow-400"></div>
        </div>
    );
}

export default MyLecturesListItem;
