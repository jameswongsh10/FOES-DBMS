<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Mobility;
use Illuminate\Support\Facades\Schema;

class DataController extends Controller
{
    public function csvImport()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        //Get Column name and column value, make a copy of original backup for new array use.
        $columnName = $data[0];
        $columnInfo = $data[1];
        $table = $data[2];

        //Get all columns of admin table from MySQL database
        $columnArray = Schema::getColumnListing('admins');

        //Remove unused columns, sort the arrays and compare between the column array from database and the column array reads from csv file.
        $unusedElement = ['id', 'created_at', 'updated_at'];

        foreach ($unusedElement as $col) {
            $key = array_search($col, $columnArray, true);
            if ($key !== false) {
                unset($columnArray[$key]);
            }
        }

        //Trim the last element of the array cuz it always comes with \r
        $arrayCount = count($columnName);
        $afterTrim = $columnName[$arrayCount - 1];
        $afterTrim = rtrim($afterTrim, "\r");
        $columnName[$arrayCount - 1] = $afterTrim;

        //Sort the two array and make comparison
        sort($columnArray);
        sort($columnName);

        //Proceed only if every column matched
        if ($columnArray == $columnName) {
            foreach ($columnInfo as $colInfo) {
                $newData = new Admin();
                foreach ($colInfo as $key => $value) {
                    $key = rtrim($key, "\r");
                    $newData->$key = $value;
                }
                $newData->save();
            }
        }
    }
}
