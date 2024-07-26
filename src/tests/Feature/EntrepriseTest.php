<?php

namespace Tests\Feature;


use App\Models\Quiz;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;
use Faker\Factory as Faker;

class EntrepriseTest extends TestCase
{
    use RefreshDatabase;
    private User $user;
    private User $entrepriseUser;
    public function setUp(): void
    {
        parent::setUp();

        $this->artisan('passport:install', ['--no-interaction' => true]);
        $this->user = $this->createSimpleUser();
        $this->entrepriseUser = $this->createEntrepriseUser();
    }

    public function test_entreprise_index_returns_quizzes_and_entreprise_profile()
    {
        // Create an entreprise user

        // Create some quizzes associated with the entreprise user
        $quizzes = Quiz::factory()->count(3)->create([
            'user_id' => $this->entrepriseUser->id,
        ]);

        // Act as the entreprise user
        $response = $this->actingAs($this->entrepriseUser, 'api')->getJson('/api/v1/entreprise/quiz');

        // Assert the response status is OK
        $response->assertStatus(Response::HTTP_OK);
    }

    public function test_classic_user_cannot_reach_entreprise_quiz()
    {
        // Act as the non-entreprise user
        $response = $this->actingAs($this->user, 'api')->getJson('/api/v1/entreprise/quiz');

        // l'utilisateur est un user classique donc n'a pas accès et on lui renvoie un forbidden
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }

    private function createSimpleUser(): User
    {
        $faker = Faker::create();
        return User::factory()->create([
            'role_id' => Role::ROLE_USER,
            'lastname' => $faker->firstName,
            'name' => $faker->lastName,
            'email' => $faker->email,
            'password' => Hash::make('password'),
        ]);
    }
    private function createEntrepriseUser(): User
    {
        $faker = Faker::create();
        return User::factory()->create([
            'role_id' => Role::ROLE_ENTREPRISE,
            'lastname' => $faker->firstName,
            'name' => $faker->lastName,
            'email' => $faker->email,
            'password' => Hash::make('password'),
        ]);
    }
}
