<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Level>
 */
class LevelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $levels = ['debutant', 'intermediaire', 'avancé', 'expert'];
        return [
            'name' => $this->faker->randomElement($levels),
            'points' => $this->faker->numberBetween(10, 100),
            'slug' => Str::slug($this->faker->randomElement($levels)),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
