<?php

namespace Tests\Feature;

use App\Models\Level;
use App\Models\Role;
use App\Models\User;
use Faker\Factory as Faker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class LevelTest extends TestCase
{
    use RefreshDatabase;
    private User $user;
    private User $entrepriseUser;
    private User $admin;
    public function setUp(): void
    {
        parent::setUp();

        // $this->artisan('passport:install', ['--no-interaction' => true]);
        $this->admin = $this->createAdmin();
    }

    /**
     * A basic feature test example.
     */
    public function test_recuperer_tous_les_levels(): void
    {

        // call endpoint
        $response = $this->getJson('/api/v1/levels');

        //
        $response->assertStatus(Response::HTTP_OK);
    }

    public function test_destroy_deletes_level_Successfully()
    {
        // Create a level
        $level = Level::factory()->create(['slug' => 'test-level']);

        $response = $this->actingAs($this->admin, 'api')->deleteJson('/api/v1/level/destroy', [
            'slug' => $level->slug
        ]);

        // Assert the response status
        $response->assertStatus(Response::HTTP_OK);

        // Assert the level is deleted
        $this->assertDatabaseMissing('levels', ['slug' => 'test-level']);
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

    private function createAdmin(): User
    {
        return User::factory()->create([
            'role_id' => Role::ROLE_ADMINISTRATOR,

        ]);
    }
}
