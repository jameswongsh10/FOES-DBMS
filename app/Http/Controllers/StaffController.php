<?php

namespace App\Http\Controllers;

use App\Models\Staff;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class StaffController extends Controller
{
    public function createStaff()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        $newStaff = new Staff();

        foreach ($data as $key => $value) {
            $newStaff->$key = $value;
        }

        //Save into database
        $save = $newStaff->save();

        return response()->json([
            'status' => $save,
            'message' => "Staff created successfully!",
            'staff' => $newStaff
        ], 201);
    }

    public function addStaffColumn()
    {
        $columnName = json_decode(file_get_contents('php://input'), true);

        Schema::table('staffs', function (Blueprint $table) use ($columnName) {
            $table->string($columnName)->after('remark')->default('');
        });

        return response()->json([
            'status' => true,
            'message' => "Column added successfully!",
            'column' => $columnName
        ], 201);
    }

    public function readAllStaff()
    {
        $staff = Staff::all();

        return response()->json([
            'status' => true,
            'Staff' => $staff
        ]);
    }

    public function readStaff($id)
    {
        $staff = Staff::find($id);

        if (is_null($staff)) {
            return response()->json([
                'status' => false,
                'message' => "Staff not found",
            ], 404);
        }

        return response()->json([
            'status' => true,
            'staff' => $staff
        ], 200);
    }

    public function updateStaff($id)
    {
        $staff = Staff::find($id);

        if (is_null($staff)) {
            return response()->json([
                'status' => false,
                'message' => "Staff not found",
            ], 404);
        }

        $data = json_decode(file_get_contents('php://input'), true);

        $staff->update($data);

        return response()->json([
            'status' => true,
            'message' => "Staff updated successfully!",
            'staff' => $staff
        ], 200);
    }

    public function deleteStaff($id)
    {
        $staff = Staff::find($id);

        if (is_null($staff)) {
            return response()->json([
                'status' => false,
                'message' => "Staff not found",
            ], 404);
        }

        $staff->delete();

        return response()->json([
            'status' => true,
            'message' => "Staff deleted successfully!",
            'staff' => $staff
        ], 200);
    }
}
