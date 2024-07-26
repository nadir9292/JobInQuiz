<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ImageOrBase64 implements ValidationRule
{

    public function passes($attribute, $value)
    {
        // Check if the value is a file
        if (request()?->hasFile($attribute)) {
            $file = request()?->file($attribute);
            return in_array($file->getMimeType(), ['image/jpeg', 'image/png', 'image/jpg']);
        }

        // Check if the value is a base64 encoded image
        if (is_string($value) && preg_match('/^data:image\/(jpg|jpeg|png);base64,/', $value)) {
            $decoded = base64_decode(preg_replace('/^data:image\/(jpg|jpeg|png);base64,/', '', $value), true);
            return $decoded !== false;
        }

        return false;
    }

    public function message()
    {
        return 'The :attribute must be a valid image file or a base64 encoded image.';
    }
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        //

    }
}
