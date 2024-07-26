<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class TestController extends Controller
{

    public function test() {
       // $permissions = Permission::whereHas('roles')->get();


        $permissions = Permission::whereHas('roles', function($query) {
        //dd(auth()->user());
            $query->where('roles.id', 2);

        })->get();
        foreach($permissions as $permission) {
        //dd($permission);
           dd (Gate::define($permission->name, fn() => true));
        }
    }
}
