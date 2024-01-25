<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tipografia extends Model
{
    protected $fillable = [
        'name', // Nombre de la fuente
        'file_path', // Ruta del archivo de la fuente
    ];
}
