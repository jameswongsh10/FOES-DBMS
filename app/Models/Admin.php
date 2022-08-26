<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    use HasFactory;

    protected $table = 'admins';

    protected $primaryKey = 'id';

//    protected $fillable = [
//        'first_name',
//        'last_name',
//        'miri_id',
//        'perth_id',
//        'email',
//        'password'];


    //Should we set id to guarded?
    protected $guarded = ['id'];
}
