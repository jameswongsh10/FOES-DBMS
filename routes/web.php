<?php

use App\Http\Controllers\AttachmentStaffController;
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

//Attachment Staff CRUD
Route::post('createAttachment', [AttachmentStaffController::class, 'createAttachmentStaff']);
Route::get('getAttachment/{id}', [AttachmentStaffController::class, 'getAttachmentByStaffID']);
Route::put('updateAttachment/{id}', [AttachmentStaffController::class, 'updateAttachment']);
Route::delete('deleteAttachment/{id}', [AttachmentStaffController::class, 'deleteAttachment']);

