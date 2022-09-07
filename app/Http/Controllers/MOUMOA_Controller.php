<?php

namespace App\Http\Controllers;

use App\Models\MouMoa;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MOUMOA_Controller extends Controller
{
    public function createMOUMOA()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        $newMOUMOA = new MouMoa();

        foreach ($data as $key => $value) {
            $newMOUMOA->$key = $value;
        }

        //Save into database
        $save = $newMOUMOA->save();

        if ($save) {
            return response()->json([
                'status' => $save,
                'message' => "MOUMOA created successfully!",
                'MOUMOA' => $newMOUMOA
            ], 201);
        } else {
            return response()->json([
                'status' => $save,
                'message' => "Error in creating MOUMOA.",
            ], 400);
        }
    }

    public function addMOUMOAColumn()
    {
        $columnName = json_decode(file_get_contents('php://input'), true);

        Schema::table('mou_moa', function (Blueprint $table) use ($columnName) {
            $table->string($columnName)->after('mutual_extension')->default('');
        });

        return response()->json([
            'status' => true,
            'message' => "Column added successfully!",
            'column' => $columnName
        ], 201);
    }

    public function readAllMOUMOA()
    {
        $MOUMOA = MOUMOA::all();

        return response()->json([
            'status' => true,
            'MOUMOA' => $MOUMOA
        ]);
    }

    public function readMOUMOA($id)
    {
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
    }

    public function updateMOUMOA($id)
    {
        $MOUMOA = MOUMOA::find($id);

        if (is_null($MOUMOA)) {
            return response()->json([
                'status' => false,
                'message' => "MOUMOA not found",
            ], 404);
        }

        $data = json_decode(file_get_contents('php://input'), true);

        $save = $MOUMOA->update($data);

        if ($save) {
            return response()->json([
                'status' => $save,
                'message' => "MOUMOA updated successfully!",
                'MOUMOA' => $MOUMOA
            ], 200);
        } else {
            return response()->json([
                'status' => $save,
                'message' => "Error in updating MOUMOA.",
            ], 400);
        }
    }

    public function deleteMOUMOA($id)
    {
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
    }
}
