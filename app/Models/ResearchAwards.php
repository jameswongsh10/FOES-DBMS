<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResearchAwards extends Model
{
    use HasFactory;

    protected $table = 'research_awards';

    protected $primaryKey = 'id';

    protected $guarded = ['id', 'created_at', 'updated_at'];
    protected $with = ['staff'];
    public function staff()
    {
        return $this->belongsTo(Staff::class);
    }
}
