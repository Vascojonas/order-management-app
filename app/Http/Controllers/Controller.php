<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;





    public function todosClientes(){

        try {
            //code...
            
            $clientes = DB::table('clientes')
            ->join('users', 'users.id', '=', 'clientes.user_id')
            ->join('roles', 'users.id', '=', 'roles.user_id')
            ->select('clientes.*', 'roles.nome as perfil')
            ->get();
    
        return response()->json([
            'status'=> 200,
            'clientes'=>$clientes,
        ]);
        } catch (Exception $e) {
            return response()->json([
                'status'=> 422,
                'clientes'=>$e,
            ]);
            
        }
    }
    
}
