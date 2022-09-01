<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AssetController extends Controller
{
    public function createAsset()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        $newAsset = new Asset();

        foreach ($data as $key => $value) {
            $newAsset->$key = $value;
        }

        //Save into database
        $save = $newAsset->save();

        if ($save) {
            return response()->json([
                'status' => $save,
                'message' => "Asset created successfully!",
                'asset' => $save
            ], 201);
        } else {
            return response()->json([
                'status' => $save,
                'message' => "Error in creating asset",
                'asset' => $save
            ], 400);
        }
    }


    public
    function addAssetColumn()
    {
        $columnName = json_decode(file_get_contents('php://input'), true);

        Schema::table('assets', function (Blueprint $table) use ($columnName) {
            $table->string($columnName)->after('remark')->default('');
        });

        return response()->json([
            'status' => true,
            'message' => "Column added successfully!",
            'column' => $columnName
        ], 201);
    }

    public
    function readAllAsset()
    {
        $asset = Asset::all();

        return response()->json([
            'status' => true,
            'Asset' => $asset
        ]);
    }

    public
    function readAsset($id)
    {
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
    }

    public
    function updateAsset($id)
    {
        $asset = Asset::find($id);

        if (is_null($asset)) {
            return response()->json([
                'status' => false,
                'message' => "Asset not found",
            ], 404);
        }

        $data = json_decode(file_get_contents('php://input'), true);

        $save = $asset->update($data);

        if ($save) {
            return response()->json([
                'status' => true,
                'message' => "Asset updated successfully!",
                'asset' => $asset
            ], 200);
        } else {
            return response()->json([
                'status' => $save,
                'message' => "Error in updating asset",
                'asset' => $save
            ], 400);
        }
    }

    public
    function deleteAsset($id)
    {
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
    }
}
