<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AppController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//ADMIN AND USER API

//--produtos
Route::post('/api/admin/produtos/salvar',[\App\Http\Controllers\AppController::class,'cadastrarProduto']);
Route::get('/api/admin/produtos',[\App\Http\Controllers\AppController::class, 'allProducts']);
Route::delete('/api/admin/produtos/delete/{id}',[\App\Http\Controllers\AppController::class, 'deleteProduct']);
Route::get('/api/admin/produtos/{id}',[\App\Http\Controllers\AppController::class, 'getProductById']);
Route::post('/api/admin/produtos/upload',[\App\Http\Controllers\AppController::class, 'upload']);
Route::put('/api/admin/produtos/update',[\App\Http\Controllers\AppController::class, 'updateProduct']);



//Banner
Route::post('/api/admin/banner/salvar',[\App\Http\Controllers\AppController::class,'cadastrarBanner']);
Route::get('/api/admin/banners',[\App\Http\Controllers\AppController::class, 'allBanners']);


//--funcionario
Route::post('/api/admin/funcionario/salvar',[\App\Http\Controllers\AppController::class, 'cadastrarFuncionario']);
Route::get('/api/admin/funcionarios/listar',[\App\Http\Controllers\AppController::class, 'todosFuncionarios']);
Route::delete('/api/admin/funcionarios/delete/{id}',[\App\Http\Controllers\AppController::class, 'deleteUser']);

// Clientes
Route::post('/clientes/salvar',[\App\Http\Controllers\AppController::class, 'cadastrarCliente']);
Route::get('/api/admin/clientes/listar',[\App\Http\Controllers\AppController::class, 'todosClientes']);
Route::delete('/api/admin/clientes/delete/{id}',[\App\Http\Controllers\AppController::class, 'deleteUser']);
Route::get('/produtos/{id}',[\App\Http\Controllers\ClienteController::class, 'getProductById']);


//rolle
Route::get('/user/role/{id}',[\App\Http\Controllers\AppController::class, 'getRole']);

//Encomendas  
Route::get('/api/admin/encomendas/iten/{id}',[\App\Http\Controllers\AppController::class, 'getEncomendaIten']);
Route::put('/api/admin/encomendas/update/status',[\App\Http\Controllers\AppController::class, 'updateItemStatus']);



Route::get('/clientes/carrinho/{id}',[\App\Http\Controllers\ClienteController::class, 'getUserCarrinho']);
Route::post('/carrinho/produtos/salvar',[\App\Http\Controllers\ClienteController::class,'produtoCarrinhoSave']);
Route::get('/carrinho/produtos/{id}',[\App\Http\Controllers\ClienteController::class, 'carrinhoProdutos']);
Route::delete('/carrinho/produtos/delete/{code}',[\App\Http\Controllers\ClienteController::class, 'carrinhoProdutoRemove']);

Route::get('/clientes/wish/{id}',[\App\Http\Controllers\ClienteController::class, 'getUserWish']);
Route::post('/wish/produtos/salvar',[\App\Http\Controllers\ClienteController::class,'produtoWishSave']);
Route::get('/wish/produtos/{id}',[\App\Http\Controllers\ClienteController::class, 'WishProdutos']);
Route::delete('/wish/produtos/delete/{code}',[\App\Http\Controllers\ClienteController::class, 'WishProdutoRemove']);



Route::get('/clientes/encomenda/{id}',[\App\Http\Controllers\ClienteController::class, 'getUserEncomenda']);
Route::post('/encomenda/detalhes/salvar',[\App\Http\Controllers\ClienteController::class, 'encomendaDetalhesSave']);



Route::get('/clientes/encomenda/itens/{id}',[\App\Http\Controllers\ClienteController::class, 'getEncomendasItens']);
Route::post('/encomenda/itemSalvar/salvar',[\App\Http\Controllers\ClienteController::class, 'itemSave']);
Route::put('/encomenda/item/update',[\App\Http\Controllers\ClienteController::class, 'itemUpdate']);
Route::put('/encomenda/finalizar/compra',[\App\Http\Controllers\ClienteController::class, 'finalizarCompra']);
Route::get('/api/admin/encomendas/listar',[\App\Http\Controllers\ClienteController::class, 'todasEncomendas']);









//M-pesa service
Route::post('/carrinho/encomendar',[\App\Http\Controllers\MpesaController::class,'receiveMoney']);



//Route::post('/user/profile',[UserProfileController::class, 'show']);

Route::get('/', function () {
    return view('welcome');
});



Route::get('/admin/produtos/cadastrar', function () {
    return view('welcome');
});

Route::get('/admin/produtos/listar', function () {
    return view('welcome');
});

Route::get('/admin/funcionarios', function () {
    return view('welcome');
});

Route::get('/admin/funcionarios/cadastrar', function () {
    return view('welcome');
});


Route::get('/encomendas/personalizar/{id}', function () {
    return view('welcome');
});

Route::get('/cliente/carinho', function () {
    return view('welcome');
});

Route::get('/cliente/whish', function () {
    return view('welcome');
});


Route::get('/clientes/cadastrar', function () {
    return view('welcome');
});

Route::get('/login', function () {
    return view('welcome');
});


Route::get('/admin/clientes', function () {
    return view('welcome');
});

Route::get('/admin/produtos/cadastrar/{id}', function () {
    return view('welcome');
});

Route::get('/admin/produtos/encomendas/pendentes', function () {
    return view('welcome');
});

Route::get('/admin/produtos/encomendas/finalizadas', function () {
    return view('welcome');
});

Route::get('/admin/produtos/encomendas/entregues', function () {
    return view('welcome');
});

Route::get('/admin/encomenda/details/{id}', function () {
    return view('welcome');
});

Route::get('/admin/produtos/agenda', function () {
    return view('welcome');
});


