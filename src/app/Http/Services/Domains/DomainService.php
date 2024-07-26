<?php

namespace App\Http\Services\Domains;

use App\Http\Repositories\Domains\DomainRepository;

class DomainService
{
    public function __construct(private DomainRepository $domainRepository)
    {
    }


    public function getDomainName(int $domainId) {
        $domain = $this->domainRepository->findDomain($domainId);
        if( $domain) {
            return $domain->name;
        }
        return "no domain name";
    }

}
