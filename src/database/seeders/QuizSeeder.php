<?php

namespace Database\Seeders;

use App\Models\Answer;
use App\Models\Domain;
use App\Models\Level;
use App\Models\Question;
use App\Models\Quiz;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuizSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $domains = Domain::factory()->count(5)->create();
        // Créer quelques domaines
        $domain_id = $domains->random()->id;
        // Créer 10 quiz avec 5 questions chacun et chaque question avec 4 réponses
        Quiz::factory(3)->create(['domain_id' => $domain_id])->each(function ($quiz) use ($domains) {
            // Associer un domaine aléatoire au quiz
           $domain_id = $domains->random()->id;
           // $quiz->save();

            $questions = Question::factory(2)->create(['domain_id' => $domain_id])->each(function ($question) {
                Answer::factory(4)->create(['question_id' => $question->id]);
            });

            $quiz->questions()->attach($questions);
        });
    }
}
