<?php

use App\Http\Controllers\AdminController;
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

//Staff CRUD
Route::post('createStaff', 'App\Http\Controllers\StaffController@createStaff');
Route::get('getStaff/{id}', 'App\Http\Controllers\StaffController@readStaff');
Route::get('readAllStaff', 'App\Http\Controllers\StaffController@readAllStaff');
Route::put('updateStaff/{id}', 'App\Http\Controllers\StaffController@updateStaff');
Route::delete('deleteStaff/{id}', 'App\Http\Controllers\StaffController@deleteStaff');
Route::post('addStaffColumn', 'App\Http\Controllers\StaffController@addStaffColumn');
