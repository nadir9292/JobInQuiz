<?php

namespace App\Http\Controllers\Api\V1\Users;

use App\Http\Controllers\Controller;
use App\Http\Resources\QuizResource;
use Illuminate\Http\Request;

class EntrepriseController extends Controller
{

    public function index() {

        $this->authorize('entreprise-user');
        //récupération du l'entreprise
        $entreprise = auth()->user();
        if($entreprise) {
             $quizzes = $entreprise->entrepriseQuizzes;

           return QuizResource::collection($quizzes);

        }
        //recupérations des quiz de l'entreprises

        return response()->json(['success' => true]);

    }
}
