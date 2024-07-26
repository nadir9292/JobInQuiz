<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Question extends Model
{
    use HasFactory, SoftDeletes, Sluggable;

    protected $fillable = ['title', 'slug', 'domain_id', 'user_id', 'points', 'level_id' ];

    public function answers(): HasMany {
        return $this->hasMany(Answer::class);
    }

    public function domain(): BelongsTo {
        return $this->BelongsTo(Domain::class);
    }

    public function user():BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function quizzes(): BelongsToMany {
        return $this->belongsToMany(Quiz::class);
    }

    public function sluggable(): array
    {

        return [
            'slug' => [
                'source' => 'title',
                'onUpdate' => true
            ]
        ];
    }
}
