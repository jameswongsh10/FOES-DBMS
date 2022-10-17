<?php

namespace App\Http\Controllers;

use App\Models\KtpUsr;
use Illuminate\Database\QueryException;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;

class KTPUSR_Controller extends Controller
{
    public function createKTPUSR()
    {
        if (Auth::check()) {
            try {
                $data = json_decode(file_get_contents('php://input'), true);

                $newKTPUSR = new KtpUsr();

                foreach ($data as $key => $value) {
                    $newKTPUSR->$key = $value;
                }

                //Save into database
                $newKTPUSR->save();

                return response()->json([
                    'status' => true,
                    'message' => "KTPUSR created successfully!",
                    'ktpusr' => $newKTPUSR
                ], 201);

            } catch (QueryException $e) {
                return response()->json([
                    'status' => false,
                    'message' => $e->errorInfo[2]
                ], 400);
            }
        }
        return response()->json([
            'status' => false,
            'message' => "Unauthorized user"
        ], 401);
    }

    public function addKTPUSRColumn()
    {
        if (Auth::check()) {
            try {
                $columnName = json_decode(file_get_contents('php://input'), true);

                Schema::table('ktp_usr', function (Blueprint $table) use ($columnName) {
                    $table->string($columnName)->default('');
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
        return response()->json([
            'status' => false,
            'message' => "Unauthorized user"
        ], 401);
    }

    public function readAllKTPUSR()
    {
        if (Auth::check()) {
            try {
                $KTPUSR = KTPUSR::all();

                return response()->json([
                    'status' => true,
                    'ktpusr' => $KTPUSR
                ]);

            } catch (QueryException $e) {
                return response()->json([
                    'status' => false,
                    'message' => $e->errorInfo[2]
                ], 400);
            }
        }
        return response()->json([
            'status' => false,
            'message' => "Unauthorized user"
        ], 401);
    }

    public function readKTPUSR($id)
    {
        if (Auth::check()) {
            try {
                $KTPUSR = KTPUSR::find($id);

                if (is_null($KTPUSR)) {
                    return response()->json([
                        'status' => false,
                        'message' => "KTPUSR not found",
                    ], 404);
                }

                return response()->json([
                    'status' => true,
                    'krpusr' => $KTPUSR
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
            'message' => "Unauthorized user"
        ], 401);
    }

    public function updateKTPUSR($id)
    {
        if (Auth::check()) {
            try {
                $KTPUSR = KTPUSR::find($id);

                if (is_null($KTPUSR)) {
                    return response()->json([
                        'status' => false,
                        'message' => "KTPUSR not found",
                    ], 404);
                }

                $data = json_decode(file_get_contents('php://input'), true);

                $KTPUSR->update($data);

                return response()->json([
                    'status' => true,
                    'message' => "KTPUSR updated successfully!",
                    'ktpusr' => $KTPUSR
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
            'message' => "Unauthorized user"
        ], 401);
    }


    public function deleteKTPUSR($id)
    {
        if (Auth::check()) {
            try {
                $KTPUSR = KTPUSR::find($id);

                if (is_null($KTPUSR)) {
                    return response()->json([
                        'status' => false,
                        'message' => "KTPUSR not found",
                    ], 404);
                }

                $KTPUSR->delete();

                return response()->json([
                    'status' => true,
                    'message' => "KTPUSR deleted successfully!",
                    'ktpusr' => $KTPUSR
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
            'message' => "Unauthorized user"
        ], 401);
    }

    public function getKTPUSRColumns()
    {
        if (Auth::check()) {
            try {
                $columns = Schema::getColumnListing('ktp_usr');

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
        }
        return response()->json([
            'status' => false,
            'message' => "Unauthorized user"
        ], 401);
    }
}
