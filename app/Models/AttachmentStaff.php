<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttachmentStaff extends Model
{
    use HasFactory;

    protected $table = 'attachment_staff';

    protected $primaryKey = 'id';

    protected $guarded = ['id', 'created_at', 'updated_at'];
}
