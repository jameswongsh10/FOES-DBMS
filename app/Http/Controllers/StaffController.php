<?php

namespace App\Http\Controllers;

use App\Models\Staff;
use Illuminate\Http\Request;

class StaffController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $staff = Staff::all();

        return response()->json([
            "success" => true,
            "message" => "Staff List",
            "data" => $staff
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->all();

        $staff = Staff::create($input);

        return response()->json([
            "success" => true,
            "message" => "Staff created successfully.",
            "data" => $staff
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $staff = Staff::find($id);

        if (is_null($staff)) {
            return
                response()->json([
                    "success" => false,
                    "message" => "Staff not found."
                ], 404);
        }

        return response()->json([
            "success" => true,
            "message" => "Staff retrieved successfully.",
            "data" => $staff
        ], 200);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {

    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $input = $request->all();

        $staff = Staff::find($id);

        if (is_null($staff)) {
           return response()->json([
                "success" => false,
                "message" => "Staff not found."
            ], 404);
        }

        $staff->update($input);

        return response()->json([
            "success" => true,
            "message" => "Staff updated successfully.",
            "data" => $staff
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $staff = Staff::find($id);

        $staff->delete();

        return response()->json([
            "success" => true,
            "message" => "Staff deleted successfully.",
            "data" => $staff
        ]);
    }
}
