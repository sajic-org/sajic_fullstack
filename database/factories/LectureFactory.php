<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lecture>
 */
class LectureFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->text(75),
            'type' => fake()->randomElement(['Gestão e Mercado', 'Tecnologia']),
            'date' => fake()->randomElement(['15/10', '16/10', '17/10', '18/10']),
            'starts' => fake()->randomElement(['11:00', '11:30', '12:15', '12:45', '13:15', '13:45']),
            'ends' => fake()->randomElement(['14:00', '14:30', '15:15', '15:45', '16:15', '16:45']),
            'speaker_id' => fake()->randomElement([1, 2, 3, 4, 5]),
            'room_number' => 'LabTec',
        ];
    }
}
