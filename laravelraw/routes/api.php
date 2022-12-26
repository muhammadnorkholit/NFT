<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\api\DashboardController;
use App\Http\Controllers\api\CategoryController;
use App\Http\Controllers\api\CollectionController;
use App\Http\Controllers\api\MemberController;
use App\Http\Controllers\api\BerandaController;
use App\Http\Controllers\api\profilController;
use App\Http\Controllers\api\transactionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post("/login",[AuthController::class,"login"]);
Route::post("/signup",[AuthController::class,"signup"]);
Route::get("/logout",[AuthController::class,"logout"]);



Route::resource('/dashboard', DashboardController::class);
Route::resource('/category', CategoryController::class);
Route::post('/category/s/{id}', [CategoryController::class,"update"]);
Route::resource('/collection', CollectionController::class);
Route::resource('/member', MemberController::class);
Route::resource('/transaction', transactionController::class);
Route::get('/beranda',[ BerandaController::class,'index']);
Route::get('/beranda/{id}',[ BerandaController::class,'detail']);
Route::get('/categories/{category}',[ BerandaController::class,'category']);
Route::get('/categories',[ BerandaController::class,'allCategory']);
Route::get('/search',[ BerandaController::class,'search']);
Route::post('/forget',[ AuthController::class,'forgetPassword']);

Route::get('/profil/{username}',[ profilController::class,'index']);
// Route::resource('/member', MemberController::class);
