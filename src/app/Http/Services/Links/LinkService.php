<?php

namespace App\Http\Services\Links;

use App\Http\Repositories\Links\LinkRepository;
use App\Models\Link;
use App\Models\Quiz;
use Carbon\Carbon;

class LinkService
{
    public function __construct(private readonly LinkRepository $linkRepository)
    {
    }

    public function creatingLink($quiz, $user, $expireTime = 48) {

       return $this->linkRepository->create($quiz->id, $user, $expireTime);
    }

    public function getLink(string $token) {
       $token = $this->linkRepository->findHashToken($token);
       if(!$token) {
           return false;
       }
       return $token;
    }

    public function checkExpireLink(Link $link): bool {
        $now = Carbon::now('Europe/Paris');
        $expiresAt = $link->expires_at;
        return  $expiresAt >= $now ;
    }

}
