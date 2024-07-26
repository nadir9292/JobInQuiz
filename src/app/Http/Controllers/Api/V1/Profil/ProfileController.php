<?php

namespace App\Http\Controllers\Api\V1\Profil;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfilImageRequest;
use App\Http\Requests\ProfilUpdateRequest;
use App\Http\Resources\ProfilRessource;
use App\Http\Services\Cache\RedisCacheService;
use App\Http\Services\Profils\ProfilService;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class ProfileController extends Controller
{

    public function __construct(private ProfilService $profilService)
    {
    }

    public function addProfilePicture(ProfilImageRequest $request)
    {

      $imageAdd =  $this->profilService->createImage($request);
      return $imageAdd;
      if($imageAdd) {
          return Response()->json(['message' => 'image ajouté avec succès', 'data' => new ProfilRessource(auth()->user())], ResponseAlias::HTTP_CREATED);
      }
      return  Response()->json(['message' => 'impossible d\'ajouté cette image. le format n\'est doit être en base 64' ], ResponseAlias::HTTP_BAD_REQUEST);
    }

    public function show(Request $request): JsonResponse
    {
        return Response()->json(['data' => new ProfilRessource($request->user())], ResponseAlias::HTTP_OK);
    }

    public function update(ProfilUpdateRequest $request): JsonResponse
    {
        $user = auth()->user();
        if(!$user) {
            return Response()->json(['data' => "aucun utilisateur"], ResponseAlias::HTTP_NOT_FOUND);
        }
        $cacheKey = 'user:' . $user->id;
        $fromCache = false;
        # on met à jour
        $user->update($request->all());
        //on vérifie si une clé soit name, lastname, email à changer
        $valuesHasChanged = $user->wasChanged(['name', 'lastname', 'email']);
        if ($valuesHasChanged) {
            $data = [
                "data" => $request->all(),
                "message" => "profil mis à jour",
            ];
        } else {
            $data = [
                "data" => $request->all(),
                "message" => "pas de changements effectués",
            ];
            $fromCache = (new RedisCacheService())->updateCache($cacheKey, $data);
        }
        return response()->json([$cacheKey => $data, "from cache" => $fromCache], ResponseAlias::HTTP_ACCEPTED);
    }

    public function destroy()
    {
        $id = auth()->user()->id;
        $userToDelete = $this->profilService->getProfile($id);
        if (!$userToDelete) {
            return response()->json('cet utilisateur n\'existe pas.. ', ResponseAlias::HTTP_NOT_FOUND);
        }
        if (User::destroy($userToDelete->id)) {
            return response()->json('compte supprimé avec succès', ResponseAlias::HTTP_NO_CONTENT);
        }

        return response()->json('Une erreur est survenue impossible de supprimer le compte', ResponseAlias::HTTP_BAD_REQUEST);
    }



}
