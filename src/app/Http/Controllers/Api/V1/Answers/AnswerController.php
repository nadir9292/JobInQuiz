<?php

namespace App\Http\Controllers\Api\V1\Answers;

use App\Http\Controllers\Controller;
use App\Http\Repositories\Questions\QuestionRepository;
use App\Http\Requests\AnswerRequest;
use App\Http\Resources\AnswerResource;
use App\Http\Services\answers\AnswerService;
use App\Http\Services\Questions\QuestionService;
use App\Models\Answer;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class AnswerController extends Controller
{

    public function __construct(private AnswerService $answerService)
    {
    }

    /**
     * Récupère toutes les réponses d'une question.
     */
    public function index(int $questionId): Response
    {
        //check if the question exist
        $question = (new QuestionService(new QuestionRepository()))->getQuestion($questionId);
        if(!$question) {
            return response()->json(['message' => 'cette question n\'existe pas.'], Response::HTTP_NOT_FOUND);
        }
        $answers = $this->answerService->getAnswers($questionId);
        return response()->json(['data' => AnswerResource::collection($answers)], Response::HTTP_OK);

    }


    /**
     * affiche une réponse donnée
     */
    public function show(Request $request, int $answerId)
    {
        try {
            $answer = $this->answerService->getAnswer($answerId);
        } catch (ModelNotFoundException $e) {
            return \response()->json(['message' => "Cette réponse n'existe pas."], Response::HTTP_NOT_FOUND);
        }

       return \response()->json(['data' => AnswerResource::make($answer)], Response::HTTP_OK);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Supprimez une question.
     */
    public function destroy( int $id)
    {
       // $this->authorize('create-quiz');
        try {
            $answer = $this->answerService->getAnswer($id);
        } catch (ModelNotFoundException $e) {
            return \response()->json(['message' => "Cette réponse n'existe pas."], Response::HTTP_NOT_FOUND);
        }

        $answer->delete();
        return \response()->json(['message' => "Réponse supprimée."], Response::HTTP_ACCEPTED);

    }
}
