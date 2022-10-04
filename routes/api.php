<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AssetController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\ResearchAwardsController;
use App\Http\Controllers\MobilityController;
use App\Http\Controllers\KTPUSR_Controller;
use App\Http\Controllers\MOUMOA_Controller;
use App\Http\Controllers\Inactive_MOUMOA_Controller;
use App\Http\Controllers\KeyContactPersonController;
use App\Http\Controllers\DataController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
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

<<<<<<<<< Temporary merge branch 1
//CSV Import
Route::post('csvImport', 'App\Http\Controllers\DataController@csvImport');
//Route::get('database_backup', function () {
//    Artisan::call('backup:run');
//
//    return 'Database backup success.';
//});
Route::get('database_backup', 'App\Http\Controllers\DataController@database_backup');

//Admin CRUD
Route::post('createAdmin', 'App\Http\Controllers\AdminController@createAdmin');
Route::get('getAdmin/{id}', 'App\Http\Controllers\AdminController@readAdmin');
Route::get('readAllAdmin', 'App\Http\Controllers\AdminController@readAllAdmin');
Route::put('updateAdmin/{id}', 'App\Http\Controllers\AdminController@updateAdmin');
Route::delete('deleteAdmin/{id}', 'App\Http\Controllers\AdminController@deleteAdmin');
Route::post('addAdminColumn', 'App\Http\Controllers\AdminController@addAdminColumn');
Route::post('importAdminCSV', 'App\Http\Controllers\AdminController@importAdminCSV');


//ResearchAwards CRUD
Route::post('createAwards', 'App\Http\Controllers\ResearchAwardsController@createAwards');
Route::get('getAwards/{id}', 'App\Http\Controllers\ResearchAwardsController@readAwards');
Route::get('getAwards/staff/{id}', 'App\Http\Controllers\ResearchAwardsController@getAwardsbyStaffID');
Route::get('readAllAwards', 'App\Http\Controllers\ResearchAwardsController@readAllAwards');
Route::put('updateAwards/{id}', 'App\Http\Controllers\ResearchAwardsController@updateAwards');
Route::delete('deleteAwards/{id}', 'App\Http\Controllers\ResearchAwardsController@deleteAwards');
Route::post('addAwardsColumn', 'App\Http\Controllers\ResearchAwardsController@addAwardsColumn');

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

//Staff CRUD
Route::post('createStaff', 'App\Http\Controllers\StaffController@createStaff');
Route::get('getStaff/{id}', 'App\Http\Controllers\StaffController@readStaff');
Route::get('readAllStaff', 'App\Http\Controllers\StaffController@readAllStaff');
Route::put('updateStaff/{id}', 'App\Http\Controllers\StaffController@updateStaff');
Route::delete('deleteStaff/{id}', 'App\Http\Controllers\StaffController@deleteStaff');
Route::post('addStaffColumn', 'App\Http\Controllers\StaffController@addStaffColumn');


//MOUMOA CRUD
Route::post('createMOUMOA', 'App\Http\Controllers\MOUMOA_Controller@createMOUMOA');
Route::get('getMOUMOA/{id}', 'App\Http\Controllers\MOUMOA_Controller@readMOUMOA');
Route::get('readAllMOUMOA', 'App\Http\Controllers\MOUMOA_Controller@readAllMOUMOA');
Route::put('updateMOUMOA/{id}', 'App\Http\Controllers\MOUMOA_Controller@updateMOUMOA');
Route::delete('deleteMOUMOA/{id}', 'App\Http\Controllers\MOUMOA_Controller@deleteMOUMOA');
Route::post('addMOUMOAColumn', 'App\Http\Controllers\MOUMOA_Controller@addMOUMOAColumn');

//Mobility CRUD
Route::post('createMobility', 'App\Http\Controllers\MobilityController@createMobility');
Route::get('getMobility/{id}', 'App\Http\Controllers\MobilityController@readMobility');
Route::get('readAllMobility', 'App\Http\Controllers\MobilityController@readAllMobility');
Route::put('updateMobility/{id}', 'App\Http\Controllers\MobilityController@updateMobility');
Route::delete('deleteMobility/{id}', 'App\Http\Controllers\MobilityController@deleteMobility');
Route::post('addMobilityColumn', 'App\Http\Controllers\MobilityController@addMobilityColumn');
=========
//Admin CRUD
Route::post('createAdmin', [AdminController::class, 'createAdmin']);
Route::get('getAdmin/{id}', [AdminController::class, 'readAdmin']);
Route::get('readAllAdmin', [AdminController::class, 'readAllAdmin']);
Route::put('updateAdmin/{id}', [AdminController::class, 'updateAdmin']);
Route::delete('deleteAdmin/{id}', [AdminController::class, 'deleteAdmin']);
Route::post('addAdminColumn', [AdminController::class, 'addAdminColumn']);
Route::get('getAdminColumns', [AdminController::class, 'getAdminColumns']);

//Asset CRUD
Route::post('createAsset', [AssetController::class, 'createAsset']);
Route::get('getAsset/{id}', [AssetController::class, 'readAsset']);
Route::get('readAllAsset', [AssetController::class, 'readAllAsset']);
Route::put('updateAsset/{id}', [AssetController::class, 'updateAsset']);
Route::delete('deleteAsset/{id}', [AssetController::class, 'deleteAsset']);
Route::post('addAssetColumn', [AssetController::class, 'addAssetColumn']);
Route::get('getAssetColumns', [AssetController::class, 'getAssetColumns']);

//Staff CRUD
Route::post('createStaff', [StaffController::class, 'createStaff']);
Route::get('getStaff/{id}', [StaffController::class, 'readStaff']);
Route::get('readAllStaff', [StaffController::class, 'readAllStaff']);
Route::get('getAllStaffNames', [StaffController::class, 'getAllStaffName']);
Route::put('updateStaff/{id}', [StaffController::class, 'updateStaff']);
Route::delete('deleteStaff/{id}', [StaffController::class, 'deleteStaff']);
Route::post('addStaffColumn', [StaffController::class, 'addStaffColumn']);
Route::get('getStaffColumns', [StaffController::class,'getStaffColumns']);

//ResearchAwards CRUD
Route::post('createAwards', [ResearchAwardsController::class, 'createAwards']);
Route::get('getAwards/{id}', [ResearchAwardsController::class, 'readAwards']);
Route::get('getAwards/staff/{id}', [ResearchAwardsController::class, 'getAwardsbyStaffID']);
Route::get('readAllAwards', [ResearchAwardsController::class, 'readAllAwards']);
Route::put('updateAwards/{id}', [ResearchAwardsController::class, 'updateAwards']);
Route::delete('deleteAwards/{id}', [ResearchAwardsController::class, 'deleteAwards']);
Route::post('addAwardsColumn', [ResearchAwardsController::class, 'addAwardsColumn']);
Route::get('getAwardsColumns', [ResearchAwardsController::class, 'getAwardsColumns']);

//Mobility CRUD
Route::post('createMobility',  [MobilityController::class, 'createMobility']);
Route::get('getMobility/{id}',  [MobilityController::class, 'readMobility']);
Route::get('readAllMobility',  [MobilityController::class, 'readAllMobility']);
Route::put('updateMobility/{id}',  [MobilityController::class, 'updateMobility']);
Route::delete('deleteMobility/{id}',  [MobilityController::class, 'deleteMobility']);
Route::post('addMobilityColumn',  [MobilityController::class, 'addMobilityColumn']);
Route::get('getMobilityColumns',  [MobilityController::class, 'getMobilityColumns']);

//KTPUSR CRUD
Route::post('createKTPUSR',  [KTPUSR_Controller::class, 'createKTPUSR']);
Route::get('getKTPUSR/{id}', [KTPUSR_Controller::class, 'readKTPUSR']);
Route::get('readAllKTPUSR', [KTPUSR_Controller::class, 'readAllKTPUSR']);
Route::put('updateKTPUSR/{id}', [KTPUSR_Controller::class, 'updateKTPUSR']);
Route::delete('deleteKTPUSR/{id}', [KTPUSR_Controller::class, 'deleteKTPUSR']);
Route::post('addKTPUSRColumn', [KTPUSR_Controller::class, 'addKTPUSRColumn']);
Route::get('getKTPUSRColumns', [KTPUSR_Controller::class, 'getKTPUSRColumns']);

//MOUMOA CRUD
Route::post('createMOUMOA', [MOUMOA_Controller::class, 'createMOUMOA']);
Route::get('getMOUMOA/{id}', [MOUMOA_Controller::class, 'readMOUMOA']);
Route::get('readAllMOUMOA', [MOUMOA_Controller::class, 'readAllMOUMOA']);
Route::put('updateMOUMOA/{id}', [MOUMOA_Controller::class, 'updateMOUMOA']);
Route::delete('deleteMOUMOA/{id}', [MOUMOA_Controller::class, 'deleteMOUMOA']);
Route::post('addMOUMOAColumn', [MOUMOA_Controller::class, 'addMOUMOAColumn']);
Route::get('getMOUMOAColumns', [MOUMOA_Controller::class, 'getMOUMOAColumns']);

//InactiveMOUMOA CRUD
Route::post('createInactiveMOUMOA', [Inactive_MOUMOA_Controller::class, 'createInactiveMOUMOA']);
Route::get('getInactiveMOUMOA/{id}', [Inactive_MOUMOA_Controller::class, 'readInactiveMOUMOA']);
Route::get('readAllInactiveMOUMOA', [Inactive_MOUMOA_Controller::class, 'readAllInactiveMOUMOA']);
Route::put('updateInactiveMOUMOA/{id}', [Inactive_MOUMOA_Controller::class, 'updateInactiveMOUMOA']);
Route::delete('deleteInactiveMOUMOA/{id}', [Inactive_MOUMOA_Controller::class, 'deleteInactiveMOUMOA']);
Route::post('addInactiveMOUMOAColumn', [Inactive_MOUMOA_Controller::class, 'addInactiveMOUMOAColumn']);
Route::get('getInactiveMOUMOAColumns', [Inactive_MOUMOA_Controller::class, 'getInactiveMOUMOAColumns']);

//Key Contact Person CRUD
Route::post('createKeyContactPerson', [KeyContactPersonController::class, 'createKeyContactPerson']);
Route::get('getKeyContactPerson/{id}', [KeyContactPersonController::class, 'readKeyContactPerson']);
Route::get('getKeyContactPerson/moumoa/{id}', [KeyContactPersonController::class, 'getContactPersonbyMOUMOA_ID']);
Route::get('readAllKeyContactPerson', [KeyContactPersonController::class, 'readAllKeyContactPerson']);
Route::put('updateKeyContactPerson/{id}', [KeyContactPersonController::class, 'updateKeyContactPerson']);
Route::delete('deleteKeyContactPerson/{id}', [KeyContactPersonController::class, 'deleteKeyContactPerson']);
Route::get('getKeyContactPersonColumns', [KeyContactPersonController::class, 'getKeyContactPersonColumns']);

//CSV Import
Route::post('csvImport', [DataController::class, 'csvImport']);
Route::get('database_backup',  [DataController::class, 'database_backup']);
Route::get('database_restore',  [DataController::class, 'database_restore']);

//Route::get('database_backup', function() {
//    $exitCode = Artisan::call('backup:run --only-db');
//    dd($exitCode);
//});
