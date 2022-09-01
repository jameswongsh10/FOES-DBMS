<?php

use App\Http\Controllers\MobilityController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StaffController;

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

Route::get('/', function () {
    return view('welcome');
});

//MOUMOA CRUD
Route::post('createMOUMOA', 'App\Http\Controllers\MOUMOA_Controller@createMOUMOA');
Route::get('getMOUMOA/{id}', 'App\Http\Controllers\MOUMOA_Controller@readMOUMOA');
Route::get('readAllMOUMOA', 'App\Http\Controllers\MOUMOA_Controller@readAllMOUMOA');
Route::put('updateMOUMOA/{id}', 'App\Http\Controllers\MOUMOA_Controller@updateMOUMOA');
Route::delete('deleteMOUMOA/{id}', 'App\Http\Controllers\MOUMOA_Controller@deleteMOUMOA');
Route::post('addMOUMOAColumn', 'App\Http\Controllers\MOUMOA_Controller@addMOUMOAColumn');

