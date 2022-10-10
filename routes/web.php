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
use App\Http\Controllers\AttachmentStaffController;
use App\Http\Controllers\DataController;
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
Route::get('getStaffColumns', [StaffController::class, 'getStaffColumns']);

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
Route::post('createMobility', [MobilityController::class, 'createMobility']);
Route::get('getMobility/{id}', [MobilityController::class, 'readMobility']);
Route::get('readAllMobility', [MobilityController::class, 'readAllMobility']);
Route::put('updateMobility/{id}', [MobilityController::class, 'updateMobility']);
Route::delete('deleteMobility/{id}', [MobilityController::class, 'deleteMobility']);
Route::post('addMobilityColumn', [MobilityController::class, 'addMobilityColumn']);
Route::get('getMobilityColumns', [MobilityController::class, 'getMobilityColumns']);

//KTPUSR CRUD
Route::post('createKTPUSR', [KTPUSR_Controller::class, 'createKTPUSR']);
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

//Attachment Staff CRUD
Route::post('createAttachment', [AttachmentStaffController::class, 'createAttachmentStaff']);
Route::get('getAttachment/{id}', [AttachmentStaffController::class, 'readAttachment']);
Route::get('getAttachment/staff/{id}', [AttachmentStaffController::class, 'getAttachmentByStaffID']);
Route::put('updateAttachment/{id}', [AttachmentStaffController::class, 'updateAttachment']);
Route::delete('deleteAttachment/{id}', [AttachmentStaffController::class, 'deleteAttachment']);

//Data Controller
Route::post('csvImport', [DataController::class, 'csvImport']);
Route::get('database_backup', [DataController::class, 'database_backup']);
Route::get('database_restore', [DataController::class, 'database_restore']);
