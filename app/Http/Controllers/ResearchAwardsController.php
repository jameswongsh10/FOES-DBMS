<?php

namespace App\Http\Controllers;

use App\Models\ResearchAwards;
use Illuminate\Database\QueryException;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ResearchAwardsController extends Controller
{
    public function createAwards()
    {
        try {
            $data = json_decode(file_get_contents('php://input'), true);

            $newAwards = new ResearchAwards();

            foreach ($data as $key => $value) {
                $newAwards->$key = $value;
            }

            //Save into database
            $newAwards->save();

            return response()->json([
                'status' => true,
                'message' => "Awards created successfully!",
                'awards' => $newAwards
            ], 201);

        } catch (QueryException $e) {
            return response()->json([
                'status' => false,
                'message' => $e->errorInfo[2]
            ], 400);
        }
    }

    public function addAwardsColumn()
    {
        try {
            $columnName = json_decode(file_get_contents('php://input'), true);

            Schema::table('research_awards', function (Blueprint $table) use ($columnName) {
                $table->string($columnName)->after('evidence_link')->default('');
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

    public function readAllAwards()
    {
        try {
            $awards = ResearchAwards::all();

            return response()->json([
                'status' => true,
                'Awards' => $awards
            ]);

        } catch (QueryException $e) {
            return response()->json([
                'status' => false,
                'message' => $e->errorInfo[2]
            ], 400);
        }
    }

    public function readAwards($id)
    {
        try {
            $awards = ResearchAwards::find($id);

            if (is_null($awards)) {
                return response()->json([
                    'status' => false,
                    'message' => "Awards not found",
                ], 404);
            }
            return response()->json([
                'status' => true,
                'awards' => $awards
            ], 200);

        } catch (QueryException $e) {
            return response()->json([
                'status' => false,
                'message' => $e->errorInfo[2]
            ], 400);
        }
    }

    public function getAwardsbyStaffID($staff_id)
    {
        try {
            $column = 'staff_id'; // This is the name of the column you wish to search

            $awards = ResearchAwards::where($column, '=', $staff_id)->with('staff')->get();

            if (is_null($awards)) {
                return response()->json([
                    'status' => false,
                    'message' => "Awards not found",
                ], 404);
            }

            return response()->json([
                'status' => true,
                'awards' => $awards
            ], 200);

        } catch (QueryException $e) {
            return response()->json([
                'status' => false,
                'message' => $e->errorInfo[2]
            ], 400);
        }
    }

    public function updateAwards($id)
    {
        try {
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

        } catch (QueryException $e) {
            return response()->json([
                'status' => false,
                'message' => $e->errorInfo[2]
            ], 400);
        }
    }

    public function deleteAwards($id)
    {
        try {
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

        } catch (QueryException $e) {
            return response()->json([
                'status' => false,
                'message' => $e->errorInfo[2]
            ], 400);
        }
    }

    public function getAwardsColumns()
    {
        try {
            $columns = Schema::getColumnListing('research_awards');

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
