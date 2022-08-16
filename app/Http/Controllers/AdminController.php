<?php

namespace App\Http\Controllers;

use App\Models\Admin;

class AdminController extends Controller
{
    public function createAdmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        $newAdmin = new Admin();
        //Fetch axios data
        $newAdmin->email = $data['Email'];

        //Dummy data
        $newAdmin->first_name = "Admin First Name";
        $newAdmin->last_name = "Admin Last Name";
        $newAdmin->miri_id = "123123";
        $newAdmin->perth_id = "321321";
        $newAdmin->password = "test password";

        //Save into database
        $save = $newAdmin->save();

        if ($save) {
            return redirect('/')->with('success', 'New admin has been created.');
        }
    }

    public function readAdmin(){

    }

    public function updateAdmin(){

    }

    public function deleteAdmin(){

    }
}
