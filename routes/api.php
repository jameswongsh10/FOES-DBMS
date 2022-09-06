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

//Staff CRUD
Route::post('createStaff', 'App\Http\Controllers\StaffController@createStaff');
Route::get('getStaff/{id}', 'App\Http\Controllers\StaffController@readStaff');
Route::get('readAllStaff', 'App\Http\Controllers\StaffController@readAllStaff');
Route::put('updateStaff/{id}', 'App\Http\Controllers\StaffController@updateStaff');
Route::delete('deleteStaff/{id}', 'App\Http\Controllers\StaffController@deleteStaff');
Route::post('addStaffColumn', 'App\Http\Controllers\StaffController@addStaffColumn');
