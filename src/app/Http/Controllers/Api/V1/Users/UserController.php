<?php

namespace App\Http\Controllers\Api\V1\Users;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class UserController extends Controller
{


    public function index()
    {
        return $this->authorize('basic-user');
    }

    /**
     * Lien de connexion avec google
     *
     * Cette route retourne une url qui permet de se connecter avec un compte google si le compte n'existe pas
     * un compte sera automatiquement crée sur la plateforme.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function redirect()
    {
        $redirectUrl = Socialite::driver('google')->stateless()->redirect()->getTargetUrl();

        return response()->json(['url' => $redirectUrl], Response::HTTP_OK);
    }


    /**
     * Méthode appelé par google
     *
     * cette route est directement appelé par google pour la redirection sur la plateforme après l'authentification
     * @param Request $request
     * 
     */
    public function authWithGoogle(Request $request)
    {
        try {
            //on recherche si le user existe
            $googleUser = Socialite::driver('google')->stateless()->user();

            $user = User::where('google_id', $googleUser->id)->first();

            if (!$user) {
                $user = User::create([
                    'name' => $googleUser->getName() ?? '',
                    'lastname' => $googleUser->getNickname() ?? 'no lastname',
                    'email' => $googleUser->getEmail(),
                    'password' => null,
                    'google_id' => $googleUser->id,
                    'role_id' => 2,
                ]);
            }


            Auth::login($user);

            $device = substr($request->userAgent() ?? '', 0, 30);
            $expireDate = $request->remember ? null : now()->addMinutes(config('session.lifetime'));

            $token = $user->createToken($device)->accessToken;

            return redirect()->to('http://localhost:3001/?token=' . $token);
            // return response()->json([
            //     "access_token" => $user->createToken($device)->accessToken,
            //     'token_type' => 'Bearer',
            //     'expires_at' => $expireDate,
            //     'name' => $user->name,
            //     'id' => $user->id,
            //     'role' => $user->role_id,
            // ], Response::HTTP_OK);
        } catch (Throwable $err) {
            return response()->json([
                "message" => "An error occurred",
                "error" => $err->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
