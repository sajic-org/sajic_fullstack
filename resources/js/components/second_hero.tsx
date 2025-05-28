import { Link } from '@inertiajs/react';
import { BadgePlus } from 'lucide-react';

function SecondHero() {
    return (
        <section className="bg-primary-blue text-white">
            <div className="mx-auto flex flex-col justify-center gap-6 px-4 py-16 sm:px-6 sm:py-30 md:max-w-7xl lg:flex-row lg:justify-between">
                {/* image */}
                <Link
                    href="/palestras"
                    className="group relative flex min-h-[350px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl duration-1000"
                >
                    <div className="absolute inset-0 h-full items-center justify-center bg-[url('/assets/palestrante_thumb.png')] bg-cover bg-center bg-no-repeat filter duration-1000 group-hover:blur-[1px] hover:brightness-90"></div>
                    <span className="absolute z-20 mb-3 text-xl font-semibold text-white opacity-0 duration-1000 group-hover:opacity-100">
                        Palestras
                    </span>
                </Link>

                <div className="mt-3 w-fit space-y-2 text-right">
                    <h2 className="text-xl font-semibold">Palestras</h2>
                    <h3 className="text-4xl font-semibold">Veja o que esse ano oferece</h3>
                    <p className="mb-5 ml-auto w-4/5 text-xl">
                        Palestras, oficinas, debates e workshops sobre temas diversos, como tecnologia, design, inovação, diversidade,
                        empreendedorismo, e tendências de mercado.
                    </p>
                    <Link
                        prefetch
                        href="/palestras"
                        className="text-primary-blue mt-8 ml-auto flex h-fit w-fit items-center gap-3 rounded-lg bg-white px-9 py-3.5 text-xl shadow-lg drop-shadow-md"
                    >
                        Saiba Mais
                        <BadgePlus />
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default SecondHero;
