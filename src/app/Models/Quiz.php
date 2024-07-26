<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Quiz extends Model
{
    use HasFactory, SoftDeletes, Sluggable;

    protected $fillable = ['title', 'level_id', 'slug', "user_id"];

    public function sluggable(): array
    {

        return [
            'slug' => [
                'source' => 'title',
                'onUpdate' => true
            ]
        ];
    }


    public function questions(): BelongsToMany {
        return $this->belongsToMany(Question::class);
    }

    public function level(): HasOne {
        return $this->hasOne(Level::class);
    }

    /**
     * @return BelongsTo
     * cette methode récupère le créateur du quiz
     */
    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    /**
     * @return BelongsToMany
     * Cette methode définit qu'un quiz peut être répondu par plusieurs user
     * d'où la relation belongsToMany
     */
    public function users(): BelongsToMany {
        return $this->belongsToMany(User::class);
    }

    /**
     * @return BelongsToMany
     * Cette méthode récupère les utilisateurs qui ont participé à ce quiz
     */
    public function participants(): BelongsToMany {
        return $this->belongsToMany(User::class, 'answer_user')
            ->withTimestamps();
    }




}
