import Hero from '@/components/hero';
import { PastEditions } from '@/components/past-editions';
import SecondHero from '@/components/second_hero';
import TimelineContainer from '@/components/timeline-container';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

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
            <Hero />
            <SecondHero />

            <PastEditions />
            <TimelineContainer timelineData={timeLineMockData} />
        </AppLayout>
    );
}

const timeLineMockData = [
    {
        day: '14/10',
        time: '08:00',
        name: 'Como virar coach em 7 dias e perder todos os amigos',
        speaker: 'Carlos Wizard',
    },
    {
        day: '14/10',
        time: '09:30',
        name: 'Teoria da conspiração aplicada: a Terra é plana mesmo?',
        speaker: 'Olavo de Carvalho (holograma)',
    },
    {
        day: '14/10',
        time: '11:00',
        name: 'Curso intensivo de dancinha no TikTok para CEOs',
        speaker: 'Luiza Trajano',
    },
    {
        day: '14/10',
        time: '13:00',
        name: 'Como vender geladinho gourmet no LinkedIn',
        speaker: 'Bel Pesce',
    },
    {
        day: '14/10',
        time: '14:30',
        name: 'Construindo startups que não entregam nada',
        speaker: 'Eike Batista',
    },
    {
        day: '14/10',
        time: '16:00',
        name: 'Design de slides que humilham seu time no stand-up diário',
        speaker: 'Nizan Guanaes',
    },
    {
        day: '14/10',
        time: '17:30',
        name: 'Como perder o emprego twittando às 3 da manhã',
        speaker: 'Monark',
    },
    {
        day: '14/10',
        time: '18:30',
        name: 'Como pedir aumento sem parecer emocionado',
        speaker: 'Ana Maria Braga',
    },
    {
        day: '14/10',
        time: '20:00',
        name: 'Workshop de indiretas passivo-agressivas via e-mail',
        speaker: 'Assinatura automática da firma',
    },
    {
        day: '14/10',
        time: '21:30',
        name: 'Live coding de planilha do Enem ao vivo',
        speaker: 'Datena',
    },
    {
        day: '15/10',
        time: '08:00',
        name: 'Oficina de como fazer pipa sem ser interceptado pelo 5G',
        speaker: 'Luis Inácio Lula da Silva',
    },
    {
        day: '15/10',
        time: '09:30',
        name: 'Como sobreviver no Brasil com um salário mínimo e fé',
        speaker: 'Padre Marcelo Rossi',
    },
    {
        day: '15/10',
        time: '11:00',
        name: 'Construindo inteligência artificial com jeitinho brasileiro',
        speaker: 'ChatGPT com sotaque carioca',
    },
    {
        day: '15/10',
        time: '13:00',
        name: 'Técnicas avançadas de enrolação em reuniões',
        speaker: 'Deputado Aleatório',
    },
    {
        day: '15/10',
        time: '14:30',
        name: 'Hackeando o sistema: como virar político sem saber nada',
        speaker: 'Tiririca',
    },
    {
        day: '15/10',
        time: '16:00',
        name: 'Como parecer produtivo no home office usando filtros do Zoom',
        speaker: 'Influencer Genérico',
    },
    {
        day: '15/10',
        time: '17:30',
        name: 'Influência das lives de Free Fire no mercado financeiro',
        speaker: 'Felipe Neto',
    },
    {
        day: '15/10',
        time: '18:30',
        name: 'Como fazer networking no grupo da família',
        speaker: 'Admin do Zap',
    },
    {
        day: '15/10',
        time: '20:00',
        name: 'A importância da feijoada na construção de MVPs',
        speaker: 'Alexandre Frota',
    },
    {
        day: '15/10',
        time: '21:30',
        name: 'Pitch de startup que resolve problemas que não existem',
        speaker: 'Ex-aluno da FGV',
    },
    {
        day: '16/10',
        time: '08:00',
        name: 'Vendendo curso de inglês sem saber conjugar verbos',
        speaker: 'Youtuber com 8 milhões de inscritos',
    },
    {
        day: '16/10',
        time: '09:30',
        name: 'Como criar seu próprio reality show na reunião de condomínio',
        speaker: 'Jojo Todynho',
    },
    {
        day: '16/10',
        time: '11:00',
        name: 'Construindo um foguete com sucata e esperança',
        speaker: 'Elon Musk versão BR',
    },
    {
        day: '16/10',
        time: '13:00',
        name: 'A arte de usar Excel como linguagem de programação',
        speaker: 'Seu Jorge do RH',
    },
    {
        day: '16/10',
        time: '14:30',
        name: 'Criptomoedas e pirâmides: onde está a linha tênue?',
        speaker: 'Coach de Prosperidade',
    },
    {
        day: '16/10',
        time: '16:00',
        name: 'Como evitar a fadiga de reuniões com microfone desligado',
        speaker: 'Pessoa Misteriosa do Teams',
    },
    {
        day: '16/10',
        time: '18:30',
        name: 'Como virar um nômade digital sem sair de Osasco',
        speaker: 'Whindersson Nunes',
    },
    {
        day: '16/10',
        time: '20:00',
        name: 'Construindo seu próprio banco usando PowerPoint',
        speaker: 'Luciano Huck',
    },
    {
        day: '16/10',
        time: '21:30',
        name: 'Meditando enquanto responde e-mails de trabalho',
        speaker: 'Monja Coen',
    },
    {
        day: '16/10',
        time: '23:00',
        name: 'After das palestras: mesa redonda sobre memes e política',
        speaker: 'Mesa redonda com Gregório Duvivier, Pablo Marçal e um estagiário',
    },
];
