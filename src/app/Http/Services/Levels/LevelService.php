<?php

namespace App\Http\Services\Levels;

use App\Http\Repositories\Levels\LevelRepository;
use App\Http\Requests\LevelRequest;
use Illuminate\Database\Eloquent\Collection;

class LevelService
{
    public function __construct(private LevelRepository $levelRepository) {

    }

    public function creatingLevel(array $level) {
        $name = $level['name'];
        $points = $level['points'];
        return $this->levelRepository->create($name, $points);

    }

    public function getLevel(string $levelSlug) {
       return  $this->levelRepository->find($levelSlug);
    }
    public function getLevelById(int $id) {
       return  $this->levelRepository->findById($id);
    }



    /**
     * suppréssion d'un niveau (level)
     */

    public function deleteLevel(string $levelSlug):bool {
       $level = $this->getLevel($levelSlug);
       if(!$level) {
           return false;
       }
      return $this->levelRepository->delete($level);
    }

    public function getAllLevels(): Collection | null {
        return $this->levelRepository->findAll();
    }


    public function getLevelName(int $levelId): string {
        $level = $this->levelRepository->findById($levelId);

        if($level !== null) {
            return $level->name;
        }
        return 'Level name not exist';
    }

    public function updateLevel(int $levelId, $request) {
       $level = $this->getLevelById($levelId);
        $this->levelRepository->update($level, $request->all());
        return $level;

    }

}
