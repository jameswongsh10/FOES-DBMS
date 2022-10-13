<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttachmentMobility extends Model
{
    use HasFactory;

    protected $table = 'attachment_mobilities';

    protected $primaryKey = 'id';

    protected $guarded = ['id', 'created_at', 'updated_at'];

    protected $with = ['mobility'];

    public function mobility()
    {
        return $this->belongsTo(Mobility::class);
    }
}
