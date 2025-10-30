import { Link } from '@inertiajs/react';
import { MousePointerClick } from 'lucide-react';

function Hero() {
    return (
        <section className="min-h-screen bg-[url('/assets/hero_bg_plexus.webp')] bg-cover bg-right bg-no-repeat md:bg-contain">
            <div className="mx-auto px-4 max-sm:my-28 sm:mt-36 sm:px-6 md:max-w-7xl">
                <div className="md:w-3/5 dark:text-white">
                    <h1 className="text-4xl font-semibold">
                        Sathon 5ª Edição | outubro de 2025
                    </h1>
                    <p className="mt-5 text-justify text-xl">
                        A Semana Acadêmica do UniSenac é um evento que oferece
                        uma série de atividades acadêmicas, culturais e
                        profissionais, voltadas para o desenvolvimento de
                        competências e a troca de conhecimentos entre alunos,
                        professores e o público em geral. A programação inclui
                        palestras, oficinas, debates e workshops sobre temas
                        diversos, como tecnologia, inovação, diversidade,
                        empreendedorismo, e tendências de mercado.
                    </p>

                    <Link
                        prefetch="mount"
                        href="/palestras"
                        className="bg-primary-blue mt-8 flex h-fit w-fit items-center gap-3 rounded-lg px-3 py-3.5 text-xl text-white shadow-lg drop-shadow-md max-[30rem]:mx-auto sm:px-9"
                    >
                        Veja nossas palestras
                        <MousePointerClick
                            size={23}
                            className="mt-px"
                        />
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Hero;
