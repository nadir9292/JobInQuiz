<?php

namespace Database\Factories;

use App\Models\Level;
use App\Models\User;
use Dotenv\Util\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Quiz>
 */
class QuizFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $quiz_titles = array(
            "Maîtrisez-vous les Bases de l'Informatique ?",
            "Quiz sur les Systèmes d'Exploitation : Êtes-vous un Expert ?",
            "Le Grand Quiz des Langages de Programmation",
            "Sécurité Informatique : Connaissances et Astuces",
            "Algorithmes et Structures de Données : Testez vos Compétences",
            "Quiz sur les Réseaux et les Protocoles Internet",
            "Développement Web : Êtes-vous un Pro du HTML, CSS et JavaScript ?",
            "L'histoire de l'Informatique : Êtes-vous un Connaisseur ?",
            "Technologies Émergentes : Intelligence Artificielle et Machine Learning",
            "Quiz sur les Outils et les Environnements de Développement"
        );
        $quizTitre = $this->faker->randomElement($quiz_titles);
        return [
            'title' => $quizTitre,
            'slug' => \Illuminate\Support\Str::slug($quizTitre),
            'user_id' => User::factory(),
            'level_id' => Level::factory(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
