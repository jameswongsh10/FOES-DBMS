<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KeyContactPerson extends Model
{
    use HasFactory;

    protected $table = 'key_contact_person';

    protected $primaryKey = 'id';

//    protected $fillable = [
//        'mou_moa_id',
//        'institution',
//        'name',
//        'email'];

    protected $guarded = ['id'];
}
