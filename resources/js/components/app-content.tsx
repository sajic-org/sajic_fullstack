import { SidebarInset } from '@/components/ui/sidebar';
import * as React from 'react';
import { Toaster } from 'sonner';
import { Config } from 'vendor/tightenco/ziggy/src/js';

interface AppContentProps extends React.ComponentProps<'main'>, Config{
    variant?: 'header' | 'sidebar';
}

export function AppContent({ variant = 'header', location, children, ...props }: AppContentProps) {
    if (variant === 'sidebar') {
        return <SidebarInset {...props}>{children}</SidebarInset>;
    }
    const currentPath = location?.pathname;
    return (
        <>
            <main className={`${currentPath !== '/' && 'max-w-7xl'} mx-auto flex h-full w-full flex-1 flex-col rounded-xl`} {...props}>
                {children}
            </main>
            <Toaster />
        </>
    );
}
