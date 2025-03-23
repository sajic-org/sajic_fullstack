import { SidebarInset } from '@/components/ui/sidebar';
import * as React from 'react';
import { Toaster } from 'sonner';

interface AppContentProps extends React.ComponentProps<'main'> {
    variant?: 'header' | 'sidebar';
}

export function AppContent({ variant = 'header', children, ...props }: AppContentProps) {
    if (variant === 'sidebar') {
        return <SidebarInset {...props}>{children}</SidebarInset>;
    }
    const currentPath = window.location.pathname;

    return (
        <>
            <main className={`${currentPath !== '/' && 'max-w-7xl'} mx-auto flex h-full w-full flex-1 flex-col rounded-xl`} {...props}>
                {children}
            </main>
            <Toaster />
        </>
    );
}
