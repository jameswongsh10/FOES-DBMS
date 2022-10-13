<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttachmentMoumoa extends Model
{
    use HasFactory;

    protected $table = 'attachment_moumoas';

    protected $primaryKey = 'id';

    protected $guarded = ['id', 'created_at', 'updated_at'];

    protected $with = ['mou_moa'];

    public function mou_moa()
    {
        return $this->belongsTo(MouMoa::class);
    }
}
