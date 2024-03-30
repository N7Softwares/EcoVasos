<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class LimpiarDatosTemporales
{
    public function handle($request, Closure $next)
    {
        // Obtener la lista de archivos en la carpeta temporal
        $files = Storage::files('temp');

        // Obtener la fecha y hora actual
        $now = Carbon::now();

        // Iterar sobre los archivos y eliminar los que hayan expirado
        foreach ($files as $file) {
            // Obtener la fecha y hora de expiración del archivo
            $expirationFile = str_replace('.json', '.expiration', $file);
            if (Storage::exists($expirationFile)) {
                $expiration = Carbon::parse(Storage::get($expirationFile));
                if ($now->greaterThan($expiration)) {
                    // Eliminar el archivo y su archivo de expiración
                    Storage::delete([$file, $expirationFile]);
                }
            }
        }

        return $next($request);
    }
}
