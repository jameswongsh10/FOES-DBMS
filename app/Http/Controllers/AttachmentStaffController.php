<?php

namespace App\Http\Controllers;

use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use App\Models\AttachmentStaff;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class AttachmentStaffController extends Controller
{
    public function createAttachmentStaff(Request $request)
    {
        try {

            $validator = Validator::make($request->all(), [
                'file' => 'required|mimes:pdf,csv,zip|max:15360', //15mb
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

                //store your file into directory and db
                $newAttachment = new AttachmentStaff();
                $newAttachment->staff_id = $request->staff_id;
                $newAttachment->type = $request->type;
                $newAttachment->description = $request->description;
                $newAttachment->path = $path;
                $newAttachment->file_name = $name;

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
                'message' => $e->errorInfo[2]
            ], 400);
        }

    }

    public function readAttachment($id)
    {
        try {
            $attachment = AttachmentStaff::find($id);

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

    public function getAttachmentByStaffID($staff_id)
    {
        try {
            $column = 'staff_id'; // This is the name of the column you wish to search

            $attachment = AttachmentStaff::where($column, '=', $staff_id)->with('staff')->get();

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

    public function updateAttachment(Request $request, $id)
    {
        try {
            $attachment = AttachmentStaff::find($id);

            if (is_null($attachment)) {
                return response()->json([
                    'status' => false,
                    'message' => "Attachment not found",
                ], 404);
            }

            $file = $request->file('file');
            if (!is_null($file)) {
                $validator = Validator::make($request->all(), [
                    'file' => 'required|mimes:pdf,csv,zip|max:15360',//15mb
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

    public function deleteAttachment($id)
    {
        try {
            $attachment = AttachmentStaff::find($id);

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
}
