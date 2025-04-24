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
            'date' => fake()->randomElement(['17/10', '18/10', '19/10', '20/10']),
            'starts' => fake()->time('H:i'),
            'ends' => fake()->time('H:i'),
            'speaker_id' => fake()->randomElement([1, 2, 3, 4, 5]),
            'room_number' => '404',
        ];
    }
}
