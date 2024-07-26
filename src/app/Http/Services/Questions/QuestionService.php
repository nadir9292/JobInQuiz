<?php

namespace App\Http\Services\Questions;

use App\Http\Repositories\Answers\AnswerRepository;
use App\Http\Repositories\Questions\QuestionRepository;
use App\Http\Requests\QuestionStoreRequest;
use App\Http\Services\answers\AnswerService;
use App\Models\Question;
use Illuminate\Support\Collection;
use Symfony\Component\HttpFoundation\Response;

class QuestionService
{
    public function __construct(private QuestionRepository $questionRepository)
    {
    }

    public function creatingQuestion($request): Question|null {

        $data = [
          'title' => $request->get('title'),
          'points' => $request->get('points') ?? 1,
          'user_id' => auth()->user()->id,
          'domain_id' => $request->get('domain_id'),
          'level_id' => $request->get('level_id'),

        ];
       return $this->questionRepository->create($data);

    }

    public function getQuestion(int $questionID): Question|null {
       return $this->questionRepository->find($questionID);

    }

    public function findAllQuestions(): Collection | null {
       return $this->questionRepository->all();
    }

    public function updateQuestion(Question $question, $data) {

       return $this->questionRepository->update($question, $data);
    }

    public function createQuestions(array $questions, int $quizId): bool | Response {
        foreach($questions as $question) {
            $questionCollection = collect($question);
            $questionCreated = $this->creatingQuestion($questionCollection);
            if(!$questionCreated) {
                return response()->json(['message' => 'impossible de créer la question'], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
            //on traite les réponses
            $answers = $questionCollection->get('answers');
            $answerAdded = (new AnswerService((new AnswerRepository())))->creatingAnswer($answers, $questionCreated);
            if(!$answerAdded) {
                return response()->json(['message' => 'impossible d\'ajouter des réponses à ses questions '], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
            $questionCreated->quizzes()->attach($quizId);
        }

        return true;
    }

}
