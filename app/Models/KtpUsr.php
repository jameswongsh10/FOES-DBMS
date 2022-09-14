<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KtpUsr extends Model
{
    use HasFactory;

    protected $table = 'ktp_usr';

    protected $primaryKey = 'id';

    protected $guarded = ['id', 'created_at', 'updated_at'];
}
