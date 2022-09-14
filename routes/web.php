<?php

use App\Http\Controllers\KeyContactPersonController;
use Illuminate\Support\Facades\Route;

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

//Admin CRUD
Route::post('createAdmin', 'App\Http\Controllers\AdminController@createAdmin');
Route::get('getAdmin/{id}', 'App\Http\Controllers\AdminController@readAdmin');
Route::get('readAllAdmin', 'App\Http\Controllers\AdminController@readAllAdmin');
Route::put('updateAdmin/{id}', 'App\Http\Controllers\AdminController@updateAdmin');
Route::delete('deleteAdmin/{id}', 'App\Http\Controllers\AdminController@deleteAdmin');
Route::post('addAdminColumn', 'App\Http\Controllers\AdminController@addAdminColumn');

//Asset CRUD
Route::post('createAsset', 'App\Http\Controllers\AssetController@createAsset');
Route::get('getAsset/{id}', 'App\Http\Controllers\AssetController@readAsset');
Route::get('readAllAsset', 'App\Http\Controllers\AssetController@readAllAsset');
Route::put('updateAsset/{id}', 'App\Http\Controllers\AssetController@updateAsset');
Route::delete('deleteAsset/{id}', 'App\Http\Controllers\AssetController@deleteAsset');
Route::post('addAssetColumn', 'App\Http\Controllers\AssetController@addAssetColumn');

//Staff CRUD
Route::post('createStaff', 'App\Http\Controllers\StaffController@createStaff');
Route::get('getStaff/{id}', 'App\Http\Controllers\StaffController@readStaff');
Route::get('readAllStaff', 'App\Http\Controllers\StaffController@readAllStaff');
Route::get('getAllStaffNames', 'App\Http\Controllers\StaffController@getAllStaffName');
Route::put('updateStaff/{id}', 'App\Http\Controllers\StaffController@updateStaff');
Route::delete('deleteStaff/{id}', 'App\Http\Controllers\StaffController@deleteStaff');
Route::post('addStaffColumn', 'App\Http\Controllers\StaffController@addStaffColumn');

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

//KTPUSR CRUD
Route::post('createKTPUSR', 'App\Http\Controllers\KTPUSR_Controller@createKTPUSR');
Route::get('getKTPUSR/{id}', 'App\Http\Controllers\KTPUSR_Controller@readKTPUSR');
Route::get('readAllKTPUSR', 'App\Http\Controllers\KTPUSR_Controller@readAllKTPUSR');
Route::put('updateKTPUSR/{id}', 'App\Http\Controllers\KTPUSR_Controller@updateKTPUSR');
Route::delete('deleteKTPUSR/{id}', 'App\Http\Controllers\KTPUSR_Controller@deleteKTPUSR');
Route::post('addKTPUSRColumn', 'App\Http\Controllers\KTPUSR_Controller@addKTPUSRColumn');

//MOUMOA CRUD
Route::post('createMOUMOA', 'App\Http\Controllers\MOUMOA_Controller@createMOUMOA');
Route::get('getMOUMOA/{id}', 'App\Http\Controllers\MOUMOA_Controller@readMOUMOA');
Route::get('readAllMOUMOA', 'App\Http\Controllers\MOUMOA_Controller@readAllMOUMOA');
Route::put('updateMOUMOA/{id}', 'App\Http\Controllers\MOUMOA_Controller@updateMOUMOA');
Route::delete('deleteMOUMOA/{id}', 'App\Http\Controllers\MOUMOA_Controller@deleteMOUMOA');
Route::post('addMOUMOAColumn', 'App\Http\Controllers\MOUMOA_Controller@addMOUMOAColumn');

//InactiveMOUMOA CRUD
Route::post('createInactiveMOUMOA', 'App\Http\Controllers\Inactive_MOUMOA_Controller@createInactiveMOUMOA');
Route::get('getInactiveMOUMOA/{id}', 'App\Http\Controllers\Inactive_MOUMOA_Controller@readInactiveMOUMOA');
Route::get('readAllInactiveMOUMOA', 'App\Http\Controllers\Inactive_MOUMOA_Controller@readAllInactiveMOUMOA');
Route::put('updateInactiveMOUMOA/{id}', 'App\Http\Controllers\Inactive_MOUMOA_Controller@updateInactiveMOUMOA');
Route::delete('deleteInactiveMOUMOA/{id}', 'App\Http\Controllers\Inactive_MOUMOA_Controller@deleteInactiveMOUMOA');
Route::post('addInactiveMOUMOAColumn', 'App\Http\Controllers\Inactive_MOUMOA_Controller@addInactiveMOUMOAColumn');

//Key Contact Person CRUD
Route::post('createKeyContactPerson', [KeyContactPersonController::class, 'createKeyContactPerson']);
Route::get('getKeyContactPerson/{id}', [KeyContactPersonController::class, 'readKeyContactPerson']);
Route::get('readAllKeyContactPerson', [KeyContactPersonController::class, 'readAllKeyContactPerson']);
Route::put('updateKeyContactPerson/{id}', [KeyContactPersonController::class, 'updateKeyContactPerson']);
Route::delete('deleteKeyContactPerson/{id}', [KeyContactPersonController::class, 'deleteKeyContactPerson']);
