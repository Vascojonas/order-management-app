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

Route::post('/api/admin/produtos/salvar',[\App\Http\Controllers\AppController::class, 'cadastrarProduto']);

//Route::post('/user/profile',[UserProfileController::class, 'show']);

Route::get('/', function () {
    return view('welcome');
});

Route::get('/admin/produtos/cadastrar', function () {
    return view('welcome');
});

