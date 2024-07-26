<?php

use App\Http\Controllers\Api\V1\Answers\AnswerController;
use App\Http\Controllers\Api\V1\Domain\DomainController;
use App\Http\Controllers\Api\V1\Levels\LevelController;
use App\Http\Controllers\Api\V1\Links\LinkController;
use App\Http\Controllers\Api\V1\LoginController;
use App\Http\Controllers\Api\V1\LogoutController;
use App\Http\Controllers\Api\V1\PasswordUpdateController;
use App\Http\Controllers\Api\V1\Profil\ProfileController;
use App\Http\Controllers\Api\V1\Questions\QuestionController;
use App\Http\Controllers\Api\V1\Quiz\QuizController;
use App\Http\Controllers\Api\V1\RegisterController;
use App\Http\Controllers\Api\V1\Users\EntrepriseController;
use App\Http\Controllers\Api\V1\Users\UserController;
use App\Http\Controllers\TestConnexionController;
use App\Models\Quiz;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

//les routes qui n'ont pas besoin d'authentification
Route::prefix('api/v1')->group(function () {
    Route::get('test', TestConnexionController::class);
    Route::post('auth/register', RegisterController::class)->name('register');
    Route::post('auth/login', LoginController::class)->name('login');

    //levels
    Route::get('levels', [LevelController::class, 'index']);

    //domains
    Route::get('domains', [DomainController::class, 'index']);

    //questions
    Route::get('questions', [QuestionController::class, 'index']);

    //quiz
    Route::get('quizzes', [QuizController::class, 'index']);
    Route::get('answers/{questionId}', [AnswerController::class, 'index']);


    //authentification avec google
    Route::get('authenticate/google', [UserController::class, 'redirect']);

    // route appele par google pour revenir sur la page
    Route::get('oauth/google/call-back', [UserController::class, 'authWithGoogle']);

});




// les routes ci-dessous ont besoin d'être authentifié avant d'être atteinte
Route::middleware(['auth:api'])->group(function () {
    Route::prefix('api/v1')->group(function () {
        Route::get('profil', [ProfileController::class, 'show'])->name('profil.show');
        Route::put('update/profil', [ProfileController::class, 'update'])->name('profil.update');
        Route::put('update/password', PasswordUpdateController::class);
        Route::post('logout', LogoutController::class);
        Route::delete('delete/profil', [ProfileController::class, 'destroy']);
        Route::post("add/profil-picture", [ProfileController::class, 'addProfilePicture']);

        Route::get('user/quiz', [UserController::class, 'index']);
        Route::get('entreprise/quiz', [EntrepriseController::class, 'index']);

        //level les nivaux
        Route::put('level/update/{id}', [LevelController::class, 'update']);
        Route::post('level/store', [LevelController::class, 'store']);
        Route::delete('level/destroy', [LevelController::class, 'destroy']);

        // domain

        Route::post('domain/store', [DomainController::class, 'store'])->middleware('is.admin');
        Route::delete('domain/delete/{id}', [DomainController::class, 'destroy'])->middleware('is.admin');

        // questions

        Route::post('question/store', [QuestionController::class, 'store']);
        Route::get('question/show/{id}', [QuestionController::class, 'show']);
        Route::put('question/update/{id}', [QuestionController::class, 'update']);
        Route::delete('question/delete/{id}', [QuestionController::class, 'destroy']);

        // générer un qui avec open Ai
        Route::post('quiz/openai/generate', [QuizController::class, 'generateQuizByOpenAi']);

        // quiz

        Route::post('quiz/generate/link', [LinkController::class, 'store']);

        Route::post('quiz/store', [QuizController::class, 'store']);
        Route::get('quiz/{id}', [QuizController::class, 'show']);
        Route::post('quiz/user/answer/{id}', [QuizController::class, 'answerQuiz']);
        Route::delete('quiz/delete/{id}', [QuizController::class, 'destroy']);
        Route::get('quiz/results/{quiz:id}/{user:id}', [QuizController::class, 'resultUser']);

        Route::get('answer/{answerId}', [AnswerController::class, 'show']);
        Route::delete('delete/answer/{answerId}', [AnswerController::class, 'destroy']);


    });
    Route::get('invitation-link', [LinkController::class, 'show']);
});
