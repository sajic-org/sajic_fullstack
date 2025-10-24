<?php

namespace Database\Seeders;

use App\Models\Lecture;
use App\Models\Room;
use App\Models\Speaker;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Pablito Velhito
        Speaker::factory(1)->create([
            'image' => 'https://x0hwtz7p9i.ufs.sh/f/7fxSWKXR2MtuS0RtU2qDUwcP7FE1GnOp6mC4kj5beKT3J82M',
            'name' => 'Pablito Velhito',
            'description' => 'Pablito Velhito, o mestre supremo das redes, IA e metodologias ágeis, vive no ecossistema Apple como se fosse parte da fauna. Com seu MacBook abençoado e Siri de estimação, ensina com sabedoria milenar — diz que TCP/IP veio em tábuas de pedra. Quando fala de Scrum, até a Alexa entra em daily. Seu olhar é tão intenso que faz até firewall repensar suas regras.',
        ]);

        // Angelo Luz
        Speaker::factory(1)->create([
            'image' => 'https://x0hwtz7p9i.ufs.sh/f/7fxSWKXR2MtuQIY0C5ysn1QD3EqvhL5AmPjrIflKX4FbYBRo',
            'name' => 'Angelo Luz',
            'description' => 'Angelo Luz é uma entidade iluminada que desceu dos céus do gerenciamento para as quadras de Padel. Ele descobriu que o segredo para "gerir sem gerar" (estresse, trabalho, resultados) é a programação orientada a raquetadas. Sua aura acalma até o `npm install` mais demorado e suas dicas de gestão são tão precisas quanto um smash na linha.',
        ]);

        // Kidécio
        Speaker::factory(1)->create([
            'image' => 'https://x0hwtz7p9i.ufs.sh/f/7fxSWKXR2MtuGZT4dQBa4XregDiFhKIzxcw2QBtkf850nEjZ',
            'name' => 'Kidécio',
            'description' => 'Reza a lenda que Kidécio foi o primeiro programador, tendo escrito o "Olá, Mundo" em uma parede de caverna. Ele considera o binário a única linguagem pura e vê o papiro como o meio mais confiável de armazenamento (cloud o quê?). Para ele, um teclado é só uma complicação desnecessária; ele compila o código na mente e envia para a máquina por osmose.',
        ]);

        // Bruno Gomes
        Speaker::factory(1)->create([
            'image' => 'https://x0hwtz7p9i.ufs.sh/f/7fxSWKXR2MtuLlqRGIpPkE9IKcsyeSOidqA7NU6Rbm2uoCv5',
            'name' => 'Bruno Gomes',
            'description' => 'Bruno Gomes é o terror dos aspirantes a front-end. Mestre em artes arcanas de alinhamento, ele é capaz de centralizar uma div usando apenas a força do pensamento e um feitiço sussurrado em HTML 2.0. Sua cruzada pessoal é erradicar o uso de `position` para layout, acreditando que tal ato é o caminho mais curto para a perdição e o desemprego na área de TI.',
        ]);

        // GladMau
        Speaker::factory(1)->create([
            'image' => 'https://x0hwtz7p9i.ufs.sh/f/7fxSWKXR2MtuseIEnroc0nUiSkW94adpMAbmJe1rO3BhgKYz',
            'name' => 'GladMau',
            'description' => 'Metade estrategista, metade anjo do apocalipse digital, GladMau é o engenheiro do caos. De dia, ele otimiza bancos de dados com a precisão de um cirurgião; à noite, ele sonha com "bancos de bombas" e recorda seus feitos gloriosos em jogos, onde sua habilidade com a faca é lendária. Ele encara cada projeto como uma missão: aniquilar a concorrência e deixar um rastro de destruição (e código eficiente).',
        ]);

        // Guto depois da Manual
        Speaker::factory(1)->create([
            'image' => 'https://x0hwtz7p9i.ufs.sh/f/7fxSWKXR2MtufTShRXFjqoZ7C9hXpAO2H0bmd5LzilGr3Qng',
            'name' => 'Guto depois da Manual',
            'description' => 'Guto é a prova viva de que a nuvem pode salvar mais do que seus arquivos. Após uma jornada épica de recuperação capilar, ele se tornou um evangelista da tecnologia aplicada à vida, ensinando como fazer "backup do cabelo" e "versionar a autoestima". Ele acredita que todo problema, da calvície a um bug em produção, pode ser resolvido com a estratégia de recuperação correta.',
        ]);

        // Marcelão Lanches
        Speaker::factory(1)->create([
            'image' => 'https://x0hwtz7p9i.ufs.sh/f/7fxSWKXR2MtuHgrcWlTabd2skMSpP4fXhiYj5Ktn7q8FuIOy',
            'name' => 'Marcelão Lanches',
            'description' => 'O filósofo da FATEC, Marcelão, resolve os bugs da vida e do código com a mesma sabedoria que usa para montar um hambúrguer perfeito. Para ele, uma API bem modelada é tão satisfatória quanto um X-Tudo na madrugada. Com sua calma inabalável, ele oferece conselhos que "consertam" qualquer situação, seja um relacionamento complicado ou um endpoint que retorna 500.',
        ]);

        // Gabrielão
        Speaker::factory(1)->create([
            'image' => 'https://x0hwtz7p9i.ufs.sh/f/7fxSWKXR2MtuZMq7dJ8Lrq9aEpVkiwBR2n7h8AoWNSQg03JF',
            'name' => 'Gabrielão',
            'description' => 'Conhecido no mundo corporativo como "O Rolo Compressor Humano", Gabrielão encara o DevOps como um treino de levantamento de peso. Ele não sobe containers, ele os arremessa para a nuvem. Sua técnica secreta de entrevista, a "RLPC" (Rebolar Lentinho Pros Cria), tem 100% de eficácia, convencendo qualquer recrutador a dar-lhe a vaga.',
        ]);

        // João Otávio Leites Comeuzevski
        Speaker::factory(1)->create([
            'image' => 'https://x0hwtz7p9i.ufs.sh/f/7fxSWKXR2Mtuplqvvab7M8Kk1deaYGqPlUb9Tu5zJtAXxoZn',
            'name' => 'João Otávio Leites Comeuzevski',
            'description' => 'Um mestre zen da simplicidade, João Otávio atingiu um nível de iluminação onde arrastar quadrados na tela é a forma mais elevada de arte digital. Ele acredita que a verdadeira produtividade não está na complexidade, mas em dominar os fundamentos. Sua dieta à base de coxinha é o segredo para manter a calma e o colesterol em níveis perigosamente inspiradores.',
        ]);

        // Lo
        Speaker::factory(1)->create([
            'image' => 'https://x0hwtz7p9i.ufs.sh/f/7fxSWKXR2MtuFgkikURLBjUf8yA26xC1GcYbWM7owVtkqNuF',
            'name' => 'Lo',
            'description' => 'Lo é a prova de que a beleza e o poder do Java podem coexistir. Ela navega pelas profundezas da programação de baixo nível com a mesma elegância que desfila pelos corredores da faculdade. Capaz de escrever um driver de dispositivo enquanto explica as nuances da JVM, ela intimida os bugs até que eles se corrijam sozinhos.',
        ]);

        // Natasha Pederzolli
        Speaker::factory(1)->create([
            'image' => 'https://x0hwtz7p9i.ufs.sh/f/7fxSWKXR2MtuLhH9dWpPkE9IKcsyeSOidqA7NU6Rbm2uoCv5',
            'name' => 'Natasha Pederzolli',
            'description' => 'Estrategista de vida e gamer profissional, Natasha aplica táticas de raides do World of Warcraft para otimizar o mundo real, seja para conseguir itens raros ou para programar com uma eficiência lendária. Sua habilidade de executar tarefas complexas com uma mão só é fruto de anos equilibrando um combo de habilidades e uma poção de mana.',
        ]);

        // Igor Raposinha
        Speaker::factory(1)->create([
            'image' => 'https://x0hwtz7p9i.ufs.sh/f/7fxSWKXR2MtuGhGLMHBa4XregDiFhKIzxcw2QBtkf850nEjZ',
            'name' => 'Iguinho Raposinha',
            'description' => 'Com a astúcia de uma raposa, Igor domina a arte de transitar entre o front-end e o back-end, garantindo que o pagamento sempre caia, não importa onde o trabalho foi feito. Ele também é um guru da autodefesa social, com um arsenal de estratégias para detectar e desviar de "galãs do amor" e outras ameaças à produtividade.',
        ]);

        // Natchan Bandeirinha~ UwU
        Speaker::factory(1)->create([
            'image' => 'https://x0hwtz7p9i.ufs.sh/f/7fxSWKXR2Mtuu313g12ZqfVXpkZijr962JYB3EvhU1dIFnMe',
            'name' => 'Natchan Bandeirinha~ UwU',
            'description' => 'Natchan é o pioneiro do movimento "Kawaii Code". Ele acredita que o código não deve apenas funcionar, mas também ser adorável. Seus métodos transformam mensagens de erro brutais em pedidos de desculpas fofos, e suas variáveis são nomeadas com tanto carinho que os linters choram de emoção. Para ele, um "UwU" no lugar certo pode resolver qualquer exceção.',
        ]);

        // Guilherme das Neves
        Speaker::factory(1)->create([
            'image' => 'https://x0hwtz7p9i.ufs.sh/f/7fxSWKXR2Mtue6y6xlESK3kt1BjJfN5MnRmIUvTA8PFXa6HE',
            'name' => 'Guilherme das Neves',
            'description' => 'Guilherme é um fantasma, uma lenda. Ele domina a onipresença quântica, conseguindo estar matriculado sem nunca ser visto. Mestre na arte de obter atestados, seus métodos são tão avançados que já estão sendo estudados para aplicações em computação na nuvem e teletransporte. Dizem que ele não falta, apenas "realoca sua presença para um plano astral superior".',
        ]);

        // Pablito Velhito (ID: 1)
        Lecture::factory(1)->create([
            'title' => 'Redes Ancestrais e Protocolos Perdidos',
            'type' => 'Tecnologia',
            'speaker_id' => 1,
            'room_number' => '102',
        ]);
        
        Lecture::factory(1)->create([
            'title' => 'Scrum Sem Frescura: Como Gerir Equipes com Planilha, Rock e Café',
            'type' => 'Gestão e Mercado',
            'speaker_id' => 1,
            'room_number' => '201',
        ]);

        // Angelo Luz (ID: 2)
        Lecture::factory(1)->create([
            'title' => 'Programação orientada a Padel, nova trend do momento',
            'type' => 'Tecnologia',
            'speaker_id' => 2,
            'room_number' => '202',
        ]);
        Lecture::factory(1)->create([
            'title' => 'Como gerir sem gerar',
            'type' => 'Gestão e Mercado',
            'speaker_id' => 2,
            'room_number' => 'Biblioteca',
        ]);

        // Kidécio (ID: 3)
        Lecture::factory(1)->create([
            'title' => 'Como programar em binário puro',
            'type' => 'Tecnologia',
            'speaker_id' => 3,
            'room_number' => '203',
        ]);
        Lecture::factory(1)->create([
            'title' => 'Como desenvolver papiro para publicar e divulgar suas idéias',
            'type' => 'Gestão e Mercado',
            'speaker_id' => 3,
            'room_number' => 'LabTec',
        ]);

        // Bruno Gomes (ID: 4)
        Lecture::factory(1)->create([
            'title' => 'Como alinhar uma div sem CSS',
            'type' => 'Tecnologia',
            'speaker_id' => 4,
            'room_number' => '204',
        ]);
        Lecture::factory(1)->create([
            'title' => 'Aluno usou position para o layout da página? como faze-lo desistir da carreira',
            'type' => 'Tecnologia',
            'speaker_id' => 4,
            'room_number' => '205',
        ]);

        // GladMau (ID: 5)
        Lecture::factory(1)->create([
            'title' => 'Como Matar mais de 1000 só na faca',
            'type' => 'Gestão e Mercado',
            'speaker_id' => 5,
            'room_number' => '206',
        ]);
        Lecture::factory(1)->create([
            'title' => 'Como produzir um banco de bombas nucleares',
            'type' => 'Tecnologia',
            'speaker_id' => 5,
            'room_number' => 'Idiomas',
        ]);

        // Guto depois da Manual (ID: 6)
        Lecture::factory(1)->create([
            'title' => 'Da nuvem até a cabeça, como salvar o cabelo via backup',
            'type' => 'Gestão e Mercado',
            'speaker_id' => 6,
            'room_number' => '207',
        ]);
        Lecture::factory(1)->create([
            'title' => 'De Careca a Cabeludo no Código: Como a Manual me Ensinou a Versionar a Vida',
            'type' => 'Tecnologia',
            'speaker_id' => 6,
            'room_number' => '208',
        ]);

        // Marcelão Lanches (ID: 7)
        Lecture::factory(1)->create([
            'title' => 'API Rest-aurante: Modelando Endpoints com Sabor de Hamburguer',
            'type' => 'Tecnologia',
            'speaker_id' => 7,
            'room_number' => '102',
        ]);
        Lecture::factory(1)->create([
            'title' => 'Como consertar garotas confusas',
            'type' => 'Gestão e Mercado',
            'speaker_id' => 7,
            'room_number' => '201',
        ]);

        // Gabrielão (ID: 8)
        Lecture::factory(1)->create([
            'title' => 'DevOps Monstrão: Levantando Containers Mais Pesados que Supino',
            'type' => 'Tecnologia',
            'speaker_id' => 8,
            'room_number' => 'LabTec',
        ]);
        Lecture::factory(1)->create([
            'title' => 'Como aplicar a técnica RLPC para conseguir qualquer vaga',
            'type' => 'Gestão e Mercado',
            'speaker_id' => 8,
            'room_number' => '209',
        ]);

        // João Oval (ID: 9)
        Lecture::factory(1)->create([
            'title' => 'tutorial avançado: Como arrastar quadrados na tela',
            'type' => 'Tecnologia',
            'speaker_id' => 9,
            'room_number' => '210',
        ]);
        Lecture::factory(1)->create([
            'title' => 'Metodologias Redondas: Como comer coxinha sem ter um AVC',
            'type' => 'Gestão e Mercado',
            'speaker_id' => 9,
            'room_number' => 'Biblioteca',
        ]);

        // Lo (ID: 10)
        Lecture::factory(1)->create([
            'title' => 'Programação em Baixo Nível: Falando a Língua das Máquinas e dos Duendes',
            'type' => 'Tecnologia',
            'speaker_id' => 10,
            'room_number' => '202',
        ]);
        Lecture::factory(1)->create([
            'title' => 'Como ser linda e programar em java',
            'type' => 'Tecnologia',
            'speaker_id' => 10,
            'room_number' => '203',
        ]);

        // Natasha Pederzolli (ID: 11)
        Lecture::factory(1)->create([
            'title' => 'Como conseguir itens de graça no WoW',
            'type' => 'Gestão e Mercado',
            'speaker_id' => 11,
            'room_number' => '204',
        ]);
        Lecture::factory(1)->create([
            'title' => 'Como programar com uma mão',
            'type' => 'Tecnologia',
            'speaker_id' => 11,
            'room_number' => '205',
        ]);

        // Igor Raposinha (ID: 12)
        Lecture::factory(1)->create([
            'title' => 'Como ir no Front e receber no Back',
            'type' => 'Tecnologia',
            'speaker_id' => 12,
            'room_number' => '206',
        ]);
        Lecture::factory(1)->create([
            'title' => 'Como evitar galãs do amor',
            'type' => 'Gestão e Mercado',
            'speaker_id' => 12,
            'room_number' => 'Idiomas',
        ]);

        // Nathan UwU (ID: 13)
        Lecture::factory(1)->create([
            'title' => 'Kawaii Code: Escrevendo Códigos Tão Fofos que Dão Vontade de Apertar',
            'type' => 'Tecnologia',
            'speaker_id' => 13,
            'room_number' => '207',
        ]);
        Lecture::factory(1)->create([
            'title' => 'Error Handling com Fofura: Transformando "404 Not Found" em "Desculpe, não encontrei, UwU"',
            'type' => 'Tecnologia',
            'speaker_id' => 13,
            'room_number' => '208',
        ]);

        // Guilherme das Neves (ID: 14)
        Lecture::factory(1)->create([
            'title' => 'Como nunca faltar sem nunca ir',
            'type' => 'Tecnologia',
            'speaker_id' => 14,
            'room_number' => 'teste',
        ]);
        Lecture::factory(1)->create([
            'title' => 'Como conseguir atestados de graça *Método novo 2026*',
            'type' => 'Tecnologia',
            'speaker_id' => 14,
            'room_number' => 'teste',
        ]);

        $users = User::factory(40)->create();
        $lectureIds = range(1, 28);

        foreach ($users as $user) {
            $numberOfLectures = rand(1, 5);

            shuffle($lectureIds);
            $randomLectures = array_slice($lectureIds, 0, $numberOfLectures);

            foreach ($randomLectures as $lectureId) {
                $user->lectures()->attach($lectureId, ['id' => Str::uuid()]);
            }
        }
    }
}
