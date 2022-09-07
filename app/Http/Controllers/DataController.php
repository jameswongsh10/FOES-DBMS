<?php

namespace App\Http\Controllers;

class DataController extends Controller
{
    public function csvImport()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        //Check the selected table


        //Save into database
        //$save = $newAdmin->save();

//        if ($save) {
//            return response()->json([
//                'status' => $save,
//                'message' => "Admin created successfully!",
//                'admin' => $newAdmin
//            ], 201);
//        } else {
//            return response()->json([
//                'status' => $save,
//                'message' => "Error in creating admin.",
//            ], 400);
//        }
    }

}
