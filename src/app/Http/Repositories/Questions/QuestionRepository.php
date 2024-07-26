<?php

namespace App\Http\Repositories\Questions;

use App\Models\Question;
use Illuminate\Support\Collection;

class QuestionRepository
{
    public function create(array $data): Question|null {
       return Question::create($data);
    }

    public function find(int $id): Question|null {
        return Question::find($id);
    }

    public function all(): Collection|null {
        return Question::with('answers')->get();
    }

    public function update(Question $question, array $data): bool {
        return $question->update($data);
    }
}
