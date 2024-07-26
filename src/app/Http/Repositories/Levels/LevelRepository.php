<?php

namespace App\Http\Repositories\Levels;

use App\Models\Level;
use Illuminate\Database\Eloquent\Collection;

class LevelRepository
{
    public function create(string $name, int $point) {
        return Level::create([
            'name' => $name,
            'points' => $point
        ]);
    }


    //supprime un level dans la base de données
    // mais le level apparait toujours on effectue juste un soft deleting
    public function delete(Level $level) {
        return $level->delete();
    }

    public function find(string $levelSlug) {
        return Level::where('slug', $levelSlug)->first();
    }


    //renvoi tous les levels
    public function findAll(): Collection | null {
        return Level::all();
    }
    /*
     * cette function récupère seulement le nom d'un level
      */
    public function findById(int $levelId) {
        return Level::where('id',$levelId)->first();
    }

    public function update(Level $level, $data) {
        return $level->update($data);
    }
}
