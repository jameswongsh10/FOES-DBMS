<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use Illuminate\Database\QueryException;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;

class AssetController extends Controller
{
    public function createAsset()
    {
        if (Auth::check()) {
            try {
                $data = json_decode(file_get_contents('php://input'), true);

                $newAsset = new Asset();

                foreach ($data as $key => $value) {
                    $newAsset->$key = $value;
                }

                //Save into database
                $newAsset->save();

                return response()->json([
                    'status' => true,
                    'message' => "Asset created successfully!",
                    'asset' => $newAsset
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

    public function addAssetColumn()
    {
        if (Auth::check()) {
            try {
                $columnName = json_decode(file_get_contents('php://input'), true);

                Schema::table('assets', function (Blueprint $table) use ($columnName) {
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

    public function readAllAsset()
    {
        if (Auth::check()) {
            try {
                $asset = Asset::all();

                return response()->json([
                    'status' => true,
                    'Asset' => $asset
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

    public function readAsset($id)
    {
        if (Auth::check()) {
            try {
                $asset = Asset::find($id);

                if (is_null($asset)) {
                    return response()->json([
                        'status' => false,
                        'message' => "Asset not found",
                    ], 404);
                }

                return response()->json([
                    'status' => true,
                    'asset' => $asset
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

    public function updateAsset($id)
    {
        if (Auth::check()) {
            try {
                $asset = Asset::find($id);

                if (is_null($asset)) {
                    return response()->json([
                        'status' => false,
                        'message' => "Asset not found",
                    ], 404);
                }

                $data = json_decode(file_get_contents('php://input'), true);

                $asset->update($data);

                return response()->json([
                    'status' => true,
                    'message' => "Asset updated successfully!",
                    'asset' => $asset
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

    public function deleteAsset($id)
    {
        if (Auth::check()) {
            try {
                $asset = Asset::find($id);

                if (is_null($asset)) {
                    return response()->json([
                        'status' => false,
                        'message' => "Asset not found",
                    ], 404);
                }

                $asset->delete();

                return response()->json([
                    'status' => true,
                    'message' => "Asset deleted successfully!",
                    'asset' => $asset
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

    public function getAssetColumns()
    {
        if (Auth::check()) {
            try {
                $columns = Schema::getColumnListing('assets');

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
