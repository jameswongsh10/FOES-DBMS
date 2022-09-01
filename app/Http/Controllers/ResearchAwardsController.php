<?php

namespace App\Http\Controllers;

use App\Models\ResearchAwards;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ResearchAwardsController extends Controller
{
    public function createAwards()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        $newAwards = new ResearchAwards();

        foreach ($data as $key => $value) {
            $newAwards->$key = $value;
        }

        //Save into database
        $save = $newAwards->save();

        return response()->json([
            'status' => $save,
            'message' => "Awards created successfully!",
            'awards' => $newAwards
        ], 201);
    }

    public function addAwardsColumn()
    {
        $columnName = json_decode(file_get_contents('php://input'), true);

        Schema::table('research_awards', function (Blueprint $table) use ($columnName) {
            $table->string($columnName)->after('evidence_link')->default('');
        });

        return response()->json([
            'status' => true,
            'message' => "Column added successfully!",
            'column' => $columnName
        ], 201);
    }

    public function readAllAwards()
    {
        $awards = ResearchAwards::all();

        return response()->json([
            'status' => true,
            'Awards' => $awards
        ]);
    }

    public function readAwards($id)
    {
        $awards = ResearchAwards::find($id);

        if (is_null($awards)) {
            return response()->json([
                'status' => false,
                'message' => "Awards not found",
            ], 404);
        }

        return response()->json([
            //   'status' => true,
            'awards' => $awards
        ], 200);
    }

    public function updateAwards($id)
    {
        $awards = ResearchAwards::find($id);

        if (is_null($awards)) {
            return response()->json([
                'status' => false,
                'message' => "Awards not found",
            ], 404);
        }

        $data = json_decode(file_get_contents('php://input'), true);

        $awards->update($data);

        return response()->json([
            'status' => true,
            'message' => "Awards updated successfully!",
            'awards' => $awards
        ], 200);
    }

    public function deleteAwards($id)
    {
        $awards = ResearchAwards::find($id);

        if (is_null($awards)) {
            return response()->json([
                'status' => false,
                'message' => "Awards not found",
            ], 404);
        }

        $awards->delete();

        return response()->json([
            'status' => true,
            'message' => "Awards deleted successfully!",
            'awards' => $awards
        ], 200);
    }
}
