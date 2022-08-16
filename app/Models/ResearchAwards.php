<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResearchAwards extends Model
{
    use HasFactory;

    protected $table = 'assets';

    protected $primaryKey = 'id';

    protected $fillable = [
        'staff_id',
        'type_of_grant',
        'project_title',
        'co_investigators',
        'research_grant_scheme',
        'award_amount',
        'evidence_link'
    ];
}
