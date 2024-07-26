<?php

namespace App\Http\Controllers\Api\V1\Questions;

use App\Http\Controllers\Controller;
use App\Http\Repositories\Answers\AnswerRepository;
use App\Http\Requests\QuestionStoreRequest;
use App\Http\Requests\QuestionUpdateRequest;
use App\Http\Resources\QuestionResource;
use App\Http\Services\answers\AnswerService;
use App\Http\Services\Questions\QuestionService;
use App\Models\Question;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;

class QuestionController extends Controller
{

    public function __construct(private QuestionService $questionService)
    {
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $questions = $this->questionService->findAllQuestions();
        if(!$questions) {
            return response()->json(['message' => 'aucunes questions trouvées'], Response::HTTP_OK);
        }
        return response()->json([ 'data' => Cache::rememberForever('questions', static function() use ($questions) {
            return QuestionResource::collection($questions);
        })], Response::HTTP_OK);

    }

    /**
     * @param QuestionStoreRequest $request
     * answers attends un tableau clés valeurs/json où la clé est la reponse et la valeur est boolean
     * pour savoir si c'est la reponse exacte ou pas
     *
     */

    public function store(QuestionStoreRequest $request)
    {
        //on vérifie si l'utilisateur à l'autorisation pour effectuer cette action
        if ($request->user()->cannot('create-question', Question::class)) {
            //abort(403, 'nope');
            return response()->json(['message' => 'vous n\'avez pas les droits requis pour effectuer cette action.'], Response::HTTP_FORBIDDEN);

        }
        $question = $this->questionService->creatingQuestion($request);
        if(!$question) {
           return response()->json(['message' => 'votre question n\'a pas pu être créer contacter l\'administrateur. '], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        //ajouter les réponses de la question qu'on vient de créer.
        $answers = $request->answers;
        $answerAdded = (new AnswerService((new AnswerRepository())))->creatingAnswer($answers, $question);
        if(!$answerAdded) {
            return response()->json(['message' => 'impossible d\'ajouter des réponses à ses questions '], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
       return response()->json(['message' => "questions et réponses ajoutés"], Response::HTTP_CREATED);
    }

    /**
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(int $id)
    {
      $question =  $this->questionService->getQuestion($id);

      if(!$question) {
          return response()->json(['message' => 'cette question n\'existe pas '], Response::HTTP_NOT_FOUND);
      }
      return response()->json(['data' => QuestionResource::make($question)], Response::HTTP_OK);
    }

    /**
     * @param QuestionUpdateRequest $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(QuestionUpdateRequest $request, $id)
    {
        $question = $this->questionService->getQuestion($id);
        if(!$question) {
            return response()->json(['message' => 'cette question n\'existe pas.'], Response::HTTP_NOT_FOUND);
        }
        //on vérifie si l'utilisateur peut effectuer l'action de modification sur cette question
        try {
            $this->authorize('update-question', [$question]);
        }catch (AuthorizationException $exception) {
            return response()->json(['message' => 'vous n\'avez pas les droits requis pour cette action'], Response::HTTP_FORBIDDEN);

        }
        $this->questionService->updateQuestion($question, $request->all());
        //return  $question->wasChanged();
        if($question->wasChanged()) {
            return response()->json(['question' => QuestionResource::make($question),'message' => 'votre question a été mise à jour.'], Response::HTTP_ACCEPTED);
        }
        return response()->json(['question' => QuestionResource::make($question),'message' => 'aucun changements constatés'], Response::HTTP_OK);


    }

    /**
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(string $id)
    {
      $question = $this->questionService->getQuestion($id);
      if(!$question) {
          return response()->json(['message' => 'cette question n\'existe pas.'], Response::HTTP_NOT_FOUND);
      }
     if($question->delete()) {
         return response()->json(['message' => 'question supprimé avec succès'], Response::HTTP_OK);
     }
         return response()->json(['message' => 'impossible de supprimer la question'], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}
