<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


class TestConnexionController extends Controller
{

    public function __invoke(Request $request)
    {
        return "tu es connecté à l'api quiz dev. connect";
    }
}
