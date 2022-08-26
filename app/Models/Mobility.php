<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mobility extends Model
{
    use HasFactory;

    protected $table = 'mobility';

    protected $primaryKey = 'id';

//    protected $fillable = [
//        'staff_or_student',
//        'in_or_out_bound',
//        'name',
//        'attendee_id',
//        'program',
//        'name_of_university',
//        'country',
//        'duration',
//        'from_date',
//        'to_date',
//        'remark'
//    ];

    protected $guarded = ['id'];
}
