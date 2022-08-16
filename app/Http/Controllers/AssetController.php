<?php

namespace App\Http\Controllers;

use App\Models\Asset;

class AssetController extends Controller
{
    public function createAsset()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        $newAsset = new Asset();

        //Dummy data
        $newAsset->physical_check = "physical_check";
        $newAsset->asset_tag_number = "asset_tag_number";
        $newAsset->item = $data['Item'];
        $newAsset->serial_no = "111";
        $newAsset->year_purchased = "2000";
        $newAsset->warranty = "warranty";
        $newAsset->quantity = $data['Quantity'];
        $newAsset->original_cost = "200";
        $newAsset->condition_of_asset = "condition_of_asset";
        $newAsset->grant = "200";
        $newAsset->brand = "brand";
        $newAsset->model_no = "2000";
        $newAsset->remark = "none";

        //Save into database
        $save = $newAsset->save();

        if ($save) {
            return redirect('/')->with('success', 'New Asset has been created.');
        }
    }
}
