import Heading from '@/components/heading';
import { type PropsWithChildren } from 'react';

export default function SettingsLayout({ children }: PropsWithChildren) {
    return (
        <div className="mx-auto mb-20 w-fit px-4 py-6 md:w-3xl">
            <Heading title="Configurações" description="Gerencie as configurações de seu perfil e conta." />

            <section className="flex flex-col space-y-12 lg:flex-row lg:space-y-0 lg:space-x-12">{children}</section>
        </div>
    );
}
