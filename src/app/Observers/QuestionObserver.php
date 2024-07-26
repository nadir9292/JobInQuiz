<?php

namespace App\Observers;

use App\Models\Question;
use Illuminate\Support\Facades\Cache;

class QuestionObserver
{
    /**
     * Handle the Question "created" event.
     */
    public function created(Question $question): void
    {
        Cache::forget('questions');
    }

    /**
     * Handle the Question "updated" event.
     */
    public function updated(Question $question): void
    {
        Cache::forget('questions');
    }

    /**
     * Handle the Question "deleted" event.
     */
    public function deleted(Question $question): void
    {
        Cache::forget('questions');
    }

    /**
     * Handle the Question "restored" event.
     */
    public function restored(Question $question): void
    {
        //
    }

    /**
     * Handle the Question "force deleted" event.
     */
    public function forceDeleted(Question $question): void
    {
        //
    }
}
