<?php

namespace App\Console\Commands;

use ZipArchive;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Storage;

class RestoreLastBackup extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'backup:restore-last';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Restore the last backup from s3';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        // Get Last backup file
        $fileArray = collect(Storage::disk($this->getBackupDisk())->files('Laravel'))->toArray();
        $matchingFiles = array();
        foreach ($fileArray as $file) {
            $file_parts = pathinfo($file);
            if ($file_parts['extension'] == "zip") {
                array_push($matchingFiles, $file);
                $this->info("Push: ".$file);
            }
        }

        $lastFile = collect($matchingFiles)->last();
        $this->info($lastFile);

        // Download File
        Storage::disk('local')->writeStream('Laravel\\' . $lastFile, Storage::disk($this->getBackupDisk())->readStream($lastFile));

        // Unzip
        $success = $this->unzipBackup($lastFile);

        if ($success) {
            $this->startDump();
        } else {
            $this->error('Zip file not found');
        }
    }

    private function getBackupDisk()
    {
        return config('backup.backup.destination.disks')[0];
    }

    private function getBackupName()
    {
        return config('backup.backup.name');
    }

    private function unzipBackup($file): bool
    {
        $zip = new ZipArchive;
        $res = $zip->open(
            Storage::disk('local')->path($file)
        );
        if ($res === TRUE) {
            $zip->extractTo(Storage::disk('local')->path('backups\\' . $this->getBackupName()));
            $zip->close();
            return true;
        } else {
            return false;
        }
    }

    private function startDump()
    {
        // Wipe Database
        Artisan::call('db:wipe');

        // Import SQL file
        $sqlFile = '"' . Storage::disk('local')->path('backups\\' . $this->getBackupName() . '\\db-dumps\\mysql-' . config('database.connections.mysql.database') . '.sql');
        // Files is sometimes too big to be imported with PHP, so we run a mysql command instead
        if (config('database.mysql.password')) {
            exec("mysql -u " . config('database.connections.mysql.username') . " -p " . config('database.connections.mysql.password') . " " . config('database.connections.mysql.database') . " < " . $sqlFile);
        } else {
            exec("mysql -u " . config('database.connections.mysql.username') . " " . config('database.connections.mysql.database') . " < " . $sqlFile);
        }
    }
}
