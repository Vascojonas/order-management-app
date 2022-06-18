<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Produto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class AppController extends Controller
{

    function  cadastrarProduto(Request $request){

        $validator = Validator::make($request->all(),[
            'nome'=>'required|min:3',
            'categoria'=>'required|min:3',
            'descricao'=>'required',
            'quantidade'=>'required',
            'preco'=>'required',
            'imagem'=>'required|min:3',
        ]);
        
        if($validator->fails())
        {
            return response()->json([
                'status'=> 422,
                'validate_err'=> $validator->errors(),
            ]);
        }
        else
        {

            $data =[
                'nome' => $request->input('nome'),
                'categoria'=>$request->input('categoria'),
                'descricao' =>$request->input('descricao'),
                'quantidade'=>$request->input('quantidade'),
                'preco'=>$request->input('preco'),
                'imagem'=>$request->input('imagem')
            ];
            
            $erro='No Exce[tion';

            try{
                Produto::create($data);
            }catch(Exception $e){
                $erro = $e;
            }

            return response()->json([
                'status'=> 200,
                'message'=>'produto Added Successfully',
                'erro'=> $erro
            ]);
        }
    
    }
}
