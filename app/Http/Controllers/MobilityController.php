<?php

namespace App\Http\Controllers;

use App\Models\Mobility;
use Illuminate\Database\QueryException;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;

class MobilityController extends Controller
{
    public function createMobility()
    {
        if (Auth::check()) {
            try {
                $data = json_decode(file_get_contents('php://input'), true);

                $newMobility = new Mobility();

                foreach ($data as $key => $value) {
                    $newMobility->$key = $value;
                }

                //Save into database
                $newMobility->save();

                return response()->json([
                    'status' => true,
                    'message' => "Mobility created successfully!",
                    'mobility' => $newMobility
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

    public function addMobilityColumn()
    {
        if (Auth::check()) {
            try {
                $columnName = json_decode(file_get_contents('php://input'), true);

                Schema::table('mobility', function (Blueprint $table) use ($columnName) {
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
        return response()->json([
            'status' => false,
            'message' => "Unauthorized user"
        ], 401);
    }

    public function readAllMobility()
    {
        if (Auth::check()) {
            try {
                $mobility = Mobility::all();

                return response()->json([
                    'status' => true,
                    'Mobility' => $mobility
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

    public function readMobility($id)
    {
        if (Auth::check()) {
            try {
                $mobility = Mobility::find($id);

                if (is_null($mobility)) {
                    return response()->json([
                        'status' => false,
                        'message' => "Mobility not found",
                    ], 404);
                }

                return response()->json([
                    'status' => true,
                    'mobility' => $mobility
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

    public function updateMobility($id)
    {
        if (Auth::check()) {
            try {
                $mobility = Mobility::find($id);

                if (is_null($mobility)) {
                    return response()->json([
                        'status' => false,
                        'message' => "Mobility not found",
                    ], 404);
                }

                $data = json_decode(file_get_contents('php://input'), true);

                $mobility->update($data);

                return response()->json([
                    'status' => true,
                    'message' => "Mobility updated successfully!",
                    'mobility' => $mobility
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

    public function deleteMobility($id)
    {
        if (Auth::check()) {
            try {
                $mobility = Mobility::find($id);

                if (is_null($mobility)) {
                    return response()->json([
                        'status' => false,
                        'message' => "Mobility not found",
                    ], 404);
                }

                $mobility->delete();

                return response()->json([
                    'status' => true,
                    'message' => "Mobility deleted successfully!",
                    'mobility' => $mobility
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

    public function getMobilityColumns()
    {
        if (Auth::check()) {
            try {
                $columns = Schema::getColumnListing('mobility');

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
