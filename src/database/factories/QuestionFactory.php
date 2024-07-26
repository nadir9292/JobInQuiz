<?php

namespace Database\Factories;

use App\Models\Domain;
use App\Models\Level;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Question>
 */
class QuestionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $questions = [
            "Maîtrisez-vous les Bases de l'Informatique ?",
            "Quiz sur les Systèmes d'Exploitation : Êtes-vous un Expert ?",
            "Le Grand Quiz des Langages de Programmation",
            "Sécurité Informatique : Connaissances et Astuces",
            "Algorithmes et Structures de Données : Testez vos Compétences",
            "Quiz sur les Réseaux et les Protocoles Internet",
            "Développement Web : Êtes-vous un Pro du HTML, CSS et JavaScript ?",
            "L'histoire de l'Informatique : Êtes-vous un Connaisseur ?",
            "Technologies Émergentes : Intelligence Artificielle et Machine Learning",
            "Quiz sur les Outils et les Environnements de Développement",
            "Quiz sur les Bases de Données : Testez vos Connaissances",
            "Quiz sur l'Architecture des Ordinateurs : Êtes-vous Incollable ?"
        ];

        $questionTitle = $this->faker->randomElement($questions);
        return [
            'title' => $questionTitle,
            'slug' => Str::slug($questionTitle),
            'user_id' => User::factory(),
            'points' => random_int(1, 3),
            'domain_id' => Domain::factory(),
            'level_id' => Level::factory(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
