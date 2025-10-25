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
        Room::create(['number' => 'Biblioteca', 'capacity' => 24, 'building' => 'goncalves']);
        Room::create(['number' => 'Idiomas', 'capacity' => 21, 'building' => 'goncalves']);
        Room::create(['number' => 'LabTec', 'capacity' => 60, 'building' => 'goncalves']);
        Room::create(['number' => '102', 'capacity' => 85, 'building' => 'goncalves']);
        Room::create(['number' => '201', 'capacity' => 50, 'building' => 'goncalves']);
        Room::create(['number' => '202', 'capacity' => 50, 'building' => 'goncalves']);
        Room::create(['number' => '203', 'capacity' => 30, 'building' => 'goncalves']);
        Room::create(['number' => '204', 'capacity' => 50, 'building' => 'goncalves']);
        Room::create(['number' => '205', 'capacity' => 53, 'building' => 'goncalves']);
        Room::create(['number' => '206', 'capacity' => 50, 'building' => 'goncalves']);
        Room::create(['number' => '207', 'capacity' => 50, 'building' => 'goncalves']);
        Room::create(['number' => '208', 'capacity' => 50, 'building' => 'goncalves']);
        Room::create(['number' => '209', 'capacity' => 12, 'building' => 'goncalves']);
        Room::create(['number' => '210', 'capacity' => 25, 'building' => 'goncalves']);

        // -----
        Room::create(['number' => '101-T', 'capacity' => 20, 'building' => 'felix']);
        Room::create(['number' => '102-T', 'capacity' => 20, 'building' => 'felix']);
        Room::create(['number' => '103-T', 'capacity' => 23, 'building' => 'felix']);
        Room::create(['number' => '104-T', 'capacity' => 5, 'building' => 'felix']);
        Room::create(['number' => '105-T', 'capacity' => 25, 'building' => 'felix']);
        Room::create(['number' => '201-T', 'capacity' => 35, 'building' => 'felix']);
        Room::create(['number' => '204-T', 'capacity' => 60, 'building' => 'felix']);
        Room::create(['number' => 'MultiUso 201-T', 'capacity' => 50, 'building' => 'felix']);
    }
}
