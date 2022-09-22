<?php

use App\Http\Controllers\MobilityController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StaffController;

use App\Http\Controllers\AdminController;
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

//Data Controller
Route::post('csvImport', 'App\Http\Controllers\DataController@csvImport');

//Admin CRUD
Route::post('createAdmin', 'App\Http\Controllers\AdminController@createAdmin');
Route::get('getAdmin/{id}', 'App\Http\Controllers\AdminController@readAdmin');
Route::get('readAllAdmin', 'App\Http\Controllers\AdminController@readAllAdmin');
Route::put('updateAdmin/{id}', 'App\Http\Controllers\AdminController@updateAdmin');
Route::delete('deleteAdmin/{id}', 'App\Http\Controllers\AdminController@deleteAdmin');
Route::post('addAdminColumn', 'App\Http\Controllers\AdminController@addAdminColumn');
Route::post('importAdminCSV', 'App\Http\Controllers\AdminController@importAdminCSV');

//Staff CRUD
Route::post('createStaff', [StaffController::class, 'createStaff'])->name('createStaff');

//InactiveMOUMOA CRUD
Route::post('createInactiveMOUMOA', 'App\Http\Controllers\Inactive_MOUMOA_Controller@createInactiveMOUMOA');
Route::get('getInactiveMOUMOA/{id}', 'App\Http\Controllers\Inactive_MOUMOA_Controller@readInactiveMOUMOA');
Route::get('readAllInactiveMOUMOA', 'App\Http\Controllers\Inactive_MOUMOA_Controller@readAllInactiveMOUMOA');
Route::put('updateInactiveMOUMOA/{id}', 'App\Http\Controllers\Inactive_MOUMOA_Controller@updateInactiveMOUMOA');
Route::delete('deleteInactiveMOUMOA/{id}', 'App\Http\Controllers\Inactive_MOUMOA_Controller@deleteInactiveMOUMOA');
Route::post('addInactiveMOUMOAColumn', 'App\Http\Controllers\Inactive_MOUMOA_Controller@addInactiveMOUMOAColumn');


//Asset CRUD
Route::post('createAsset', 'App\Http\Controllers\AssetController@createAsset');
Route::get('getAsset/{id}', 'App\Http\Controllers\AssetController@readAsset');
Route::get('readAllAsset', 'App\Http\Controllers\AssetController@readAllAsset');
Route::put('updateAsset/{id}', 'App\Http\Controllers\AssetController@updateAsset');
Route::delete('deleteAsset/{id}', 'App\Http\Controllers\AssetController@deleteAsset');
Route::post('addAssetColumn', 'App\Http\Controllers\AssetController@addAssetColumn');

//ResearchAwards CRUD
Route::post('createAwards', 'App\Http\Controllers\ResearchAwardsController@createAwards');
Route::get('getAwards/{id}', 'App\Http\Controllers\ResearchAwardsController@readAwards');
Route::get('getAwards/staff/{id}', 'App\Http\Controllers\ResearchAwardsController@getAwardsbyStaffID');
Route::get('readAllAwards', 'App\Http\Controllers\ResearchAwardsController@readAllAwards');
Route::put('updateAwards/{id}', 'App\Http\Controllers\ResearchAwardsController@updateAwards');
Route::delete('deleteAwards/{id}', 'App\Http\Controllers\ResearchAwardsController@deleteAwards');
Route::post('addAwardsColumn', 'App\Http\Controllers\ResearchAwardsController@addAwardsColumn');

//Mobility CRUD
Route::post('createMobility', 'App\Http\Controllers\MobilityController@createMobility');
Route::get('getMobility/{id}', 'App\Http\Controllers\MobilityController@readMobility');
Route::get('readAllMobility', 'App\Http\Controllers\MobilityController@readAllMobility');
Route::put('updateMobility/{id}', 'App\Http\Controllers\MobilityController@updateMobility');
Route::delete('deleteMobility/{id}', 'App\Http\Controllers\MobilityController@deleteMobility');
Route::post('addMobilityColumn', 'App\Http\Controllers\MobilityController@addMobilityColumn');
