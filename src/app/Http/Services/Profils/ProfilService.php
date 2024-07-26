<?php

namespace App\Http\Services\Profils;

use App\Http\Repositories\Users\UserRepository;
use App\Models\User;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProfilService
{
    public function __construct(private UserRepository $userRepository)
    {
    }

    public function getProfile(int $id)
    {
        return $this->userRepository->find($id);
    }

    public function updateProfile(User $user, array $data): bool
    {
        return $this->userRepository->update($user, $data);
    }

    public function createImage($request):bool
    {
        $file_path = (string) $request->get('image');
        // encode l'image avant de la stroker en bdd
        $data = [
            'profil_picture' => $file_path,
        ];
        $user = $this->getProfile(auth()->user()->id);
        if($user) {
            return $this->userRepository->addProfilePicture($user, $data);
        }
        return false;
    }


    // cette méthode verifie si l'image passer en paramètre est en base 64
    public function isBase64($string): bool
    {
        //decode l'image
        $decoded = base64_decode($string, true);
        if ($decoded === false) {

            return false;
        }

        $encoded = base64_encode($decoded); // decode l'image
        // si l'encodage fonctionne alors il est bien en base64

        return $encoded === $string;
    }


    public function saveBase64Image(string $base64Image): string
    {
        // on explode le tableau
        $image_parts = explode(";base64,", $base64Image);
        $image_type_aux = explode("image/", $image_parts[0]);
        $image_type = $image_type_aux[0];
        $image_base64 = base64_decode($image_parts[1]);

        // Creation du fichier
        $nameFile = Str::random(10) . '.' . $image_type;
        $filePath = 'images_' . auth()->user()->id . '/' . $nameFile;

        // Save the image
        //Storage::disk('public')->put($filePath, $image_base64);

        return $filePath;
    }


    public function saveImageProfil(object $file)
    {
        $nameFile = $file->getClientOriginalName();
        $randomName = $file->hashName();
        $random = explode(".", $randomName);
        $finalFileName = $random[0] . "-" . $nameFile;
        return $file->storeAs('images_' . auth()->user()->id, $finalFileName);
    }


}
