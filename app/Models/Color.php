<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Color extends Model
{
    // Los campos que se pueden asignar masivamente
    protected $fillable = ['name', 'hex_code', 'rgb_code', 'colors_category_id'];

    // No posee relaciones con otras tablas
    public function category()
    {
        return $this->belongsTo(ColorsCategory::class, 'colors_category_id');
    }

}
