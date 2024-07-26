<?php

namespace Tests\Feature;
use App\Models\Role;
use App\Models\User;
use Faker\Factory as Faker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SimpleUserTest extends TestCase
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

    /**
     * @return void
     * On vérifie que l'utilisateur avec un role "user" à accès aux fonctionnalités
     * lié à son rôle
     */

    public function test_simple_user_can_access_user_quiz_fonctionalities()
    {


        // Ensure the request URL matches the route definition
        $response = $this->actingAs($this->user, 'api')->getJson('/api/v1/user/quiz');

        // Assert the response status is OK (200)
        $response->assertStatus(200);
    }

    private function createSimpleUser(): User
    {
        $faker = Faker::create();
        return User::factory()->create([
            'role_id' => Role::ROLE_USER,

        ]);
    }
    private function createEntrepriseUser(): User
    {
        return User::factory()->create([
            'role_id' => Role::ROLE_ENTREPRISE,

        ]);
    }
}
