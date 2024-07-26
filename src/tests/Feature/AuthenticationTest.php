<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    private User $user;
    private User $entrepriseUser;
    public function setUp(): void
    {
        parent::setUp();

        // Load Passport migrations
        //  $this->artisan('migrate', ['--database' => 'sqlite']);

        // Install Passport
        $this->artisan('passport:install', ['--no-interaction' => true]);
    }


    public function test_registration_fail_with_role_admin()
    {

        $response = $this->postJson('api/v1/auth/register', [
            'lastname' => 'lastname',
            'name' => 'name',
            'email' => 'valid@email.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'role_id' => Role::ROLE_ADMINISTRATOR
        ]);

        $response->assertStatus(422);
    }
    public function test_registration_success_with_role_user()
    {
        $response = $this->postJson('/api/v1/auth/register', [
            'lastname' => 'lastname',
            'name' => 'name',
            'email' => 'valid@email.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'role_id' => Role::ROLE_USER
        ]);

        $response->assertStatus(201);
    }
    public function test_registration_success_with_role_entreprise()
    {
        $response = $this->postJson('/api/v1/auth/register', [
            'lastname' => 'lastname',
            'name' => 'name',
            'email' => 'valid@email.com',
            'password' => 'ValidPassword',
            'password_confirmation' => 'ValidPassword',
            'role_id' => Role::ROLE_ENTREPRISE
        ]);

        $response->assertStatus(201)->assertJsonStructure([
            'access_token',
        ]);
    }

    public function test_unauthenticated_user_can_acces_quiz()
    {
        $response =  $this->get('api/v1/quizzes');
        $response->assertStatus(200);
    }
}
