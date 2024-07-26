<?php

namespace App\Http\Controllers\Api\V1\Levels;

use App\Http\Controllers\Controller;
use App\Http\Requests\LevelDestroyRequest;
use App\Http\Requests\LevelRequest;
use App\Http\Resources\LevelResource;
use App\Http\Resources\LevelsResource;
use App\Http\Services\Levels\LevelService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Gate;

class LevelController extends Controller
{

    public function __construct(private LevelService $levelService)
    {
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        // $levels =$this->levelService->getAllLevels();
        return response()->json(['data' => LevelResource::collection($this->levelService->getAllLevels())], Response::HTTP_OK);
    }

    /**
     * @param LevelRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(LevelRequest $request)
    {
        //on vérifie que l'utilisateur qui effectue la request est un admin
        Gate::authorize('create-level');

        $storeLevel = $this->levelService->creatingLevel($request->all());
        if (!$storeLevel) {
            return response()->json(['message' => 'Failed to create level'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        return response()->json([
            'message' => 'le niveau à bien été crée',
            'level' => LevelResource::make($storeLevel)
        ], Response::HTTP_CREATED);
    }

    /**
     * Display the resource.
     */
    public function show()
    {
        //
    }

    /**
     * Show the form for editing the resource.
     */
    public function edit()
    {
        //
    }

    /**
     * Update the resource in storage.
     */
    public function update(LevelRequest $request, int $levelId)
    {
        Gate::authorize('create-level');
        $level = $this->levelService->updateLevel($levelId, $request);
        if($level->wasChanged()) {
            return response()->json(['message' => ' le niveau a été mis à jour'], Response::HTTP_OK);
        }
        return response()->json(['message' => 'aucun changement effectué'], Response::HTTP_NOT_MODIFIED);


    }

    /**
     * @param LevelDestroyRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(LevelDestroyRequest $request)
    {
        Gate::authorize('create-level');
        $slug = $request->slug;
        $level = $this->levelService->deleteLevel($slug);

        if (!$level) {
            return response()->json(['message' => ' ce niveau n\'existe pas '], Response::HTTP_NOT_FOUND);
        }
        return  response()->json(['message' => ' niveau supprimé '], Response::HTTP_OK);
    }
}
