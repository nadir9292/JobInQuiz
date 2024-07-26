<?php

namespace App\Http\Services\Quiz;

use App\Http\Repositories\Quiz\QuizRepository;
use App\Http\Requests\QuizStoreRequest;
use App\Http\Resources\AnswerResource;
use App\Http\Resources\QuestionResource;
use Illuminate\Support\Facades\DB;

class QuizService
{
    public function __construct(private QuizRepository $quizRepository)
    {
    }

    public function createQuiz(QuizStoreRequest $request) {
        $data = [
            'title' => $request->title,
            'level_id' => $request->level_id,
            'user_id' => auth()->user()->id

        ];
        return $this->quizRepository->create($data);

    }

    public function getQuizzes() {
      return $this->quizRepository->getQuizWithQuestions();
    }

    public function getQuiz(int $quizId) {
       return $this->quizRepository->getQuiz($quizId);
    }

    public function userAnswerToQuiz(array $userAnswers,  $questionsQuiz, int $quizId) {
        $responseOfUser = [];

        $points = 0;
        $possible_points = 0;
        foreach ($userAnswers as $questionIdUser => $answerIdUser) {

            foreach ($questionsQuiz as $question) {
                $possible_points += $question->points;
                $findAnswer = false;
                $questionIdUser = (int) $questionIdUser;


                //on récupère les 2 questions égales
                if($questionIdUser === $question->id) {
                    //recuperations de toutes les reponses associer a cette question
                    $answers =  AnswerResource::collection($question->answers);
                    $correctAnswer =$question->answers->firstWhere('correct_answer', true);
                    foreach ($answers as $answer) {

                        // si l'id de la reponse est egale à la réponse de l'utilisateur
                        if($answer->id === (int) $answerIdUser) {
                            $findAnswer = true;
                            $points += $answer->correct_answer ? $question->points : 0;


                            $responseUser = [
                                'question' => $question->title,
                                'answers' => AnswerResource::collection($question->answers),
                                'correct_answer' => $correctAnswer ?? "aucune réponse ne correspond",
                                'user_answer' => $answer->answer
                            ];



                            $responseOfUser[] = $responseUser;
                        }


                    }
                    // si aucune réponse n'a été trouvée c'est à dire si la réponse est fausse
                    if(!$findAnswer) {
                        //return $question->answers;
                        $answer = $question->answers->firstWhere('correct_answer', true);
                        $reponseUser = $question->answers->firstWhere('id', $answerIdUser)->answer ?? 'votre réponse n\'est pas un choix possible pour cette question.';
                        $responseUser = [
                            'question' => $question->title,
                            'answers' => AnswerResource::collection($question->answers),
                            'correct_answer' =>$answer ?? 'pas de réponse possible ',
                            'user_answer' => $reponseUser
                        ];
                        $responseOfUser[] = $responseUser;
                    }

                }
            }

            //stoke la réponse de l'utilisateur en base
            $data = [
                'user_id' => auth()->user()->id,
                'quiz_id' => $quizId,
                'question_id' => $questionIdUser,
                'answer_id' => $answerIdUser,
                'created_at' => now(),
                'updated_at' => now(),
            ];
            //si on a pas reussi a inserer les données du quiz
            if(!$this->quizRepository->insertUserAnswer($data)) {
                return [false];
            }
        }

        return ["results" => $responseOfUser, 'points' => $points, 'point_possible' => $possible_points];
    }



}

