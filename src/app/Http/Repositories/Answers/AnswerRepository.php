<?php

namespace App\Http\Repositories\Answers;

use App\Models\Answer;
use App\Models\Question;

class AnswerRepository
{
    public function create(array $data, Question $question) {
      return  Answer::create([
          'answer' => $data['title'],
          'correct_answer' => $data['correct_answer'],
          'question_id' => $question->id
      ]);
    }

    public function update($data, Answer $answer) {
        return $answer->update($data);
    }


    public function delete(Answer $answer) {
        return $answer->delete();
    }

    public function getAnswers(int $questionId) {
        return Answer::where('question_id', $questionId)->get();
    }

    public function getAnswer(int $answerId) {
        return Answer::findOrFail($answerId);
    }



}
