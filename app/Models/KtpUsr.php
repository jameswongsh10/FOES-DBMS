<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KtpUsr extends Model
{
    use HasFactory;

    protected $table = 'ktp_usr';

    protected $primaryKey = 'id';

//    protected $fillable = [
//        'category',
//        'date',
//        'program_name',
//        'community_industry_name',
//        'location',
//        'lead_by',
//        'faculty',
//        'cm_driven',
//        'partner_name',
//        'no_of_staff',
//        'no_of_student',
//        'internal_funding',
//        'external_funding'
//    ];

    protected $guarded = ['id'];
}
