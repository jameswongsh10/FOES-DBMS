<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Database\QueryException;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use Symfony\Component\Routing\Exception\RouteNotFoundException;

class AdminController extends Controller
{
    public function createAdmin()
    {
        //if (Auth::check()) {
        try {
            $data = json_decode(file_get_contents('php://input'), true);

            $newAdmin = new Admin();

            foreach ($data as $key => $value) {
                $newAdmin->$key = $value;
            }

            $unEncryptedPassword = $newAdmin['password'];

            $newAdmin["password"] = Hash::make($unEncryptedPassword);

            //Save into database
            $newAdmin->save();

            return response()->json([
                'status' => true,
                'message' => "Admin created successfully!",
                'admin' => $newAdmin
            ], 201);

        } catch (QueryException $e) {
            return response()->json([
                'status' => false,
                'message' => $e->errorInfo[2]
            ], 400);
        }
//        }
//
//        return response()->json([
//            'status' => false,
//            'message' => "Unauthorized user"
//        ], 401);
    }

    public function addAdminColumn()
    {
        //    if (Auth::check()) {
        try {
            $columnName = json_decode(file_get_contents('php://input'), true);

            Schema::table('admins', function (Blueprint $table) use ($columnName) {
                $table->string($columnName)->after('password')->default('');
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
//        }
//        return response()->json([
//            'status' => false,
//            'message' => "Unauthorized user"
//        ], 401);
    }

    public function readAllAdmin()
    {
        //if (Auth::check()) {
        try {
            $admin = Admin::all();

            return response()->json([
                'status' => true,
                'Admin' => $admin
            ]);
        } catch (QueryException $e) {
            return response()->json([
                'status' => false,
                'message' => $e->errorInfo[2]
            ], 400);
        }
//        }
//        return response()->json([
//            'status' => false,
//            'message' => "Unauthorized user"
//        ], 401);
    }

    public function readAdmin($id)
    {
        // if (Auth::check()) {
        try {
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

        } catch (QueryException $e) {
            return response()->json([
                'status' => false,
                'message' => $e->errorInfo[2]
            ], 400);
        }
//        }
//        return response()->json([
//            'status' => false,
//            'message' => "Unauthorized user"
//        ], 401);
    }

    public function updateAdmin($id)
    {
        //   if (Auth::check()) {
        try {
            $admin = Admin::find($id);

            if (is_null($admin)) {
                return response()->json([
                    'status' => false,
                    'message' => "Admin not found",
                ], 404);
            }

            $data = json_decode(file_get_contents('php://input'), true);

            $encryptedPassword = Hash::make($data['password']);
            $data['password'] = $encryptedPassword;
            $admin->update($data);

            return response()->json([
                'status' => true,
                'message' => "Admin updated successfully!",
                'admin' => $admin
            ], 200);

        } catch (QueryException $e) {
            return response()->json([
                'status' => false,
                'message' => $e->errorInfo[2]
            ], 400);
        }
//        }
//        return response()->json([
//            'status' => false,
//            'message' => "Unauthorized user"
//        ], 401);
    }

    public function deleteAdmin($id)
    {
        // if (Auth::check()) {
        try {
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

        } catch (QueryException $e) {
            return response()->json([
                'status' => false,
                'message' => $e->errorInfo[2]
            ], 400);
        }
//        }
//        return response()->json([
//            'status' => false,
//            'message' => "Unauthorized user"
//        ], 401);
    }

    public function getAdminColumns()
    {
        //  if (Auth::check()) {
        try {
            $columns = Schema::getColumnListing('admins');

            return response()->json([
                'status' => true,
                'column' => $columns
            ], 200);

        } catch (QueryException $e) {
            return response()->json([
                'status' => false,
                'message' => $e->errorInfo[2]
            ], 400);
        }
//        }
//        return response()->json([
//            'status' => false,
//            'message' => "Unauthorized user"
//        ], 401);
    }
}
