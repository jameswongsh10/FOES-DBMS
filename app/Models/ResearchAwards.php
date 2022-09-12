<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResearchAwards extends Model
{
    use HasFactory;

    protected $table = 'assets';

    protected $primaryKey = 'id';

    protected $guarded = ['id', 'created_at', 'updated_at'];
}
