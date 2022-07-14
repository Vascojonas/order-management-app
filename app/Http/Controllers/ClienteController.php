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
use App\Models\Carrinho;
use App\Models\Encomenda;
use App\Models\EncomendaProduto;
use App\Models\encomendasItens;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ClienteController extends Controller
{
    function todasEncomendas(){
        $data = DB::table('encomendas_itens')
        ->leftJoin('clientes', 'clientes.user_id','=', 'encomendas_itens.user_id')
        ->leftJoin('produtos', 'produtos.id', '=','encomendas_itens.produto_id')
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

    function finalizarCompra(Request $request){
        $validator = Validator::make($request->all(),[
            'id'=>'required',
            'valor'=>'required',
            'quantidade'=>'required',
            'status'=>'required',
            'user_id'=>'required'
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
            $item =  encomendasItens::where('user_id','=',$request->input('user_id'))
            ->where('produto_id', '=', $request->input('id'))->first();
            
            if($item){
        
                    $item->valor=$request->input('valor');
                    $item->quantidade=$request->input('quantidade');
                    $item->status=$request->input('status');
                    $item->prazo=$todaydate = date("Y-m-d", time()+48*60*60);
                    $item->update();
            
                    return response()->json([
                        'status'=> 200,
                        'data'=> $item,
                        'message'=>"Detalhes actualizados com sucesso!"
                    ]);

            }else{

                return response()->json([
                    'status'=> 404,
                    'data'=> $item,
                    'message'=>"Produto não encontrado!"
                ]);

            }
        }
    }

    function itemUpdate(Request $request){
        $validator = Validator::make($request->all(),[
            'id'=>'required',
            'descricao'=>'required',
            'produto_id'=>'required',
            'user_id'=>'required'
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

            
            $item =  encomendasItens::find($request->input('id'));
            
            if($item){
        
                    $item->descricao=$request->input('descricao');
                    $item ->imagem_ass=$request->input('imagem');

                    $item->update();
            
                    return response()->json([
                        'status'=> 200,
                        'data'=> $item,
                        'message'=>"Detalhes actualizados com sucesso!"
                    ]);

            }else{

                return response()->json([
                    'status'=> 404,
                    'data'=> $item,
                    'message'=>"Produto não encontrado!"
                ]);

            }
            
            
            
            
           



        }

    }

    function itemSave(Request $request){
        $validator = Validator::make($request->all(),[
            'descricao'=>'required',
            'produto_id'=>'required',
            'user_id'=>'required'
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
                'descricao' =>$request->input('descricao'),
                'imagem_ass'=>$request->input('imagem'),
                'produto_id'=>$request->input('produto_id'),
                'user_id'=> $request->input('user_id')
            ];
            
            $item =  encomendasItens::create($data);
            
            
            
           
            return response()->json([
                'status'=> 200,
                'data'=> $item,
                'message'=>"Detalhes adcionados com sucesso!"
            ]);



        }

    }

    function getEncomendasItens($request){
        $params= explode("-", $request);
        
        if(count($params)==2){
            $user_id= $params[0];
            $produto_id =$params[1];
            
            $ecomendaItem = encomendasItens::where('user_id','=',$user_id)
            ->where('produto_id', '=', $produto_id)->first();

            if($ecomendaItem){
                return response()->json([
                    'status'=> 200,
                    'data'=>$ecomendaItem
                ]);
            }else{
                return response()->json([
                    'status'=> 404,
                    'data'=>"Not found!"
                ]);
            }

        }

    }


    function  encomendaDetalhesSave(Request $request){

        $validator = Validator::make($request->all(),[
             'descricao'=>'required',
             'produto_id'=>'required',
             'user_id'=>'required'
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
                 'descricao' =>$request->input('descricao'),
                 'imagem'=>$request->input('imagem'),
                 'produto_id'=>$request->input('produto_id')
             ];

             $cliente = Cliente::where('user_id',$request->input('user_id'))->first();
             
             return response()->json([
                'status'=> 200,
                'message'=>$cliente,
            ]);
             if($cliente){
                 
                 $encomenda = $cliente->encomenda;
                 if($encomenda){
                     
                         $ep= new EncomendaProduto([
                            'descricao'=>$data['descricao'],
                            'imagem_ass'=>$data['imagem'],
                            'encomenda_id'=>$encomenda['id'],
                            'produto_id'=>$data['produto_id']
                        ]);
                        
                        $result = $encomenda->attach($ep);
                        return response()->json([
                           'status'=> 200,
                           'data'=>$result
                       ]);

                       
                    }else{
                        $ec = new Encomenda();

                        $encomenda=$cliente->encomenda()->save($ec);
                        
                        $ep= new EncomendaProduto([
                            'descricao'=>$data['descricao'],
                               'imagem_ass'=>$data['imagem'],
                               'encomenda_id'=>$encomenda['id'],
                               'produto_id'=>$data['produto_id']
                           ]);

                        $result = $ep->save();
                        return response()->json([
                            'status'=> 200,
                            'message'=>"Detalhes anexados com sucesso!",
                        ]);

                    }
                }
                    
            
         }
     
     }


    function getUserEncomenda($id){
   

        $cliente = Cliente::where('user_id',$id)->first();
    
        if($cliente){
    
            $encomenda = $cliente->encomenda;
            if($encomenda){
    
                $produtos= $encomenda->produtos;
                return response()->json([
                    'status'=> 200,
                    'data'=>$produtos
                ]);
            }else{
    
                return response()->json([
                    'status'=> 404,
                    'data'=>$encomenda
                ]);
    
            }
            return response()->json([
                'status'=> 200,
                'data'=>$cliente
            ]);
    
        }else{
            return response()->json([
                'status'=> 422,
                'data'=>"Cliente nao exite"
            ]);
        }
    
       }

    function getProductById($id){
        $produto= Produto::find($id);

        if($produto){
            return response()->json([
                'status'=> 200,
                'data'=>$produto
            ]);
        }else{
            return response()->json([
                'status'=> 404,
                'data'=>$produto
            ]); 
        }
    }
    
   function carrinhoProdutoRemove($request){   
          
        $params= explode("-", $request);
    

        if(count($params)==2){

            $user_id= $params[0];
            $product_id =$params[1];
            $cliente=Cliente::where('user_id', $user_id)->first();
          
            $carrinho= $cliente->carrinho;

            
            $ip=DB::table('carrinho_produto')->where('produto_id','=', $product_id)
            ->where('carrinho_id','=', $carrinho->id)->delete();
    
            return response()->json([
                'status'=> 200,
                'message'=>"Produto removido do carrinho"
            ]);

        }else{

            return response()->json([
               'status'=> 404,
               'data'=>"Not found!"
           ]);
        }
        
                

   }

   function carrinhoProdutos($id){
      
        $cliente = Cliente::where('user_id',$id)->first();

        if($cliente){
            
           {/* $result = DB::table('produtos')
                    ->rightJoin('carrinho_produto','produtos.id','=', 'carrinho_produto.produto_id')
                    ->leftJoin('carrinhos', 'carrinhos.id','=', 'carrinho_produto.carrinho_id')
                    ->leftJoin('clientes','clientes.id','=', 'carrinhos.cliente_id')
                    ->leftJoin('encomendas_itens', 'clientes.user_id','=','encomendas_itens.user_id')
                    ->select('produtos.*','encomendas_itens.id as statusId','encomendas_itens.status')
                    ->where('clientes.user_id', $id)
                    ->where('produtos.id','<>', null)
                    ->orderBy('produtos.id', 'desc')
                    ->get();
           */}

            $carrinho = $cliente->carrinho;
            //$produtos= $carrinho->produtos;
            
            if($carrinho){
    
                $produtos= $carrinho->produtos;
                return response()->json([
                    'status'=> 200,
                    'data'=>$produtos
                ]);
            }else{
                return response()->json([
                    'status'=> 200,
                    'data'=> []
                ]);
            }

        }else{
            return response()->json([
                'status'=> 404,
                'data'=>[]
            ]);

        }

   }



   function getUserCarrinho($id){
   

    $cliente = Cliente::where('user_id',$id)->first();

    if($cliente){

        $carrinho = $cliente->carrinho;
        if($carrinho){

            $produtos= $carrinho->produtos;
            return response()->json([
                'status'=> 200,
                'data'=>$carrinho
            ]);
        }else{

            $c = new Carrinho();
            $cliente->carrinho()->save($c);

            getUserCarrinho($id);

        }
        return response()->json([
            'status'=> 200,
            'data'=>$cliente
        ]);

    }else{
        return response()->json([
            'status'=> 422,
            'data'=>"Cliente nao exite"
        ]);
    }

   }

   function produtoCarrinhoSave(Request $request){

    $validator = Validator::make($request->all(),[
        'produto_id'=>'required',
        'carrinho_id'=>'required'
    ]);

    
    $produto=Produto::find($request->input('produto_id'));
    
    if($produto){
        
                
            $carrinho= Carrinho::find($request->input('carrinho_id'));
            
            $hasproduto = $carrinho->produtos()->where('produto_id', $produto->id)->exists();
            if($hasproduto){
                return response()->json([
                    'status'=> 405,
                    'message'=>"Este produto já existe no seu carrinho",
                ]);
            }else{
                $res=  $carrinho->produtos()->save($produto);

                return response()->json([
                    'status'=> 200,
                    'message'=>"Produto adicionado no carrinho!",
                ]);

            }


            return response()->json([
                'status'=> 200,
                'data'=>$res,
               
            ]);
        }else{
            return response()->json([
                'status'=> 404,
                'data'=>"produto nao exite"
            ]);
        }
   }


}
