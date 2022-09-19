<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KeyContactPerson extends Model
{
    use HasFactory;

    protected $table = 'key_contact_person';

    protected $primaryKey = 'id';

    protected $guarded = ['id', 'created_at', 'updated_at'];

    protected $with = ['moumoa'];
    public function moumoa()
    {
        return $this->belongsTo(MOUMOA::class);
    }
}
