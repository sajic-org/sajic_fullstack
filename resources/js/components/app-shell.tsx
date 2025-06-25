import { SidebarProvider } from '@/components/ui/sidebar';
import { useEffect, useState } from 'react';

interface AppShellProps {
    children: React.ReactNode;
    variant?: 'header' | 'sidebar';
}

export function AppShell({ children, variant = 'header' }: AppShellProps) {
    const [isOpen, setIsOpen] = useState(true); // Default for SSR
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setIsOpen(localStorage.getItem('sidebar') !== 'false');
        setHasMounted(true);
    }, []);

    const handleSidebarChange = (open: boolean) => {
        setIsOpen(open);
        if (typeof window !== 'undefined') {
            localStorage.setItem('sidebar', String(open));
        }
    };

    if (!hasMounted) {
        return (<SidebarProvider
            open={true}
            onOpenChange={handleSidebarChange}
        >
            {children}
        </SidebarProvider>)
    }

    if (variant === 'header') {
        return (
            <div className="flex min-h-screen w-full flex-col">{children}</div>
        );
    }

    return (
        <SidebarProvider
            open={isOpen}
            onOpenChange={handleSidebarChange}
        >
            {children}
        </SidebarProvider>
    );
}
