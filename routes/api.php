<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//KTPUSR CRUD
Route::post('createKTPUSR', 'App\Http\Controllers\KTPUSR_Controller@createKTPUSR');
Route::get('getKTPUSR/{id}', 'App\Http\Controllers\KTPUSR_Controller@readKTPUSR');
Route::get('readAllKTPUSR', 'App\Http\Controllers\KTPUSR_Controller@readAllKTPUSR');
Route::put('updateKTPUSR/{id}', 'App\Http\Controllers\KTPUSR_Controller@updateKTPUSR');
Route::delete('deleteKTPUSR/{id}', 'App\Http\Controllers\KTPUSR_Controller@deleteKTPUSR');
Route::post('addKTPUSRColumn', 'App\Http\Controllers\KTPUSR_Controller@addKTPUSRColumn');
