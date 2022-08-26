<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use function MongoDB\BSON\toJSON;

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

        return response()->json([
            'status' => true,
            'message' => "Admin created successfully!",
            'admin' => $newAdmin
        ], 201);
    }

    public function addAdminColumn()
    {
        $columnName = json_decode(file_get_contents('php://input'), true);

        Schema::table('admins', function (Blueprint $table) use ($columnName) {
            $table->string($columnName)->default('');
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
            'admins' => $admin
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
            'status' => true,
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

        $admin->update($data);

        return response()->json([
            'status' => true,
            'message' => "Admin updated successfully!",
            'admin' => $admin
        ], 200);
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
