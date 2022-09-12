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

//Asset CRUD
Route::post('createAsset', [\App\Http\Controllers\AssetController::class, 'createAsset'])->name('createAsset');
