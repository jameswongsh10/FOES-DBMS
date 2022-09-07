<?php

namespace App\Http\Controllers;

use App\Models\Mobility;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MobilityController extends Controller
{
    public function createMobility()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        $newMobility = new Mobility();

        foreach ($data as $key => $value) {
            $newMobility->$key = $value;
        }

        //Save into database
        $save = $newMobility->save();

        if ($save) {
            return response()->json([
                'status' => $save,
                'message' => "Mobility created successfully!",
                'mobility' => $newMobility
            ], 201);
        } else {
            return response()->json([
                'status' => $save,
                'message' => "Error in creating mobility.",
            ], 400);
        }
    }

    public function addMobilityColumn()
    {
        $columnName = json_decode(file_get_contents('php://input'), true);

        Schema::table('mobility', function (Blueprint $table) use ($columnName) {
            $table->string($columnName)->after('remark')->default('');
        });

        return response()->json([
            'status' => true,
            'message' => "Column added successfully!",
            'column' => $columnName
        ], 201);
    }

    public function readAllMobility()
    {
        $mobility = Mobility::all();

        return response()->json([
            'status' => true,
            'Mobility' => $mobility
        ]);
    }

    public function readMobility($id)
    {
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
    }

    public function updateMobility($id)
    {
        $mobility = Mobility::find($id);

        if (is_null($mobility)) {
            return response()->json([
                'status' => false,
                'message' => "Mobility not found",
            ], 404);
        }

        $data = json_decode(file_get_contents('php://input'), true);

        $save = $mobility->update($data);

        if ($save) {
            return response()->json([
                'status' => $save,
                'message' => "Mobility updated successfully!",
                'mobility' => $mobility
            ], 200);
        } else {
            return response()->json([
                'status' => $save,
                'message' => "Error in updating mobility.",
            ], 400);
        }
    }

    public function deleteMobility($id)
    {
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
    }
}
