<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AdminController extends Controller
{
    public function createAdmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        $newAdmin = new Admin();

        foreach ($data as $key => $value) {
            $newAdmin->$key = $value;
        }

        //Save into database
        $save = $newAdmin->save();

        if ($save) {
            return response()->json([
                'status' => $save,
                'message' => "Admin created successfully!",
                'admin' => $newAdmin
            ], 201);
        } else {
            return response()->json([
                'status' => $save,
                'message' => "Error in creating admin.",
            ], 400);
        }
    }

    public function addAdminColumn()
    {
        $columnName = json_decode(file_get_contents('php://input'), true);

        Schema::table('admins', function (Blueprint $table) use ($columnName) {
            $table->string($columnName)->after('password')->default('');
        });

        return response()->json([
            'status' => true,
            'message' => "Column added successfully!",
            'column' => $columnName
        ], 201);
    }

    public function readAllAdmin()
    {
        $admin = Admin::all();

        return response()->json([
            'status' => true,
            'Admin' => $admin
        ]);
    }

    public function readAdmin($id)
    {
        $admin = Admin::find($id);

        if (is_null($admin)) {
            return response()->json([
                'status' => false,
                'message' => "Admin not found",
            ], 404);
        }

        return response()->json([
            //   'status' => true,
            'admin' => $admin
        ], 200);
    }

    public function updateAdmin($id)
    {
        $admin = Admin::find($id);

        if (is_null($admin)) {
            return response()->json([
                'status' => false,
                'message' => "Admin not found",
            ], 404);
        }

        $data = json_decode(file_get_contents('php://input'), true);

        $save = $admin->update($data);

        if ($save) {
            return response()->json([
                'status' => $save,
                'message' => "Admin updated successfully!",
                'admin' => $admin
            ], 200);
        } else {
            return response()->json([
                'status' => $save,
                'message' => "Error in updating admin.",
            ], 400);
        }
    }

    public function deleteAdmin($id)
    {
        $admin = Admin::find($id);

        if (is_null($admin)) {
            return response()->json([
                'status' => false,
                'message' => "Admin not found",
            ], 404);
        }

        $admin->delete();

        return response()->json([
            'status' => true,
            'message' => "Admin deleted successfully!",
            'admin' => $admin
        ], 200);
    }
}
