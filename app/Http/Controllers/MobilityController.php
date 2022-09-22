<?php

namespace App\Http\Controllers;

use App\Models\Mobility;
use Illuminate\Database\QueryException;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MobilityController extends Controller
{
    public function createMobility()
    {
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

    public function addMobilityColumn()
    {
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

    public function readAllMobility()
    {
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

    public function readMobility($id)
    {
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

    public function updateMobility($id)
    {
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

    public function deleteMobility($id)
    {
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

    public function getMobilityColumns()
    {
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
}
