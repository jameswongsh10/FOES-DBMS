<?php

namespace App\Http\Controllers;

use App\Models\InactiveMOUMOA;
use Illuminate\Database\QueryException;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;

class Inactive_MOUMOA_Controller extends Controller
{
    public function createInactiveMOUMOA()
    {
        if (Auth::check()) {
            try {
                $data = json_decode(file_get_contents('php://input'), true);

                $newInactiveMOUMOA = new InactiveMOUMOA();

                foreach ($data as $key => $value) {
                    $newInactiveMOUMOA->$key = $value;
                }

                //Save into database
                $newInactiveMOUMOA->save();

                return response()->json([
                    'status' => true,
                    'message' => "InactiveMOUMOA created successfully!",
                    'InactiveMOUMOA' => $newInactiveMOUMOA
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

    public function addInactiveMOUMOAColumn()
    {
        if (Auth::check()) {
            try {
                $columnName = json_decode(file_get_contents('php://input'), true);

                Schema::table('inactive_mou_moa', function (Blueprint $table) use ($columnName) {
                    $table->string($columnName)->after('mutual_extension')->default('');
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

    public function readAllInactiveMOUMOA()
    {
        if (Auth::check()) {
            try {
                $InactiveMOUMOA = InactiveMOUMOA::all();

                return response()->json([
                    'status' => true,
                    'InactiveMOUMOA' => $InactiveMOUMOA
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

    public function readInactiveMOUMOA($id)
    {
        if (Auth::check()) {
            try {
                $InactiveMOUMOA = InactiveMOUMOA::find($id);

                if (is_null($InactiveMOUMOA)) {
                    return response()->json([
                        'status' => false,
                        'message' => "InactiveMOUMOA not found",
                    ], 404);
                }

                return response()->json([
                    'status' => true,
                    'krpusr' => $InactiveMOUMOA
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

    public function updateInactiveMOUMOA($id)
    {
        if (Auth::check()) {
            try {
                $InactiveMOUMOA = InactiveMOUMOA::find($id);

                if (is_null($InactiveMOUMOA)) {
                    return response()->json([
                        'status' => false,
                        'message' => "InactiveMOUMOA not found",
                    ], 404);
                }

                $data = json_decode(file_get_contents('php://input'), true);

                $InactiveMOUMOA->update($data);

                return response()->json([
                    'status' => true,
                    'message' => "InactiveMOUMOA updated successfully!",
                    'InactiveMOUMOA' => $InactiveMOUMOA
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

    public function deleteInactiveMOUMOA($id)
    {
        if (Auth::check()) {
            try {
                $InactiveMOUMOA = InactiveMOUMOA::find($id);

                if (is_null($InactiveMOUMOA)) {
                    return response()->json([
                        'status' => false,
                        'message' => "InactiveMOUMOA not found",
                    ], 404);
                }

                $InactiveMOUMOA->delete();

                return response()->json([
                    'status' => true,
                    'message' => "InactiveMOUMOA deleted successfully!",
                    'InactiveMOUMOA' => $InactiveMOUMOA
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

    public function getInactiveMOUMOAColumns()
    {
        if (Auth::check()) {
            try {
                $columns = Schema::getColumnListing('inactive_mou_moa');

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
