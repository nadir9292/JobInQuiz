<?php

namespace App\Http\Repositories\Domains;

use App\Models\Domain;

class DomainRepository
{
    public function  create(array $data) {
       return Domain::create($data);
    }

    public function findDomain(int $domainId): Domain|null {
        return Domain::where('id',$domainId)->first();
    }
    public function delete(Domain $domain):bool {
       return $domain->delete();
    }
    public function update(Domain $domain, $data) {
       return $domain->update($data);
    }
}
