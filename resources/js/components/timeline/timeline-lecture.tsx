function TimelineLecture({ lecturer, title }) {
    return (
        <div className="mx-2 mb-5 md:mx-8">
            <h4 className="text-base font-semibold">{title}</h4>
            <span>
                Com <span className="font-semibold">{lecturer}</span>
            </span>
        </div>
    );
}

export default TimelineLecture;
