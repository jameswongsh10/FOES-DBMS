<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Staff;
use http\Env\Request;
use http\Message\Body;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class StaffController extends Controller
{
    public function createStaff()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        $newStaff = new Staff();
        $newStaff->email = $data['Email'];
        $newStaff->first_name = "Test First Name";
        $newStaff->last_name = "Test Last Name";
        $newStaff->title = "Test Title";
        $newStaff->miri_id = "987654321";
        $newStaff->perth_id = "123456789";
        $newStaff->report_duty_date = "2022-12-31";
        $newStaff->department = "Department";
        $newStaff->position = "position";
        $newStaff->room_no = "SK3 104";
        $newStaff->ext_no = "101";
        $newStaff->status = "sos";
        $newStaff->appointment_level = "urgent";
        $newStaff->photocopy_id = "121212121";
        $newStaff->pigeonbox_no = "Pigeonbox number";
        $newStaff->resigned_date = "2023-12-31";
        $newStaff->remark = "test remark";
        $save = $newStaff->save();


        if ($save) {
            return redirect('/')->with('success', 'New staff has been added.');
        }

    }

    public function addStaffColumn()
    {
        $columnName = json_decode(file_get_contents('php://input'), true);

        Schema::table('staffs', function (Blueprint $table) use ($columnName) {
            $table->string($columnName)->default('');
        });

        return response()->json([
            'status' => true,
            'message' => "Column added successfully!",
            'column' => $columnName
        ], 201);
    }

}
