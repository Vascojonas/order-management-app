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

Route::post('/api/admin/produtos/salvar',[\App\Http\Controllers\AppController::class,'cadastrarProduto']);
Route::get('/api/admin/produtos',[\App\Http\Controllers\AppController::class, 'allProducts']);
Route::delete('/api/admin/produtos/delete/{id}',[\App\Http\Controllers\AppController::class, 'deleteProduct']);
Route::get('/api/admin/produtos/edit/{id}',[\App\Http\Controllers\AppController::class, 'editProduct']);
Route::post('/api/admin/produtos/upload',[\App\Http\Controllers\AppController::class, 'upload']);


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


Route::get('/encomendas/personalizar', function () {
    return view('welcome');
});

Route::get('/encomendas/carinho', function () {
    return view('welcome');
});



