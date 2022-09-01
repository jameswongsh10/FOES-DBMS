<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    use HasFactory;

    protected $table = 'staffs';

    protected $primaryKey = 'id';

//    protected $fillable = [
//        'first_name',
//        'last_name',
//        'title',
//        'miri_id',
//        'perth_id',
//        'report_duty_date',
//        'department',
//        'position',
//        'room_no',
//        'ext_no',
//        'status',
//        'email',
//        'appointment_level',
//        'photocopy_id',
//        'pigeonbox_no',
//        'resigned_date',
//        'remark'];

    protected $guarded = ['id'];
}
