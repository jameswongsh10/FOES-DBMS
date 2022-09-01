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
Route::post('createStaff', [StaffController::class, 'createStaff'])->name('createStaff');

//Admin CRUD
Route::post('createAdmin', [AdminController::class, 'createAdmin'])->name('createAdmin');
Route::post('editAdmin', [AdminController::class, 'editAdmin'])->name('editAdmin');
Route::post('addAdminColumn', [AdminController::class, 'addAdminColumn'])->name('addAdminColumn');
Route::post('fetchAdminTable', [AdminController::class, 'fetchAdminTable'])->name('fetchAdminTable');


//Asset CRUD
Route::post('createAsset', [\App\Http\Controllers\AssetController::class, 'createAsset'])->name('createAsset');

//ResearchAwards CRUD
Route::post('createAwards', 'App\Http\Controllers\ResearchAwardsController@createAwards');
Route::get('getAwards/{id}', 'App\Http\Controllers\ResearchAwardsController@readAwards');
Route::get('getAwards/staff/{id}', 'App\Http\Controllers\ResearchAwardsController@getAwardsbyStaffID');
Route::get('readAllAwards', 'App\Http\Controllers\ResearchAwardsController@readAllAwards');
Route::put('updateAwards/{id}', 'App\Http\Controllers\ResearchAwardsController@updateAwards');
Route::delete('deleteAwards/{id}', 'App\Http\Controllers\ResearchAwardsController@deleteAwards');
Route::post('addAwardsColumn', 'App\Http\Controllers\ResearchAwardsController@addAwardsColumn');
