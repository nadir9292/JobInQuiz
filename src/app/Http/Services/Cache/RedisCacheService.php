<?php

namespace App\Http\Services\Cache;

use Illuminate\Support\Facades\Cache;

class RedisCacheService
{
    public function __construct() {

    }


    public function updateCache(string $key, $data): bool {
        Cache::store('redis')->put($key, $data, now()->addHours(4));
       return true;
    }

}
