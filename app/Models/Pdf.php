<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pdf extends Model
{
    use HasFactory;

    // Define la tabla asociada con el modelo
    protected $table = 'pdfs';

    // Especifica los campos que pueden ser asignados en masa
    protected $fillable = [
        'nombre_usuario',
        'nombre_diseno',
        'nombre_archivo',
    ];

    // Define la clave primaria de la tabla, si no sigue la convención de Laravel
    protected $primaryKey = 'id_pdf';

    // Desactiva las marcas de tiempo si no las estás utilizando
    public $timestamps = true;
}
