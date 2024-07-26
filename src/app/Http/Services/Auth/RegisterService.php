<?php

namespace App\Http\Services\Auth;

use App\Http\Repositories\Users\UserRepository;
use App\Http\Requests\RegisterRequest;

class RegisterService
{

private UserRepository $userRepository;
  public function __construct()
  {
    $this->userRepository = new UserRepository();
  }

  public function addUser(RegisterRequest $request) {
    return $this->userRepository->createUser($request);
  }
}
