<?php

namespace App\Http\Controllers;


use App\Models\KeyContactPerson;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Schema;

class KeyContactPersonController extends Controller
{
    public function createKeyContactPerson()
    {
        try {
            $data = json_decode(file_get_contents('php://input'), true);

            $newKeyContactPerson = new KeyContactPerson();

            foreach ($data as $key => $value) {
                $newKeyContactPerson->$key = $value;
            }

            //Save into database
            $save = $newKeyContactPerson->save();

            return response()->json([
                'status' => $save,
                'message' => "Key Contact Person created successfully!",
                'KeyContactPerson' => $newKeyContactPerson
            ], 201);

        } catch (QueryException $e) {
            return response()->json([
                'status' => false,
                'message' => $e->errorInfo[2]
            ], 400);
        }
    }

    public function readAllKeyContactPerson()
    {
        try {
            $KeyContactPerson = KeyContactPerson::all();

            return response()->json([
                'status' => true,
                'KeyContactPerson' => $KeyContactPerson
            ]);

        } catch (QueryException $e) {
            return response()->json([
                'status' => false,
                'message' => $e->errorInfo[2]
            ], 400);
        }
    }

    public function readKeyContactPerson($id)
    {
        try {
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

        } catch (QueryException $e) {
            return response()->json([
                'status' => false,
                'message' => $e->errorInfo[2]
            ], 400);
        }
    }

    public function getContactPersonbyMOUMOA_ID($moumoa_id)
    {
        try {
            $column = 'mou_moa_id'; // This is the name of the column you wish to search

            $contact = KeyContactPerson::where($column, '=', $moumoa_id)->with('moumoa')->get();

            if (is_null($contact)) {
                return response()->json([
                    'status' => false,
                    'message' => "Contact not found",
                ], 404);
            }

            return response()->json([
                'status' => true,
                'awards' => $contact
            ], 200);

        } catch (QueryException $e) {
            return response()->json([
                'status' => false,
                'message' => $e->errorInfo[2]
            ], 400);
        }
    }

    public function updateKeyContactPerson($id)
    {
        try {
            $KeyContactPerson = KeyContactPerson::find($id);

            if (is_null($KeyContactPerson)) {
                return response()->json([
                    'status' => false,
                    'message' => "Key Contact Person not found",
                ], 404);
            }

            $data = json_decode(file_get_contents('php://input'), true);

            $KeyContactPerson->update($data);

            return response()->json([
                'status' => true,
                'message' => "Key Contact Person updated successfully!",
                'KeyContactPerson' => $KeyContactPerson
            ], 200);

        } catch (QueryException $e) {
            return response()->json([
                'status' => false,
                'message' => $e->errorInfo[2]
            ], 400);
        }
    }

    public function deleteKeyContactPerson($id)
    {
        try {
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

        } catch (QueryException $e) {
            return response()->json([
                'status' => false,
                'message' => $e->errorInfo[2]
            ], 400);
        }
    }

    public function getKeyContactPersonColumns()
    {
        try {
            $columns = Schema::getColumnListing('key_contact_person');

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
