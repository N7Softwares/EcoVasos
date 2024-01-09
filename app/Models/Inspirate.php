<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inspirate extends Model
{
    protected $fillable = ['url', 'category_image_id'];

    public function category()
    {
        return $this->belongsTo(ImagesCategory::class, 'category_image_id');
    }
}
