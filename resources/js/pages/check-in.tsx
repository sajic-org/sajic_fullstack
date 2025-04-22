import { Lecture } from '@/types/models';

function CheckIn({ lecture }: { lecture: Lecture }) {
    console.log(lecture);

    return (
        <div>
            {/* {users.map((u) => {
                return <p>{u.name}</p>;
            })} */}
        </div>
    );
}

export default CheckIn;
