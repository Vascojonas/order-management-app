<?php

namespace App\Http\Controllers;

use App\Models\Produto;
use Illuminate\Http\Request;

class AppController extends Controller
{

    function  cadastrarProduto(Request $resquest){
            response()->json([
                'status' => 200,
                'message'=>'working'
            ]);
    }
}
