<?php

use App\Http\Controllers\AttachmentStaffController;
use App\Http\Controllers\KeyContactPersonController;
use Illuminate\Http\Request;
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

//Attachment Staff CRUD
Route::post('createAttachment', [AttachmentStaffController::class, 'createAttachmentStaff']);
Route::get('getAttachment/{id}', [AttachmentStaffController::class, 'getAttachmentByStaffID']);
Route::put('updateAttachment/{id}', [AttachmentStaffController::class, 'updateAttachment']);
Route::delete('deleteAttachment/{id}', [AttachmentStaffController::class, 'deleteAttachment']);
