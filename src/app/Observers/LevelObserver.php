<?php

namespace App\Observers;

use App\Models\Level;
use Illuminate\Support\Facades\Cache;

class LevelObserver
{
    /**
     * Handle the Level "created" event.
     * on supprime le cache si un nouveau cache est crée
     */
    public function created(Level $level): void
    {
        Cache::forget('levels');
    }

    /**
     * Handle the Level "updated" event.
     */
    public function updated(Level $level): void
    {
        Cache::forget('levels');
    }

    /**
     * Handle the Level "deleted" event.
     */
    public function deleted(Level $level): void
    {
        Cache::forget('levels');
    }

    /**
     * Handle the Level "restored" event.
     */
    public function restored(Level $level): void
    {
        Cache::forget('levels');
    }

    /**
     * Handle the Level "force deleted" event.
     */
    public function forceDeleted(Level $level): void
    {
        Cache::forget('levels');
    }
}
