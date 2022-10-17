<?php

namespace App\Http\Controllers;

use App\Models\ResearchAwards;
use Illuminate\Database\QueryException;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;

class ResearchAwardsController extends Controller
{
    public function createAwards()
    {
        if (Auth::check()) {
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
        return response()->json([
            'status' => false,
            'message' => "Unauthorized user"
        ], 401);
    }

    public function addAwardsColumn()
    {
        if (Auth::check()) {
            try {
                $columnName = json_decode(file_get_contents('php://input'), true);

                Schema::table('research_awards', function (Blueprint $table) use ($columnName) {
                    $table->string($columnName)->default('');
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

    public function readAllAwards()
    {
        if (Auth::check()) {
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
        return response()->json([
            'status' => false,
            'message' => "Unauthorized user"
        ], 401);
    }

    public function readAwards($id)
    {
        if (Auth::check()) {
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
        return response()->json([
            'status' => false,
            'message' => "Unauthorized user"
        ], 401);
    }

    public function getAwardsbyStaffID($staff_miri_id)
    {
        if (Auth::check()) {
            try {
                $column = 'staff_miri_id'; // This is the name of the column you wish to search

                $awards = ResearchAwards::where($column, '=', $staff_miri_id)->with('staff')->get();

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
        return response()->json([
            'status' => false,
            'message' => "Unauthorized user"
        ], 401);
    }

    public function updateAwards($id)
    {
        if (Auth::check()) {
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
        return response()->json([
            'status' => false,
            'message' => "Unauthorized user"
        ], 401);
    }

    public function deleteAwards($id)
    {
        if (Auth::check()) {
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
        return response()->json([
            'status' => false,
            'message' => "Unauthorized user"
        ], 401);
    }

    public function getAwardsColumns()
    {
        if (Auth::check()) {
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
        return response()->json([
            'status' => false,
            'message' => "Unauthorized user"
        ], 401);
    }
}
