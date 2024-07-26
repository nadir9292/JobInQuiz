<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class QuestionUpdateRequest extends FormRequest
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
            'title' => ['string', 'max:150'],
            'domain_id' => ['int', Rule::exists('domains', 'id')], //on vérifie si l'id passé est dans notre BDD
            'level_id' => ['int', Rule::exists('levels', 'id')],
            'points' => ['int'],
        ];
    }
}
