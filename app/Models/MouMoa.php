<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MouMoa extends Model
{
    use HasFactory;

    protected $table = 'mou_moa';

    protected $primaryKey = 'id';

//    protected $fillable = [
//        'country',
//        'institution',
//        'signed_date',
//        'due_date',
//        'area_of_collab',
//        'progress',
//        'type_of_agreement',
//        'research',
//        'teaching',
//        'exchange',
//        'collab_and_partnerships',
//        'mutual_extension'
//    ];

    protected $guarded = ['id'];
}
