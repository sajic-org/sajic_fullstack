import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { UserMenuContent } from '@/components/user-menu-content';
import { useInitials } from '@/hooks/use-initials';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookMarked, BookPlus, GraduationCap, ListChecks, Menu, Settings } from 'lucide-react';
import AppLogo from './app-logo';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';

function MobileSidebarMenu() {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const getInitials = useInitials();
    const cleanup = useMobileNavigation();

    // Todo:
    //  - Fazer com que header seja sticky no mobile, para que o menu seja facilmente acessado;
    //  - Melhorar tamanhos dos icones e espaçamentos.

    return (
        <div className="ml-auto md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="mr-2 h-[34px] w-[34px]">
                        <Menu className="h-5 w-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-sidebar border-sidebar-border w-60">
                    <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

                    {/* Header with logo */}
                    <SheetHeader className="border-sidebar-border items-left flex h-16 shrink-0 border-b px-4">
                        <Link href="/" prefetch className="flex items-center space-x-2">
                            <AppLogo className="w-20" />
                        </Link>
                    </SheetHeader>

                    {/* Navigation content */}
                    <div className="flex flex-1 flex-col overflow-hidden">
                        <div className="flex flex-1"></div>

                        {/* Main navigation */}
                        <div className="m-4">
                            <Link
                                className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex w-full items-center justify-end gap-3 rounded-md p-2 text-sm font-medium transition-colors"
                                href={route('lectures.index')}
                                as="button"
                                prefetch
                                onClick={cleanup}
                            >
                                Palestras
                                <GraduationCap className="mr-2" size={20} />
                            </Link>

                            <Link
                                className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex w-full items-center justify-end gap-3 rounded-md p-2 text-sm font-medium transition-colors"
                                href={route('user.lectures')}
                                as="button"
                                prefetch
                                onClick={cleanup}
                            >
                                Minhas Palestras
                                <BookMarked className="mr-2" size={20} />
                            </Link>

                            {auth.user.is_admin && (
                                <>
                                    <Link
                                        className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex w-full items-center justify-end gap-3 rounded-md p-2 text-sm font-medium transition-colors"
                                        href={route('lectures.create')}
                                        as="button"
                                        prefetch
                                        onClick={cleanup}
                                    >
                                        Novas Palestras
                                        <BookPlus className="mr-2" size={20} />
                                    </Link>

                                    <Link
                                        className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex w-full items-center justify-end gap-3 rounded-md p-2 text-sm font-medium transition-colors"
                                        href={route('user.attendance_list')}
                                        as="button"
                                        prefetch
                                        onClick={cleanup}
                                    >
                                        Presenças
                                        <ListChecks className="mr-2" size={20} />
                                    </Link>
                                </>
                            )}

                            <Link
                                className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex w-full items-center justify-end gap-3 rounded-md p-2 text-sm font-medium transition-colors"
                                href={route('password.edit')}
                                as="button"
                                prefetch
                                onClick={cleanup}
                            >
                                Configurações
                                <Settings className="mr-2" size={20} />
                            </Link>
                        </div>

                        {/* Footer with user info or auth buttons */}
                        <div className="border-sidebar-border mt-auto border-t p-4">
                            {!auth.user ? (
                                <div className="grid gap-2">
                                    <Link
                                        href={route('login')}
                                        className="border-sidebar-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground flex h-9 items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="bg-primary text-primary-foreground hover:bg-primary/90 flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors"
                                    >
                                        Registre-se
                                    </Link>
                                </div>
                            ) : (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-auto w-full justify-end gap-3 px-3 py-2"
                                        >
                                            <div className="flex min-w-0 flex-col items-end text-left">
                                                <span className="text-sidebar-foreground truncate text-sm font-medium">{auth.user.name}</span>
                                                <span className="text-sidebar-foreground/70 truncate text-xs">{auth.user.email}</span>
                                            </div>
                                            <Avatar className="h-8 w-8 rounded-lg">
                                                <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                                    {getInitials(auth.user.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56" align="end">
                                        <UserMenuContent user={auth.user} />
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}

export default MobileSidebarMenu;
