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
    );
}

export default CheckIn;
