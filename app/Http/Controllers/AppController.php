<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Support\Facades\DB;
use App\Models\Produto;
use App\Models\User;
use App\Models\Role;
use App\Models\Cliente;
use App\Models\Funcionario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;


class AppController extends Controller
{

public function deleteUser($id){
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


public function todosFuncionarios(){

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


public function cadastrarFuncionario(Request $request){
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


public function cadastrarCliente(Request $request){
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
                'message'=>'produto adcionado com sucesso!',
            ]);
        }
    
    }
}
