<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Answer;
use App\Models\Domain;
use App\Models\Level;
use App\Models\Question;
use App\Models\Quiz;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run()
    {
        /* $this->call([
             RoleSeeder::class,
             AdminUserSeeder::class,
             PermissionSeeder::class,
         ]); */

        $this->call([
            RoleSeeder::class,
            AdminUserSeeder::class,
            UserSeeder::class,
            PermissionSeeder::class,
            //LevelSeeder::class,
            //DomainSeeder::class,
           // QuestionSeeder::class,
            QuizSeeder::class
        ]);


    }
}
