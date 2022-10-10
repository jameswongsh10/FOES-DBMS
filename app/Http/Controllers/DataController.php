<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Asset;
use App\Models\InactiveMouMoa;
use App\Models\KtpUsr;
use App\Models\Mobility;
use App\Models\MouMoa;
use App\Models\ResearchAwards;
use App\Models\Staff;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;
use Illuminate\Console\Command;
use Spatie\DbDumper\Databases\MySql;

class DataController extends Controller
{
    public function csvImport()
    {
        if (Auth::check()) {
            $save = false;
            $data = json_decode(file_get_contents('php://input'), true);

            //Get Column name and column value, make a copy of original backup for new array use.
            $columnName = $data[0];
            $columnInfo = $data[1];
            $table = $data[2];
            $columnArray = [];

        //Get all columns of the specific table from MySQL database
        switch ($table) {
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
            case "Inactive-MOU-MOA":
                $columnArray = Schema::getColumnListing('inactive_mou_moa');
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
        $afterTrim = rtrim($afterTrim);
        $columnName[$arrayCount - 1] = $afterTrim;

        //Sort the two array and make comparison
        sort($columnArray);
        sort($columnName);

        for ($i = 0; $i < count($columnName); $i++) {
            $columnName[$i] = trim($columnName[$i]);
        }

        //Proceed only if every column matched
        if ($columnArray == $columnName) {
            foreach ($columnInfo as $colInfo) {
                switch ($table) {
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
                    case "Inactive-MOU-MOA":
                        $newData = new InactiveMouMoa();
                        break;
                    case "Mobility":
                        $newData = new Mobility();
                        break;
                    case "Research-Award":
                        $newData = new ResearchAwards();
                        break;
                    default:
                        break;
                }

                try {
                    foreach ($colInfo as $key => $value) {
                        $key = rtrim($key);
                        $newData->$key = $value;
                    }
                    $save = $newData->save();

                } catch (\Exception $e) {
                    return response()->json([
                        'status' => $save,
                        'message' => $e->getMessage()
                    ], 400);
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
        return response()->json([
            'status' => false,
            'message' => "Unauthorized user"
        ], 401);
    }

    public function database_backup()
    {
        $output = null;
        $result_code = null;
        $path = 'php ' . '"' . realpath("../") . '\artisan" backup:run --only-db';
        exec($path,$output,$result_code);
        return $result_code;
    }

    public function database_restore(){
        $output = null;
        $result_code = null;
        $path = 'php ' . '"' . realpath("../") . '\artisan" backup:restore-last';
        exec($path,$output,$result_code);
        return $result_code;
    }
}
