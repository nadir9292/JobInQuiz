<?php

namespace App\Rules;

use App\Models\Role;
use App\Models\User;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class UserHasEntrepriseRole implements ValidationRule
{

    public function passes($attribute, $value): bool
    {

        $user = User::find($value);

        return  $user->role_id === Role::ROLE_ENTREPRISE;
    }

    public function message()
    {
        return 'Vous n\'êtes pas une entreprise vous ne pouvez pas créer de lien d\'invitation ';
    }
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!$this->passes($attribute, $value)) {
           
            $fail($this->message());
        }
    }
}
