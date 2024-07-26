<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class QuestionStoreRequest extends FormRequest
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
            'title' => ['string', 'max:150', 'required'],
            'domain_id' => ['int', 'required', Rule::exists('domains', 'id')],
            'level_id' => ['int', 'required', Rule::exists('levels', 'id')],
            'points' => ['int'],
            'answers' => ['min:2', 'required', 'array'],
        ];
    }
}
