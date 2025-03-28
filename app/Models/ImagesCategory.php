<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ImagesCategory extends Model
{
    protected $table = 'images_categories'; // Asegúrate de que este es el nombre correcto de la tabla

    public function elements()
    {
        return $this->hasMany(Element::class, 'category_image_id'); // Ajusta 'category_id' si es diferente
    }
}