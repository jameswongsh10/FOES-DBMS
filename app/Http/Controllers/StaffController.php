<?php

namespace App\Http\Controllers;

use App\Models\Staff;
use Illuminate\Database\QueryException;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class StaffController extends Controller
{
    public function createStaff()
    {
        try {
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

        } catch (QueryException $e) {
            return response()->json([
                'status' => false,
                'message' => $e->errorInfo[2]
            ], 400);
        }
    }

    public function addStaffColumn()
    {
        try {
            $columnName = json_decode(file_get_contents('php://input'), true);

            Schema::table('staffs', function (Blueprint $table) use ($columnName) {
                $table->string($columnName)->after('remark')->default('');
            });

            return response()->json([
                'status' => true,
                'message' => "Column added successfully!",
                'column' => $columnName
            ], 201);

        } catch (QueryException $e) {
            return response()->json([
                'status' => false,
                'message' => $e->errorInfo[2]
            ], 400);
        }
    }

    public function readAllStaff()
    {
        try {
            $staff = Staff::all();

            return response()->json([
                'status' => true,
                'Staff' => $staff
            ]);
        } catch (QueryException $e) {
            return response()->json([
                'status' => false,
                'message' => $e->errorInfo[2]
            ], 400);
        }
    }

    public function readStaff($id)
    {
        try {
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

        } catch (QueryException $e) {
            return response()->json([
                'status' => false,
                'message' => $e->errorInfo[2]
            ], 400);
        }
    }

    public function getAllStaffName()
    {
        try {
            $staff = Staff::all();

            $data = json_decode($staff);

            $length = count($data);

            $data2 = [];
            for ($i = 0; $i < $length; $i++) {
                $name = $data[$i]->title . " " . $data[$i]->first_name . " " . $data[$i]->last_name;

                $data2[] = [
                    'staff_id' => $data[$i]->id,
                    'staff_name' => $name
                ];
            }

            return response()->json([
                'status' => true,
                'staffs' => $data2
            ], 200);

        } catch (QueryException $e) {
            return response()->json([
                'status' => false,
                'message' => $e->errorInfo[2]
            ], 400);
        }
    }

    public function updateStaff($id)
    {
        try {
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

        } catch (QueryException $e) {
            return response()->json([
                'status' => false,
                'message' => $e->errorInfo[2]
            ], 400);
        }
    }

    public function deleteStaff($id)
    {
        try {
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

        } catch (QueryException $e) {
            return response()->json([
                'status' => false,
                'message' => $e->errorInfo[2]
            ], 400);
        }
    }
}
