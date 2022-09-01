<?php

namespace App\Http\Controllers;

use App\Models\InactiveMOUMOA;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Inactive_MOUMOA_Controller extends Controller
{
    public function createInactiveMOUMOA()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        $newInactiveMOUMOA = new InactiveMOUMOA();

        foreach ($data as $key => $value) {
            $newInactiveMOUMOA->$key = $value;
        }

        //Save into database
        $save = $newInactiveMOUMOA->save();

        if ($save) {
            return response()->json([
                'status' => $save,
                'message' => "InactiveMOUMOA created successfully!",
                'InactiveMOUMOA' => $newInactiveMOUMOA
            ], 201);
        } else {
            return response()->json([
                'status' => $save,
                'message' => "Error in creating InactiveMOUMOA.",
            ], 400);
        }
    }

    public function addInactiveMOUMOAColumn()
    {
        $columnName = json_decode(file_get_contents('php://input'), true);

        Schema::table('inactive_mou_moa', function (Blueprint $table) use ($columnName) {
            $table->string($columnName)->after('mutual_extension')->default('');
        });

        return response()->json([
            'status' => true,
            'message' => "Column added successfully!",
            'column' => $columnName
        ], 201);
    }

    public function readAllInactiveMOUMOA()
    {
        $InactiveMOUMOA = InactiveMOUMOA::all();

        return response()->json([
            'status' => true,
            'InactiveMOUMOA' => $InactiveMOUMOA
        ]);
    }

    public function readInactiveMOUMOA($id)
    {
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
    }

    public function updateInactiveMOUMOA($id)
    {
        $InactiveMOUMOA = InactiveMOUMOA::find($id);

        if (is_null($InactiveMOUMOA)) {
            return response()->json([
                'status' => false,
                'message' => "InactiveMOUMOA not found",
            ], 404);
        }

        $data = json_decode(file_get_contents('php://input'), true);

        $save = $InactiveMOUMOA->update($data);

        if ($save) {
            return response()->json([
                'status' => $save,
                'message' => "InactiveMOUMOA updated successfully!",
                'InactiveMOUMOA' => $InactiveMOUMOA
            ], 200);
        } else {
            return response()->json([
                'status' => $save,
                'message' => "Error in updating InactiveMOUMOA.",
            ], 400);
        }
    }

    public function deleteInactiveMOUMOA($id)
    {
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
    }
}
