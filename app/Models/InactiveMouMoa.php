<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InactiveMouMoa extends Model
{
    use HasFactory;

    protected $table = 'inactive_mou_moa';

    protected $primaryKey = 'id';

//    protected $fillable = [
//        'collaborators',
//        'signed_date',
//        'effective_period',
//        'due_date',
//        'agreement',
//        'mutual_extension'];

    protected $guarded = ['id'];
}