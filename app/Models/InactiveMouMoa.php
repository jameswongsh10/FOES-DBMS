<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InactiveMouMoa extends Model
{
    use HasFactory;

    protected $table = 'inactive_mou_moa';

    protected $primaryKey = 'id';

    protected $guarded = ['id', 'created_at', 'updated_at'];
}
