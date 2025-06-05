<?php

namespace Database\Seeders;

use App\Models\Lecture;
use App\Models\Room;
use App\Models\Speaker;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Speaker::factory(5)->create();
        Speaker::factory(1)->create([
            'image' => 'https://x0hwtz7p9i.ufs.sh/f/7fxSWKXR2MtuS0RtU2qDUwcP7FE1GnOp6mC4kj5beKT3J82M',
            'name' => 'Pablito Velhito',
            'description' => 'Pablito Velhito, o mestre supremo das redes, IA e metodologias ágeis, vive no ecossistema Apple como se fosse parte da fauna. Com seu MacBook abençoado e Siri de estimação, ensina com sabedoria milenar — diz que TCP/IP veio em tábuas de pedra. Quando fala de Scrum, até a Alexa entra em daily. Seu olhar é tão intenso que faz até firewall repensar suas regras.',
        ]);

        Room::create(['number' => 'Biblioteca', 'capacity' => 24]);
        Room::create(['number' => 'Idiomas', 'capacity' => 21]);
        Room::create(['number' => 'LabTec', 'capacity' => 60]);
        Room::create(['number' => '102', 'capacity' => 85]);
        Room::create(['number' => '201', 'capacity' => 50]);
        Room::create(['number' => '202', 'capacity' => 50]);
        Room::create(['number' => '203', 'capacity' => 30]);
        Room::create(['number' => '204', 'capacity' => 50]);
        Room::create(['number' => '205', 'capacity' => 53]);
        Room::create(['number' => '206', 'capacity' => 50]);
        Room::create(['number' => '207', 'capacity' => 50]);
        Room::create(['number' => '208', 'capacity' => 50]);
        Room::create(['number' => '209', 'capacity' => 12]);
        Room::create(['number' => '210', 'capacity' => 25]);
        Room::create(['number' => 'teste', 'capacity' => 1]);

        Lecture::factory(25)->create();

        Lecture::factory(1)->create([
            'title' => 'Redes Ancestrais e Protocolos Perdidos',
            'type' => 'Tecnologia',
            'speaker_id' => 6,
            'room_number' => '102',
        ]);
        Lecture::factory(1)->create([
            'title' => 'Scrum Sem Frescura: Como Gerir Equipes com Planilha, Rock e Café',
            'type' => 'Gestão e Mercado',
            'speaker_id' => 6,
            'room_number' => '201',
        ]);

        $users = User::factory(20)->create();
        foreach ($users as $user) {
            $user->lectures()->attach($user->id, ['id' => Str::uuid()]);

            $user->lectures()->attach(26, ['id' => Str::uuid()]);
            $user->lectures()->attach(27, ['id' => Str::uuid()]);
        }
    }
}
