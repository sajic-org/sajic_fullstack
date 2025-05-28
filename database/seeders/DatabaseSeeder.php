<?php

namespace Database\Seeders;

use App\Models\Lecture;
use App\Models\Room;
use App\Models\Speaker;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Speaker::factory(5)->create();

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

        $users = User::factory(20)->create();
        foreach ($users as $user) {
            $user->lectures()->attach(1);
        }
    }
}
