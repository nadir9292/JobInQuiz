<?php

namespace App\Http\Requests;

use App\Rules\UserHasEntrepriseRole;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class LinkRequest extends FormRequest
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
            'quiz_id' => ['required', 'integer', Rule::exists('quizzes', 'id')],
            'user_id' => ['required', 'integer', Rule::exists('users', 'id'), new UserHasEntrepriseRole()],
            'validite' => ['integer'],
        ];
    }
}
