import TimelineContainer from '@/components/timeline-container';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Home',
        href: '/',
    },
];

export default function Home() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Home" />

            <section className="h-screen w-screen bg-[url('/imgs/homepage_hero_light.png')] bg-cover bg-center bg-no-repeat dark:bg-[url('/imgs/homepage_hero_dark-3.png')]">
                <div className="mx-auto mt-36 px-4 md:max-w-7xl">
                    <div className="md:w-2/3 dark:text-white">
                        <h1 className="text-3xl font-semibold">Sajic 5ª Edição | outubro de 2025</h1>
                        <p className="mt-5 text-justify text-xl">
                            A Semana Acadêmica do UniSenac é um evento que oferece uma série de atividades acadêmicas, culturais e profissionais,
                            voltadas para o desenvolvimento de competências e a troca de conhecimentos entre alunos, professores e o público em geral.
                            A programação inclui palestras, oficinas, debates e workshops sobre temas diversos, como tecnologia, inovação,
                            diversidade, empreendedorismo, e tendências de mercado.
                        </p>

                        <Link href="/palestras">
                            <Button className="mt-8 px-6 py-3">Veja nossas palestras</Button>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="mx-auto flex justify-between gap-12 px-4 py-8 md:max-w-7xl">
                <div className="mt-3 space-y-1">
                    <h2 className="text-primary-blue/90 text-xl font-semibold">Palestrantes</h2>
                    <h3 className="text-3xl font-semibold">Conheça os profissionais</h3>
                    <p className="mb-5 w-4/5 text-lg">
                        que oferecerão palestras, oficinas, debates e workshops sobre temas diversos, como tecnologia, inovação, diversidade,
                        empreendedorismo, e tendências de mercado.
                    </p>
                    <Link href="/palestrantes">
                        <Button className="px-12">Saiba mais</Button>
                    </Link>
                </div>

                {/* image */}
                <Link
                    href="/palestrantes"
                    className="group relative flex min-h-[300px] w-4/5 cursor-pointer items-center justify-center overflow-hidden rounded-xl shadow-lg duration-1000 hover:w-full"
                >
                    <div className="absolute inset-0 h-full w-full items-center justify-center border bg-[url('/imgs/palestrante_thumb.png')] bg-cover bg-center bg-no-repeat filter duration-1000 group-hover:blur-[2px] hover:brightness-75"></div>
                    <span className="absolute z-20 mb-3 text-xl font-semibold text-white opacity-30 duration-1000 group-hover:opacity-100">
                        Palestrantes
                    </span>
                </Link>
            </section>

            <TimelineContainer timelineData={timeLineMockData} />
        </AppLayout>
    );
}

// This is a bunch of fake data for timeline until the true backend part is not done
const timeLineMockData = [
  {
    day: "14/10",
    time: "08:00",
    lecture: "Como virar coach em 7 dias e perder todos os amigos",
    speaker: "Carlos Wizard"
  },
  {
    day: "14/10",
    time: "09:30",
    lecture: "Teoria da conspiração aplicada: a Terra é plana mesmo?",
    speaker: "Olavo de Carvalho (holograma)"
  },
  {
    day: "14/10",
    time: "11:00",
    lecture: "Curso intensivo de dancinha no TikTok para CEOs",
    speaker: "Luiza Trajano"
  },
  {
    day: "14/10",
    time: "13:00",
    lecture: "Como vender geladinho gourmet no LinkedIn",
    speaker: "Bel Pesce"
  },
  {
    day: "14/10",
    time: "14:30",
    lecture: "Construindo startups que não entregam nada",
    speaker: "Eike Batista"
  },
  {
    day: "14/10",
    time: "16:00",
    lecture: "Design de slides que humilham seu time no stand-up diário",
    speaker: "Nizan Guanaes"
  },
  {
    day: "14/10",
    time: "17:30",
    lecture: "Como perder o emprego twittando às 3 da manhã",
    speaker: "Monark"
  },
  {
    day: "15/10",
    time: "08:00",
    lecture: "Oficina de como fazer pipa sem ser interceptado pelo 5G",
    speaker: "Luis Inácio Lula da Silva"
  },
  {
    day: "15/10",
    time: "09:30",
    lecture: "Como sobreviver no Brasil com um salário mínimo e fé",
    speaker: "Padre Marcelo Rossi"
  },
  {
    day: "15/10",
    time: "11:00",
    lecture: "Construindo inteligência artificial com jeitinho brasileiro",
    speaker: "ChatGPT com sotaque carioca"
  },
  {
    day: "15/10",
    time: "13:00",
    lecture: "Técnicas avançadas de enrolação em reuniões",
    speaker: "Deputado Aleatório"
  },
  {
    day: "15/10",
    time: "14:30",
    lecture: "Hackeando o sistema: como virar político sem saber nada",
    speaker: "Tiririca"
  },
  {
    day: "15/10",
    time: "16:00",
    lecture: "Como parecer produtivo no home office usando filtros do Zoom",
    speaker: "Influencer Genérico"
  },
  {
    day: "15/10",
    time: "17:30",
    lecture: "Influência das lives de Free Fire no mercado financeiro",
    speaker: "Felipe Neto"
  },
  {
    day: "16/10",
    time: "08:00",
    lecture: "Vendendo curso de inglês sem saber conjugar verbos",
    speaker: "Youtuber com 8 milhões de inscritos"
  },
  {
    day: "16/10",
    time: "09:30",
    lecture: "Como criar seu próprio reality show na reunião de condomínio",
    speaker: "Jojo Todynho"
  },
  {
    day: "16/10",
    time: "11:00",
    lecture: "Construindo um foguete com sucata e esperança",
    speaker: "Elon Musk versão BR"
  },
  {
    day: "16/10",
    time: "13:00",
    lecture: "A arte de usar Excel como linguagem de programação",
    speaker: "Seu Jorge do RH"
  },
  {
    day: "16/10",
    time: "14:30",
    lecture: "Criptomoedas e pirâmides: onde está a linha tênue?",
    speaker: "Coach de Prosperidade"
  },
  {
    day: "16/10",
    time: "16:00",
    lecture: "Como evitar a fadiga de reuniões com microfone desligado",
    speaker: "Pessoa Misteriosa do Teams"
  }
];
