import { Link } from '@inertiajs/react';
import { MousePointerClick } from 'lucide-react';

function Hero() {
    return (
        <section className="h-screen w-screen bg-[url('/imgs/homepage_hero_light.webp')] bg-cover bg-center bg-no-repeat dark:bg-[url('/imgs/homepage_hero_dark-3.png')]">
            <div className="mx-auto mt-36 px-4 md:max-w-7xl">
                <div className="md:w-2/3 dark:text-white">
                    <h1 className="text-3xl font-semibold">Sajic 5ª Edição | outubro de 2025</h1>
                    <p className="mt-5 text-justify text-[22px]">
                        A Semana Acadêmica do UniSenac é um evento que oferece uma série de atividades acadêmicas, culturais e profissionais, voltadas
                        para o desenvolvimento de competências e a troca de conhecimentos entre alunos, professores e o público em geral. A
                        programação inclui palestras, oficinas, debates e workshops sobre temas diversos, como tecnologia, inovação, diversidade,
                        empreendedorismo, e tendências de mercado.
                    </p>

                    <Link
                        prefetch="mount"
                        href="/palestras"
                        className="bg-primary-blue mt-8 flex h-fit w-fit items-center gap-3 rounded-lg px-9 py-3.5 text-xl text-white shadow-lg drop-shadow-md hover:bg-orange-500"
                    >
                        Veja nossas palestras
                        <MousePointerClick size={23} className="mt-px" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Hero;
