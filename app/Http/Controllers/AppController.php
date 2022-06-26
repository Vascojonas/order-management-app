<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Produto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;


class AppController extends Controller
{





  public function editProduct($id)
    {
        $produto = Produto::find($id);
        if($produto)
        {
            return response()->json([
                'status'=> 200,
                'produto' => $produto,
            ]);
        }
        else
        {
            return response()->json([
                'status'=> 404,
                'message' => 'Nenhum produto foi achado com esse ID',
            ]);
        }

    }

    public function deleteImage($nome){
        Storage::delete($nome);
    }

    public function deleteProduct($id){
       
        $produto = Produto::find($id);
        if($produto)
        {   
            
            $this->deleteImage($produto->nome);

            $produto->delete();

            return response()->json([
                'status'=> 200,
                'message'=>'produto eliminadao com sucesso',
            ]);
        }
        else
        {
            return response()->json([
                'status'=> 404,
                'message' => 'Nenhum produtofo encontrado com esse ID',
            ]);
        }
    }


    function allProducts(){
        $products = Produto::all();
        return response()->json([
            'status'=> 200,
            'products'=>$products,
        ]);
    }

    public function upload(Request $request){
            
        $request->validate([
           'file' => 'required|mimes:jpg,jpeg,png|max:2048'
        ]);

        if($request->file()) {
            $file_name = time().'_'.$request->file->getClientOriginalName();
            $file_path = $request->file('file')->storeAs('uploads', $file_name, 'public');

            $name = time().'_'.$request->file->getClientOriginalName();
            $path = '/storage/' . $file_path;
    

            return response()->json([
                'path'=>$path,
                'success'=>'File uploaded successfully.'
            ]);
        }
   }

   

    function  cadastrarProduto(Request $request){

       $validator = Validator::make($request->all(),[
            'nome'=>'required|min:3',
            'categoria'=>'required|min:3',
            'descricao'=>'required',
            'quantidade'=>'required',
            'preco'=>'required',
            'imagem'=>'required'
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
            

            try{
                Produto::create($data);
            }catch(Exception $e){
                $erro = $e;
            }

            return response()->json([
                'status'=> 200,
                'message'=>'produto Added Successfully',
            ]);
        }
    
    }
}
