<?php

namespace App\Http\Controllers;

use App\Models\KtpUsr;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class KTPUSR_Controller extends Controller
{
    public function createKTPUSR()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        $newKTPUSR = new KtpUsr();

        foreach ($data as $key => $value) {
            $newKTPUSR->$key = $value;
        }

        //Save into database
        $save = $newKTPUSR->save();

        if ($save) {
            return response()->json([
                'status' => $save,
                'message' => "KTPUSR created successfully!",
                'ktpusr' => $newKTPUSR
            ], 201);
        } else {
            return response()->json([
                'status' => $save,
                'message' => "Error in creating KTPUSR.",
            ], 400);
        }
    }

    public function addKTPUSRColumn()
    {
        $columnName = json_decode(file_get_contents('php://input'), true);

        Schema::table('ktp_usr', function (Blueprint $table) use ($columnName) {
            $table->string($columnName)->after('external_funding')->default('');
        });

        return response()->json([
            'status' => true,
            'message' => "Column added successfully!",
            'column' => $columnName
        ], 201);
    }

    public function readAllKTPUSR()
    {
        $KTPUSR = KTPUSR::all();

        return response()->json([
            'status' => true,
            'ktpusr' => $KTPUSR
        ]);
    }

    public function readKTPUSR($id)
    {
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
    }

    public function updateKTPUSR($id)
    {
        $KTPUSR = KTPUSR::find($id);

        if (is_null($KTPUSR)) {
            return response()->json([
                'status' => false,
                'message' => "KTPUSR not found",
            ], 404);
        }

        $data = json_decode(file_get_contents('php://input'), true);

        $save = $KTPUSR->update($data);

        if ($save) {
            return response()->json([
                'status' => $save,
                'message' => "KTPUSR updated successfully!",
                'ktpusr' => $KTPUSR
            ], 200);
        } else {
            return response()->json([
                'status' => $save,
                'message' => "Error in updating KTPUSR.",
            ], 400);
        }
    }

    public function deleteKTPUSR($id)
    {
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
    }
}
