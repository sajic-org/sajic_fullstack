function MyLecturesListItem({
    lecture,
}: {
    lecture: {
        title: string | React.ReactNode;
        teacher: string | React.ReactNode;
        image?: string;
        time: string;
    };
}) {
    return (
        <div className="border-border md:mx grid h-28 grid-cols-4 rounded-md border-2 p-2 shadow-md lg:w-full">
            <div className="col-span-3 flex gap-3">
                <img src={lecture.image} alt="" className="my-auto h-20 w-20 rounded-md object-cover" />
                <div className="my-auto text-nowrap">
                    <p className="text-primary-blue text-sm font-medium">{lecture.teacher}</p>
                    <p className="text-md font-bold">{lecture.title}</p>
                    <p className="text-sm">{lecture.time}</p>
                </div>
            </div>
            <div className="col-span-1">
                <button className="w-full rounded-md bg-rose-600 py-1.5 text-white">
                    <h1 className="md:block">Cancelar</h1>
                </button>
            </div>
        </div>
    );
}

export default MyLecturesListItem;
