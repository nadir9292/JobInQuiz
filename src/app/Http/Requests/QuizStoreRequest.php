<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class QuizStoreRequest extends FormRequest
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
        $rules = [
            "title" => ["string", "required"],
            "level_id" => ["integer", "required", Rule::exists('levels', 'id')],
            "questions" => ['array', 'min:1'],
            "questions_ids" => ['array', 'min:1', Rule::exists('questions', 'id')],
        ];


        if ($this->has('questions')) {
            // Si des questions existent alors ajoutons les règles de validation pour chaque question
            $rules['questions.*.title'] = ['string', 'required'];
            $rules['questions.*.domain_id'] = ['integer', 'required', Rule::exists('domains', 'id')];
            $rules['questions.*.level_id'] = ['integer', 'required', Rule::exists('levels', 'id')];
            $rules['questions.*.points'] = ['integer'];
            $rules['questions.*.answers'] = ['array', 'min:2', 'required'];
        }

        return $rules;
    }
}
