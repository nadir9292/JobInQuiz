<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class QuizReponseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'questions_answer' => ['required', 'array'],
            'questions_answer.*' => [
                'integer',
                Rule::exists('answers', 'id'),
            ],
        ];
    }

    protected function prepareForValidation()
    {
        if (is_array($this->questions_answer)) {
            foreach ($this->questions_answer as $key => $value) {
                $this->merge(["questions_answer_key_{$key}" => $key]);
            }
        }
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            foreach ($this->questions_answer as $key => $value) {
                if (!\DB::table('questions')->where('id', $key)->exists()) {
                    $validator->errors()->add("questions_answer_key_{$key}", "La question $key n'existe pas.");
                }
            }
        });
    }

    public function messages(): array
    {
        return [
            'questions_answer.required' => 'Le champ questions_answer est requis.',
            'questions_answer.array' => 'Le champ questions_answer doit être un tableau.',
            'questions_answer.*.integer' => 'Chaque réponse doit être un entier.',
            'questions_answer.*.exists' => 'Chaque réponse doit exister dans la base de données.',
        ];
    }
}
