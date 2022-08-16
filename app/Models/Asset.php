<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asset extends Model
{
    use HasFactory;

    protected $table = 'assets';

    protected $primaryKey = 'id';

    protected $fillable = [
        'physical_check',
        'asset_tag_number',
        'item',
        'description',
        'serial_no',
        'year_purchased',
        'warranty',
        'quantity',
        'original_cost',
        'condition_of_asset',
        'grant',
        'brand',
        'model_no',
        'remark'];
}
