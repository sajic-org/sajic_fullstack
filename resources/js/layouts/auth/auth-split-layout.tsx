import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    title?: string;
    description?: string;
}

export default function AuthSplitLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="bg-primary-blue relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
                <div className="positions-sphere-in-bg absolute inset-0 bg-[url('/assets/hero_bg_plexus.webp')] bg-cover bg-no-repeat opacity-50" />
                <Link
                    href={route('home')}
                    className="relative z-20 flex items-end text-base font-medium"
                >
                    <AppLogoIcon className="max mr-2 mb-[5px] w-24" />
                    2025
                </Link>
            </div>

            <div className="w-full lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <Link
                        href={route('home')}
                        className="relative z-20 flex items-baseline justify-center gap-1 text-lg font-semibold text-black lg:hidden"
                    >
                        <AppLogoIcon className="h-10 fill-current invert" />{' '}
                        2025
                    </Link>
                    <div className="flex flex-col items-start gap-2 text-left sm:items-center sm:text-center">
                        <h1 className="text-xl font-medium">{title}</h1>
                        <p className="text-muted-foreground text-sm text-balance">
                            {description}
                        </p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
