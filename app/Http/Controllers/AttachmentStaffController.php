<?php

namespace App\Http\Controllers;


use App\Models\AttachmentStaff;

class AttachmentStaffController extends Controller
{
    public function createAttachmentStaff()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        $newAttachmentStaff = new AttachmentStaff();

        foreach ($data as $key => $value) {
            $newAttachmentStaff->$key = $value;
        }

        //Save into database
        $save = $newAttachmentStaff->save();

        if ($save) {
            return response()->json([
                'status' => $save,
                'message' => "Attachment Staff created successfully!",
                'AttachmentStaff' => $newAttachmentStaff
            ], 201);
        } else {
            return response()->json([
                'status' => $save,
                'message' => "Error in creating Attachment Staff.",
            ], 400);
        }
    }

    public function getAttachmentByStaffID($staff_id)
    {
        $column = 'staff_id'; // This is the name of the column you wish to search

        $attachment = AttachmentStaff::where($column , '=', $staff_id)->with('staff')->get();

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
    }

    public function updateAttachment($id)
    {
        $attachment = AttachmentStaff::find($id);

        if (is_null($attachment)) {
            return response()->json([
                'status' => false,
                'message' => "Attachment not found",
            ], 404);
        }

        $data = json_decode(file_get_contents('php://input'), true);

        $attachment->update($data);

        return response()->json([
            'status' => true,
            'message' => "Attachment updated successfully!",
            'awards' => $attachment
        ], 200);
    }

    public function deleteAttachment($id)
    {
        $attachment = AttachmentStaff::find($id);

        if (is_null($attachment)) {
            return response()->json([
                'status' => false,
                'message' => "Attachment not found",
            ], 404);
        }

        $attachment->delete();

        return response()->json([
            'status' => true,
            'message' => "Attachment deleted successfully!",
            'awards' => $attachment
        ], 200);
    }
}
