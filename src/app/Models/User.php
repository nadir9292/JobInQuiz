<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

// use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'points',
        'profil_picture',
        'company_name',
        'google_id',
        'lastname',
        'password',
        'role_id'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function questions(): HasMany {
        return $this->hasMany(Question::class);
    }

    public function entrepriseQuizzes(): HasMany {
        return $this->HasMany(Quiz::class);
    }

    public function quizzes(): BelongsToMany {
        return $this->BelongsToMany(Quiz::class);
    }

    /**
     * @return BelongsToMany
     * Cette méthode récupère les quiz auxquels un utilisateur a participé
     */
    public function quizzesParticipated(): BelongsToMany {
        return $this->belongsToMany(Quiz::class, 'answer_user')
            ->withTimestamps();
    }
}
