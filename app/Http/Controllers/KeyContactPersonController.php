<?php

namespace App\Http\Controllers;


use App\Models\KeyContactPerson;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class KeyContactPersonController extends Controller
{
    public function createKeyContactPerson()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        $newKeyContactPerson = new KeyContactPerson();

        foreach ($data as $key => $value) {
            $newKeyContactPerson->$key = $value;
        }

        //Save into database
        $save = $newKeyContactPerson->save();

        if ($save) {
            return response()->json([
                'status' => $save,
                'message' => "Key Contact Person created successfully!",
                'KeyContactPerson' => $newKeyContactPerson
            ], 201);
        } else {
            return response()->json([
                'status' => $save,
                'message' => "Error in creating Key Contact Person.",
            ], 400);
        }
    }

    public function readAllKeyContactPerson()
    {
        $KeyContactPerson = KeyContactPerson::all();

        return response()->json([
            'status' => true,
            'KeyContactPerson' => $KeyContactPerson
        ]);
    }

    public function readKeyContactPerson($id)
    {
        $KeyContactPerson = KeyContactPerson::find($id);

        if (is_null($KeyContactPerson)) {
            return response()->json([
                'status' => false,
                'message' => "Key Contact Person not found",
            ], 404);
        }

        return response()->json([
            'status' => true,
            'KeyContactPerson' => $KeyContactPerson
        ], 200);
    }

    public function updateKeyContactPerson($id)
    {
        $KeyContactPerson = KeyContactPerson::find($id);

        if (is_null($KeyContactPerson)) {
            return response()->json([
                'status' => false,
                'message' => "Key Contact Person not found",
            ], 404);
        }

        $data = json_decode(file_get_contents('php://input'), true);

        $save = $KeyContactPerson->update($data);

        if ($save) {
            return response()->json([
                'status' => $save,
                'message' => "Key Contact Person updated successfully!",
                'KeyContactPerson' => $KeyContactPerson
            ], 200);
        } else {
            return response()->json([
                'status' => $save,
                'message' => "Error in updating Key Contact Person.",
            ], 400);
        }
    }

    public function deleteKeyContactPerson($id)
    {
        $KeyContactPerson = KeyContactPerson::find($id);

        if (is_null($KeyContactPerson)) {
            return response()->json([
                'status' => false,
                'message' => "Key Contact Person not found",
            ], 404);
        }

        $KeyContactPerson->delete();

        return response()->json([
            'status' => true,
            'message' => "Key Contact Person deleted successfully!",
            'KeyContactPerson' => $KeyContactPerson
        ], 200);
    }
}
