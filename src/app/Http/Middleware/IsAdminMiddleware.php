<?php

namespace App\Http\Middleware;

use App\Models\Role;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if($request->user()->role_id !== Role::ROLE_ADMINISTRATOR) {
            return response()->json(['message' => 'vous n\'avez pas les droits requis.'], Response::HTTP_FORBIDDEN);
        }
        return $next($request);
    }
}
