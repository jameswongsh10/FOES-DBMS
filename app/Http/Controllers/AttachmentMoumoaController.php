<?php

namespace App\Http\Controllers;

use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use App\Models\AttachmentMoumoa;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class AttachmentMoumoaController extends Controller
{
    public function createAttachmentMoumoa(Request $request)
    {
        if (Auth::check()) {
            try {
                $validator = Validator::make($request->all(), [
                    'file' => 'required|mimes:pdf,zip|max:15360', //15mb application/pdf, application/zip
                ]);

                if ($validator->fails()) {
                    return response()->json([
                        'status' => false,
                        'message' => $validator->errors()
                    ], 401);
                }

                if ($file = $request->file('file')) {
                    $path = $file->store('public/files');
                    $name = $file->getClientOriginalName();
                    $ownPath = explode("/", $path);
                    $fileExtensionArr = explode(".", $ownPath[2]);
                    $contentType = "";

                    if (strcmp($fileExtensionArr[1], "pdf") == 0) {
                        $contentType = "application/pdf";
                    } elseif (strcmp($fileExtensionArr[1], "zip") == 0) {
                        $contentType = "application/zip";
                    }

                    //store your file into directory and db
                    $newAttachment = new AttachmentMoumoa();
                    $newAttachment->mou_moa_id = $request->mou_moa_id;
                    $newAttachment->description = $request->description;
                    $newAttachment->path = $path;
                    $newAttachment->file_name = $name;
                    $newAttachment->content_type = $contentType;

                    $newAttachment->save();

                    return response()->json([
                        'status' => true,
                        'message' => "Attachment created successfully!",
                        'attachment' => $newAttachment
                    ], 201);
                }
            } catch (QueryException $e) {
                return response()->json([
                    'status' => false,
                    'message' => $e->getMessage()
                ], 400);
            }
        }
        return response()->json([
            'status' => false,
            'message' => 'Unauthorized user'
        ], 401);
    }

    public function readAttachment($id)
    {
        if (Auth::check()) {
            try {
                $attachment = AttachmentMoumoa::find($id);

                if (is_null($attachment)) {
                    return response()->json([
                        'status' => false,
                        'message' => "Attachment not found",
                    ], 404);
                }
                return response()->json([
                    'status' => true,
                    'attachment' => $attachment
                ], 200);

            } catch (QueryException $e) {
                return response()->json([
                    'status' => false,
                    'message' => $e->errorInfo[2]
                ], 400);
            }
        }
        return response()->json([
            'status' => false,
            'message' => 'Unauthorized user'
        ], 401);
    }

    public function getAttachmentByMoumoaID($mou_moa_id)
    {
        if (Auth::check()) {
            try {
                $column = 'mou_moa_id'; // This is the name of the column you wish to search

                $attachment = AttachmentMoumoa::where($column, '=', $mou_moa_id)->with('mou_moa')->get();

                if (is_null($attachment)) {
                    return response()->json([
                        'status' => false,
                        'message' => "Attachment not found",
                    ], 404);
                }

                return response()->json([
                    'status' => true,
                    'attachment' => $attachment
                ], 200);

            } catch (QueryException $e) {
                return response()->json([
                    'status' => false,
                    'message' => $e->errorInfo[2]
                ], 400);
            }
        }
        return response()->json([
            'status' => false,
            'message' => 'Unauthorized user'
        ], 401);
    }

    public function updateAttachment(Request $request, $id)
    {
        if (Auth::check()) {
            try {
                $attachment = AttachmentMoumoa::find($id);

                if (is_null($attachment)) {
                    return response()->json([
                        'status' => false,
                        'message' => "Attachment not found",
                    ], 404);
                }

                $file = $request->file('file');
                if (!is_null($file)) {
                    $validator = Validator::make($request->all(), [
                        'file' => 'required|mimes:pdf,zip|max:15360',//15mb
                    ]);

                    if ($validator->fails()) {
                        return response()->json([
                            'status' => false,
                            'message' => $validator->errors()
                        ], 401);
                    }

                    $path = $file->store('public/files');
                    $name = $file->getClientOriginalName();
                    Storage::delete($attachment->path);
                    $attachment->update(['path' => $path]);
                    $attachment->update(['file_name' => $name]);

                    $ownPath = explode("/", $path);
                    $fileExtensionArr = explode(".", $ownPath[2]);
                    $contentType = "";
                    if (strcmp($fileExtensionArr[1], "pdf") == 0) {
                        $contentType = "application/pdf";
                    } elseif (strcmp($fileExtensionArr[1], "zip") == 0) {
                        $contentType = "application/zip";
                    }

                    $attachment->update(['content_type' => $contentType]);
                }

                $attachment->update($request->except(['file']));

                return response()->json([
                    "success" => true,
                    "message" => "Attachment updated successfully!",
                    "attachment" => $attachment
                ]);

            } catch (QueryException $e) {
                return response()->json(['status' => false,
                    'message' => $e->errorInfo[2]], 400);
            }
        }
        return response()->json([
            'status' => false,
            'message' => 'Unauthorized user'
        ], 401);
    }

    public function deleteAttachment($id)
    {
        if (Auth::check()) {
            try {
                $attachment = AttachmentMoumoa::find($id);

                if (is_null($attachment)) {
                    return response()->json([
                        'status' => false,
                        'message' => "Attachment not found",
                    ], 404);
                }

                $attachment->delete();
                Storage::delete($attachment->path);

                return response()->json([
                    'status' => true,
                    'message' => "Attachment deleted successfully!",
                    'attachment' => $attachment
                ], 200);

            } catch (QueryException $e) {
                return response()->json([
                    'status' => false,
                    'message' => $e->errorInfo[2]
                ], 400);
            }
        }
        return response()->json([
            'status' => false,
            'message' => 'Unauthorized user'
        ], 401);
    }

    public function downloadAttachment($id)
    {
//        if (Auth::check()) {
        try {
            $attachment = AttachmentMoumoa::find($id);
            if (is_null($attachment)) {
                return response()->json([
                    'status' => false,
                    'message' => "Attachment not found",
                ], 404);
            }
            $path = explode("/", $attachment['path']);
            $fullPath = 'app/public/files/' . $path[2];
            $filePath = storage_path($fullPath);
            $testRealPath = realpath($filePath);

            return response()->download($testRealPath, $attachment['file_name']);

        } catch (QueryException $e) {
            return response()->json([
                'status' => false,
                'message' => $e->errorInfo[2]
            ], 400);
        }
//        }
//        return response()->json([
//            'status' => false,
//            'message' => 'Unauthorized user'
//        ], 401);
    }
}
