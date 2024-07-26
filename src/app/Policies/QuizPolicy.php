<?php

namespace App\Policies;

use App\Models\Quiz;
use App\Models\Role;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class QuizPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return  true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Quiz $quiz): bool
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return Role::ROLE_ENTREPRISE === $user->role_id || $user->role_id === Role::ROLE_ADMINISTRATOR;

    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Quiz $quiz): bool
    {
        return $quiz->user->id === $user->id || $user->role_id === Role::ROLE_ADMINISTRATOR ;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Quiz $quiz): bool
    {

        return $quiz->user->id === $user->id || $user->role_id === Role::ROLE_ADMINISTRATOR ;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Quiz $quiz): bool
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Quiz $quiz): bool
    {
        //
    }
}
