<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Room;

class RoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
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
        Room::create(['number' => 'Labin 101', 'capacity' => 20]);
        Room::create(['number' => 'Labin 102', 'capacity' => 20]);
        Room::create(['number' => 'Labin 103', 'capacity' => 23]);
        Room::create(['number' => 'Labin 104', 'capacity' => 5]);
        Room::create(['number' => 'Labin 105', 'capacity' => 25]);
        Room::create(['number' => 'Labin 201', 'capacity' => 35]);
        Room::create(['number' => 'Labin 204', 'capacity' => 50]);
        Room::create(['number' => 'MultiUso 201', 'capacity' => 60]);
    }
}
