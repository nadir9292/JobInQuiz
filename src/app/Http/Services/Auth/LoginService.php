<?php

namespace App\Http\Services\Auth;

use App\Http\Repositories\Users\UserRepository;
use App\Http\Requests\LoginRequest;

class LoginService
{

  public function __construct(private UserRepository $userRepository)
  {
  }

  public function getUser(LoginRequest $request) {
      $userEmail = $request->email;
     return $this->userRepository->findUserByEmail($userEmail);
  }
}
