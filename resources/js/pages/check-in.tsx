<<<<<<< HEAD
import AppLayout from "@/layouts/app-layout";
import {type BreadcrumbItem} from "@/types"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: '/',
    },
    {
        title: "Check in",
        href: "#"
    }
];

function CheckIn() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div>cuuuuuuuuuuuu</div>
        </AppLayout>
=======
import { Lecture } from '@/types/models';

function CheckIn({ lecture }: { lecture: Lecture }) {
    console.log(lecture);

    return (
        <div>
            {/* {users.map((u) => {
                return <p>{u.name}</p>;
            })} */}
        </div>
>>>>>>> 85e2481d9e61e85202771deb29188e85b9ef06e9
    );
}

export default CheckIn;
