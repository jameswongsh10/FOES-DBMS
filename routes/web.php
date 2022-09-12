<?php

use App\Http\Controllers\KeyContactPersonController;
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

//Key Contact Person CRUD
Route::post('createKeyContactPerson', [KeyContactPersonController::class, 'createKeyContactPerson']);
Route::get('getKeyContactPerson/{id}', [KeyContactPersonController::class, 'readKeyContactPerson']);
Route::get('readAllKeyContactPerson', [KeyContactPersonController::class, 'readAllKeyContactPerson']);
Route::put('updateKeyContactPerson/{id}', [KeyContactPersonController::class, 'updateKeyContactPerson']);
Route::delete('deleteKeyContactPerson/{id}', [KeyContactPersonController::class, 'deleteKeyContactPerson']);

