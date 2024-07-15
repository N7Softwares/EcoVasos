<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PdfHerramienta extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre_usuario',
        'nombre_diseno',
        'nombre_archivo',
    ];

    protected $table = 'pdfs_herramienta'; // Nombre de la tabla en la base de datos
}
