<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use function MongoDB\BSON\toJSON;

class AdminController extends Controller
{
    public function createAdmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        $newAdmin = new Admin();

        foreach ($data as $key=>$value) {
            $newAdmin->$key = $value;
        }

        //Save into database
        $save = $newAdmin->save();

        if ($save) {
//            return redirect('/')->with('success', 'New admin has been created.');
        }
    }

    public function addAdminColumn(){
        $columnName = json_decode(file_get_contents('php://input'), true);

        Schema::table('admins', function (Blueprint $table) use ($columnName) {
            $table->string($columnName)->default('');
        });
    }

    public function fetchAdminTable()
    {
        $admin = Admin::all();
        echo $admin;
//        $compressedJSON = gzdeflate($admin, 9);
//        setcookie('adminTable', $compressedJSON);
//        return $admin;
    }

    public function readAdmin(){

    }

    public function updateAdmin(){

    }

    public function deleteAdmin(){

    }
}
