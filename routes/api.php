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

//MOUMOA CRUD
Route::post('createMOUMOA', 'App\Http\Controllers\MOUMOA_Controller@createMOUMOA');
Route::get('getMOUMOA/{id}', 'App\Http\Controllers\MOUMOA_Controller@readMOUMOA');
Route::get('readAllMOUMOA', 'App\Http\Controllers\MOUMOA_Controller@readAllMOUMOA');
Route::put('updateMOUMOA/{id}', 'App\Http\Controllers\MOUMOA_Controller@updateMOUMOA');
Route::delete('deleteMOUMOA/{id}', 'App\Http\Controllers\MOUMOA_Controller@deleteMOUMOA');
Route::post('addMOUMOAColumn', 'App\Http\Controllers\MOUMOA_Controller@addMOUMOAColumn');
