<?php

namespace Tests\Feature;

use App\Http\Services\Questions\QuestionService;
use App\Http\Services\Quiz\QuizService;
use App\Models\Answer;
use App\Models\Domain;
use App\Models\Level;
use App\Models\Question;
use App\Models\Role;
use App\Models\User;
use Faker\Factory as Faker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class QuizTest extends TestCase
{
    use RefreshDatabase;

    private User $user;
    private User $entrepriseUser;
    private User $admin;
    protected $quizService;
    protected $questionService;



    public function setUp(): void
    {
        parent::setUp();

        $this->artisan('passport:install', ['--no-interaction' => true]);
        $this->user = $this->createSimpleUser();
        $this->entrepriseUser = $this->createEntrepriseUser();
        $this->admin = $this->createAdmin();
        $this->quizService = $this->mock(QuizService::class);
        $this->questionService = $this->mock(QuestionService::class);
        $this->createQuestions();
    }

    public function test_simple_user_cannot_create_quiz()
    {
        // Create a level
        $level = Level::factory()->create();
        $this->createQuestions();

        $data = $this->quizTemplate();

        $response = $this->actingAs($this->user, 'api')->postJson('api/v1/quiz/store', $data);

        //un simple utilisateur n'a pas le droit de créer un quiz
        $response->assertStatus(Response::HTTP_FORBIDDEN);
        $response->assertJson(['message' => 'vous n\'avez pas les droits requis pour effectuer cette action.']);
    }





    private function createSimpleUser(): User
    {
        $faker = Faker::create();
        return User::factory()->create([
            'role_id' => Role::ROLE_USER,

        ]);
    }

    private function quizTemplate()
    {
        $level = Level::factory()->create();
        $domain = Domain::factory()->create();
        return [
            'title' => 'Sample Quiz',
            'level_id' => $level->id,
            'questions' => [
                [
                    'title' => 'Sample Question 1',
                    'domain_id' => $domain->id,
                    'level_id' => $level->id,
                    'points' => 5,
                    'answers' => [
                        [
                            'answer' => 'Answer 1', 'is_correct' => true, 'question_id' => 1, 'slug' => 'test-slug-1', 'created_at' => now(),
                            'updated_at' => now(),
                        ],
                        [
                            'answer' => 'Answer 2', 'is_correct' => false, 'question_id' => 2, 'slug' => 'test-slug-2', 'created_at' => now(),
                            'updated_at' => now(),
                        ],
                        [
                            'answer' => 'Answer 3', 'is_correct' => false, 'question_id' => 3, 'slug' => 'test-slug-3', 'created_at' => now(),
                            'updated_at' => now(),
                        ],
                        [
                            'answer' => 'Answer 4', 'is_correct' => false, 'question_id' => 4, 'slug' => 'test-slug-4', 'created_at' => now(),
                            'updated_at' => now(),
                        ],
                    ],
                ]
            ],

        ];
    }

    private function createEntrepriseUser(): User
    {
        return User::factory()->create([
            'role_id' => Role::ROLE_ENTREPRISE,

        ]);
    }

    private function createQuestions()
    {
        $domain = Domain::factory()->create();
        return  Question::factory(2)->create(['domain_id' => $domain->id])->each(function ($question) {
            Answer::factory(4)->create(['question_id' => $question->id]);
        });
    }

    private function createAdmin(): User
    {
        return User::factory()->create([
            'role_id' => Role::ROLE_ADMINISTRATOR,

        ]);
    }
}
