<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Role;
use App\Models\User;
use App\Models\idade;
use App\Models\Cliente;
use App\Models\Produto;
use App\Models\Funcionario;
use App\Models\Publicidade;
use App\Models\encomendasItens;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;


class AppController extends Controller
{

    function deleteBanner($id){
        $data = Publicidade::find($id);

        if($data){
            $data->delete();
            $data->update();
            return response()->json([
                'status'=> 200,
                'data'=> $data,
                 'message'=>"Banner eliminado com sucesso!"
            ]);
        }else{
            return response()->json([
                'status'=> 404,
                'data'=> $data,
                 'message'=>"Falha!"
            ]);
        }
    }

    function updateItemStatus(Request $request){
        $validator = Validator::make($request->all(),[
            'id'=>'required',
            'status'=>'required',
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

            $data = encomendasItens::find($request->input('id'));

            if($data){
                $data->status= $request->input('status');
                $data->update();
                return response()->json([
                    'status'=> 200,
                    'data'=> $data,
                     'message'=>"Encomenda foi finalizada com suceeso!"
                ]);
            }else{

                return response()->json([
                    'status'=> 404,
                    'data'=> $data,
                     'message'=>"Encomenda não encontrada!"
                ]);

            }

        }
    }

    function getEncomendaIten($id){
        $data = DB::table('encomendas_itens')
        ->leftJoin('clientes', 'clientes.user_id','=', 'encomendas_itens.user_id')
        ->leftJoin('produtos', 'produtos.id', '=','encomendas_itens.produto_id')
        ->where('encomendas_itens.id', $id)
        ->select('clientes.*','produtos.nome as pnome', 'produtos.imagem as imagem' , 'encomendas_itens.*', 'encomendas_itens.id as encomendaId')
        ->get();

        if($data){
            return response()->json([
                'status'=> 200,
                'data'=> $data,
            ]);
        }else{
            return response()->json([
                'status'=> 404,
                'data'=> "Sem encomendas",
            ]); 
        }
    }

    function updateProduct(Request $request){
        $validator = Validator::make($request->all(),[
           
            'nome'=>'required|min:3',
            'categoria'=>'required|min:3',
            'descricao'=>'required',
            'preco'=>'required',
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
            $produto= Produto::find($request->input('id'));

            if($produto){
                $produto->nome=$request->input('nome');
                 $produto->categoria=$request->input('categoria');
                 $produto->descricao=$request->input('descricao');
                 $produto->preco=$request->input('preco');


                 $resp = $produto->update();


                 return response()->json([
                     'status'=> 200,
                     'message'=> "Produto actualizado com sucesso!",
                 ]);
            }else{
                return response()->json([
                    'status'=> 404,
                    'message'=> 'Erro ao tentar actualizar',
                ]);
            }
            
        }
    }

    function getProductById($id){
        
        $produto = Produto::find($id);

        if($produto){
            return response()->json([
                'status'=> 200,
                'data'=>$produto,
            ]);
        }else{
            return response()->json([
                'status'=> 404,
                'data'=>"Not found",
            ]);
        }
    }

     function todosClientes(){

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


 function getRole($id){
    $user= User::find($id);
   
    if($user){

        $role =$user->role()->first();
        return response()->json([
            'status'=> 200,
            'role'=> $role,
        ]);

    }
}

 function deleteUser($id){
    $user = User::find($id);
    
        if($user)
        {   
            $user->delete();
            return response()->json([
                'status'=> 200,
                'message'=>'Usuário eliminado com sucesso!',
            ]);
        }
        else
        {
            return response()->json([
                'status'=> 404,
                'message' => 'Nenhum usuário encontrado com esse ID',
            ]);
        }   
}


 function todosFuncionarios(){

    try {
        //code...
        
        $fucionarios = DB::table('funcionarios')
        ->join('users', 'users.id', '=', 'funcionarios.user_id')
        ->join('roles', 'users.id', '=', 'roles.user_id')
        ->select('funcionarios.*', 'roles.nome as perfil')
        ->get();

    return response()->json([
        'status'=> 200,
        'fucionarios'=>$fucionarios,
    ]);
    } catch (Exception $e) {
        return response()->json([
            'status'=> 422,
            'fucionarios'=>$e,
        ]);
        
    }
}





 function cadastrarFuncionario(Request $request){
    $validator = Validator::make($request->all(),[
        'nome'=>'required|min:3',
        'apelido'=>'required|min:3',
        'cidade'=>'required|min:3',
        'bi'=>'required|min:3',
        'bairro'=>'required|min:3',
        'quarteirao'=>'required',
        'casa'=>'required',
        'sexo'=>'required',
        'dataNascimento'=>'required',
        'perfil'=>'required',
        'tel1'=>'required|min:9',
        'email'=>'required|email',
        'username'=>'required|min:3',
        'password'=>'required|min:8'
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

        $u = User::where('name',$request->input('username'))->first();
       
        if($u){
            
            $userExist=['username'=>"Este username já existe"];
            return response()->json([
                'status'=> 422,
                'validate_err'=>  $userExist
            ]);

        }else{

            $u = User::where('email',$request->input('email'))->first();
            if($u){
            
                $userExist=['email'=>"Já existe um usuário com este email"];
                return response()->json([
                    'status'=> 422,
                    'validate_err'=>  $userExist
                ]);

            } else{

                try {
                    $user=[
                        'name'=>$request->input('username'),
                        'password'=> bcrypt($request->input('password')),
                        'email'=>$request->input('email'),
                    ];

                    $u= User::create($user);
                    
                    
                    if($request->input('perfil')==='admin'){
                        $role = new Role(['nome'=>'admin']);

                    }else{
                        $role = new Role(['nome'=>'editor']);
                    }

                    $r=$u->role()->save($role);
                    

                    $f =[
                        'nome' => $request->input('nome'),
                        'apelido'=>$request->input('apelido'),
                        'bi' =>$request->input('bi'),
                        'cidade'=>$request->input('cidade'),
                        'bairro'=>$request->input('bairro'),
                        'quarteirao'=>$request->input('quarteirao'),
                        'casa'=>$request->input('casa'),
                        'sexo' =>$request->input('sexo'),
                        'dataNascimento'=>$request->input('dataNascimento'),
                        'tel1' =>$request->input('tel1'),
                        'tel2' =>$request->input('tel1'),
                        'email'=>$request->input('email'),
                    ];


                    
                    $funcionario= new Funcionario($f);

                    $rc = $u->funcionario()->save($funcionario); 

                    return response()->json([
                        'status'=> 200,
                        'message'=>'Usuário cadastrado com sucesso!',
                    ]);


                } catch (Exception $e) {
                    return response()->json([
                        'status'=> 200,
                        'data'=>$e
                    ]);
                }

            }

        }


    }

}


 function cadastrarCliente(Request $request){
    $validator = Validator::make($request->all(),[
        'nome'=>'required|min:3',
        'apelido'=>'required|min:3',
        'telefone'=>'required|min:9',
        'email'=>'required|email',
        'username'=>'required|min:3',
        'password'=>'required|min:8'
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

            $u = User::where('name',$request->input('username'))->first();
           
            if($u){
                
                $userExist=['username'=>"Este username já existe"];
                return response()->json([
                    'status'=> 422,
                    'validate_err'=>  $userExist
                ]);

            }else{

                $u = User::where('email',$request->input('email'))->first();
                if($u){
                
                    $userExist=['email'=>"Já existe um usuário com este email"];
                    return response()->json([
                        'status'=> 422,
                        'validate_err'=>  $userExist
                    ]);

                } else{

                    try {
                        $user=[
                            'name'=>$request->input('username'),
                            'password'=> bcrypt($request->input('password')),
                            'email'=>$request->input('email'),
                        ];
    
                        $u= User::create($user);
                    
                        $role = new Role(['nome'=>'user']);
                        $r=$u->role()->save($role);
                        
    
                        $c =[
                            'nome' => $request->input('nome'),
                            'apelido'=>$request->input('apelido'),
                            'telefone' =>$request->input('telefone'),
                            'email'=>$request->input('email'),
                        ];
                        
                        $cliente= new Cliente($c);
    
                        $rc = $u->cliente()->save($cliente); 
    
                        return response()->json([
                            'status'=> 200,
                            'message'=>'O seu registro foi efectuado com sucesso!',
                        ]);
    
    
                    } catch (Exception $e) {
                        return response()->json([
                            'status'=> 200,
                            'data'=>$e
                        ]);
                    }

                }

            }


        }
}



    function editProduct($id)
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

    function deleteImage($nome){
        Storage::delete($nome);
    }

    function deleteProduct($id){
       
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

    function categorias(){
        $categoria = DB::table('produtos')
        ->distinct()->get(['categoria']);

        return response()->json([
            'status'=> 200,
            'categoria'=>$categoria,
        ]);
    }

    function allBanners(){
        $publicidades = Publicidade::all();

        return response()->json([
            'status'=> 200,
            'publicidades'=>$publicidades,
        ]);
    }

    function upload(Request $request){
            
        $request->validate([
           'file' => 'required|mimes:jpg,jpeg,png'
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
                'message'=>'produto adcionado com sucesso!',
            ]);
        }
    
    }


    function  cadastrarBanner(Request $request){

        $validator = Validator::make($request->all(),[
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
                 'titulo' => $request->input('titulo'),
                 'descricao' =>$request->input('descricao'),
                 'imagem'=>$request->input('imagem')
             ];
             
 
             try{
                 Publicidade::create($data);
                 return response()->json([
                     'status'=> 200,
                     'message'=>'Publicidade adcionada com sucesso!',
                 ]);
             }catch(Exception $e){
                 $erro = $e;

                 return response()->json([
                    'status'=> 422,
                    'validate_err'=>$erro,
                ]);
             }
 
         }
     
     }
}


