<?php

namespace App\Http\Controllers;

namespace App\Console\Commands;

use App\Models\Admin;
use App\Models\Asset;
use App\Models\KtpUsr;
use App\Models\Mobility;
use App\Models\MouMoa;
use App\Models\ResearchAwards;
use App\Models\Staff;
use Illuminate\Support\Facades\Schema;
use Illuminate\Console\Command;

class DataController extends Controller
{
    public function csvImport()
    {
        $save = false;
        $data = json_decode(file_get_contents('php://input'), true);

        //Get Column name and column value, make a copy of original backup for new array use.
        $columnName = $data[0];
        $columnInfo = $data[1];
        $table = $data[2];
        $columnArray = [];

        //Get all columns of admin table from MySQL database
        switch ($table) {
            case "Admin":
                $columnArray = Schema::getColumnListing('admins');
                break;
            case "Asset":
                $columnArray = Schema::getColumnListing('assets');
                break;
            case "Staff":
                $columnArray = Schema::getColumnListing('staffs');
                break;
            case "KTP-USR":
                $columnArray = Schema::getColumnListing('ktp_usr');
                break;
            case "MOU-MOA":
                $columnArray = Schema::getColumnListing('mou_moa');
                break;
            case "Mobility":
                $columnArray = Schema::getColumnListing('mobility');
                break;
            case "Research-Award":
                $columnArray = Schema::getColumnListing('research_awards');
                break;
            default:
                break;
        }

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
                switch ($table) {
                    case "Admin":
                        $newData = new Admin();
                        break;
                    case "Asset":
                        $newData = new Asset();
                        break;
                    case "Staff":
                        $newData = new Staff();
                        break;
                    case "KTP-USR":
                        $newData = new KtpUsr();
                        break;
                    case "MOU-MOA":
                        $newData = new MouMoa();
                        break;
                    case "Mobility":
                        $newData = new Mobility();
                        break;
                    case "Research-Award":
                        $newData = new ResearchAwards();
                        break;
                    default:
//                        $newData = new Admin();
                        break;
                }

                try {
                    foreach ($colInfo as $key => $value) {
                        $key = rtrim($key, "\r");
                        $newData->$key = $value;
                    }
                    $save = $newData->save();
                } catch (\Exception $e) {
                    return $e->getMessage();
                }
            }
        }

        if ($save) {
            return response()->json([
                'status' => $save,
                'message' => "CSV file imported successfully!",
            ], 201);
        } else {
            return response()->json([
                'status' => $save,
                'message' => "Error in CSV file import.",
            ], 400);
        }
    }

    public function database_backup()
    {

    }
}
