<?php

namespace App\Http\Controllers;

use App\Models\MouMoa;
use Illuminate\Database\QueryException;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;

class MOUMOA_Controller extends Controller
{
    public function createMOUMOA()
    {
        if (Auth::check()) {
            try {
                $data = json_decode(file_get_contents('php://input'), true);

                $newMOUMOA = new MouMoa();

                foreach ($data as $key => $value) {
                    $newMOUMOA->$key = $value;
                }

                //Save into database
                $newMOUMOA->save();

                return response()->json([
                    'status' => true,
                    'message' => "MOUMOA created successfully!",
                    'MOUMOA' => $newMOUMOA
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

    public function addMOUMOAColumn()
    {
        if (Auth::check()) {
            try {
                $columnName = json_decode(file_get_contents('php://input'), true);

                Schema::table('mou_moa', function (Blueprint $table) use ($columnName) {
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

    public function readAllMOUMOA()
    {
        if (Auth::check()) {
            try {
                $MOUMOA = MOUMOA::all();

                return response()->json([
                    'status' => true,
                    'MOUMOA' => $MOUMOA
                ]);

            } catch (QueryException $e) {
                return response()->json(['status' => false,
                    'message' => $e->errorInfo[2]], 400);
            }
        }
        return response()->json([
            'status' => false,
            'message' => "Unauthorized user"
        ], 401);
    }

    public function readMOUMOA($id)
    {
        if (Auth::check()) {
            try {
                $MOUMOA = MOUMOA::find($id);

                if (is_null($MOUMOA)) {
                    return response()->json([
                        'status' => false,
                        'message' => "MOUMOA not found",
                    ], 404);
                }

                return response()->json([
                    'status' => true,
                    'MOUMOA' => $MOUMOA
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

    public function updateMOUMOA($id)
    {
        if (Auth::check()) {
            try {
                $MOUMOA = MOUMOA::find($id);

                if (is_null($MOUMOA)) {
                    return response()->json([
                        'status' => false,
                        'message' => "MOUMOA not found",
                    ], 404);
                }

                $data = json_decode(file_get_contents('php://input'), true);

                $MOUMOA->update($data);

                return response()->json([
                    'status' => true,
                    'message' => "MOUMOA updated successfully!",
                    'MOUMOA' => $MOUMOA
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

    public function deleteMOUMOA($id)
    {
        if (Auth::check()) {
            try {
                $MOUMOA = MOUMOA::find($id);

                if (is_null($MOUMOA)) {
                    return response()->json([
                        'status' => false,
                        'message' => "MOUMOA not found",
                    ], 404);
                }

                $MOUMOA->delete();

                return response()->json([
                    'status' => true,
                    'message' => "MOUMOA deleted successfully!",
                    'MOUMOA' => $MOUMOA
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

    public function getMOUMOAColumns()
    {
        if (Auth::check()) {
            try {
                $columns = Schema::getColumnListing('mou_moa');

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
