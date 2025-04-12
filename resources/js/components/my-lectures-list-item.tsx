
function MyLecturesListItem({lecture} :
     {lecture: {
        title: string | React.ReactNode;
        teacher: string | React.ReactNode;
        image?: string;
        time: string;
     } 
    }){

    return(
        <div className="flex w-11/12 h-28 border-2 border-border rounded-md px-2.5 py-3">
            <div className="flex w-11/12 gap-3">
                <img src={lecture.image} alt="" className="w-20 h-20 rounded-md my-auto object-cover"/>
                <div className="my-auto text-nowrap">
                    <p className="text-[13px]">{lecture.teacher}</p>
                    <p className="text-[15px] font-bold">{lecture.title}</p>
                    <p className="text-[10px]">{lecture.time}</p>
                </div>
            </div>
            <div className="w-8/12">
                <button className="w-2 h-6 md:w-28 md:h-8 text-white float-right bg-rose-500 py-1 px-6 rounded-md">
                    <h1 className="md:block">Cancelar</h1>
                </button>
            </div>
        </div>
    )
}

export default MyLecturesListItem