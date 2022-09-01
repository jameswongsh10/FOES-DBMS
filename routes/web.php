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

//KTPUSR CRUD
Route::post('createKTPUSR', 'App\Http\Controllers\KTPUSR_Controller@createKTPUSR');
Route::get('getKTPUSR/{id}', 'App\Http\Controllers\KTPUSR_Controller@readKTPUSR');
Route::get('readAllKTPUSR', 'App\Http\Controllers\KTPUSR_Controller@readAllKTPUSR');
Route::put('updateKTPUSR/{id}', 'App\Http\Controllers\KTPUSR_Controller@updateKTPUSR');
Route::delete('deleteKTPUSR/{id}', 'App\Http\Controllers\KTPUSR_Controller@deleteKTPUSR');
Route::post('addKTPUSRColumn', 'App\Http\Controllers\KTPUSR_Controller@addKTPUSRColumn');

