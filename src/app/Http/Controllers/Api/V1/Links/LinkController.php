<?php

namespace App\Http\Controllers\Api\V1\Links;

use App\Http\Controllers\Controller;
use App\Http\Repositories\Quiz\QuizRepository;
use App\Http\Repositories\Users\UserRepository;
use App\Http\Requests\LinkRequest;
use App\Http\Resources\QuizResource;
use App\Http\Services\Links\LinkService;
use App\Http\Services\Profils\ProfilService;
use App\Http\Services\Quiz\QuizService;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use \Symfony\Component\HttpFoundation\Response as ResponseSm;
use Illuminate\Http\Request;


class LinkController extends Controller
{

    public function __construct(private readonly LinkService $linkService) {

    }

    /**
     * Créer un nouveau lien pour un quiz.
     *
     * Pour la création d'un nouveau l'id de l'entreprise est requis, l'id du quiz est requis, et la durée de validation
     * en heure est optionnel la durée par défaut est de 48H

     */
    public function store(LinkRequest $request): JsonResponse
    {
        $this->authorize('create-quiz');

        //recupération du quiz
        $quiz_id = $request->quiz_id;
        $quiz = (new QuizService(new QuizRepository()))->getQuiz($quiz_id);
        if(!$quiz) {
            return response()->json(['message' => "Ce quiz n'existe pas ou a été supprimé."],ResponseSm::HTTP_NOT_FOUND);
        }
        $user_id = $request->user_id;
        $user = (new ProfilService(new UserRepository()))->getProfile($user_id);
        if(!$user) {
            return response()->json(['message' => "l'utilisateur n'existe pas"],ResponseSm::HTTP_NOT_FOUND);
        }
        $nombresHeureValid = $request->validite;
        $link = $this->linkService->creatingLink($quiz, $user, $nombresHeureValid);
        $appURL = env('APP_URL');
        $customLink = "$appURL/invitation-link?token=$link->hash_token";
        return response()->json(['message' => "votre lien a été crée.",'link' => $customLink],ResponseSm::HTTP_OK);
    }


    public function show(Request $request): QuizResource|JsonResponse
    {
        $token = $request->query('token');
        $link = $this->linkService->getLink($token);
        if($link === false) {
            return response()->json(['message' => "ce lien n'existe pas"],ResponseSm::HTTP_NOT_FOUND);
        }
        //vérifie si le lien est valide
        $linkIsValid = $this->linkService->checkExpireLink($link);
        if(!$linkIsValid) {
            return response()->json(['message' => "Le lien a expiré. Veuillez demander un nouveau lien."],ResponseSm::HTTP_NOT_FOUND);
        }
        //sinon si le lien est valide, on récupère le quiz
        $quiz = (new QuizService(New QuizRepository()))->getQuiz($link->quiz_id);
        return QuizResource::make($quiz);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
