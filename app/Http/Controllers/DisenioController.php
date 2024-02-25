<?php


// app/Http/Controllers/InspirateController.php

namespace App\Http\Controllers;

use App\Models\Inspirate;
use App\Models\Element;
use App\Models\Color;
use App\Models\Tipografia;
use App\Models\ImagesCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;

class DisenioController extends Controller
{
    public function index()
    {
        $inspirates = Inspirate::all();
        $elements = Element::all();
        $colors = Color::all();
        $tipografias = Tipografia::all();

        $array = [
            'inspirates' => $inspirates,
            'elements' => $elements,
            'colors' => $colors,
            'tipografias' => $tipografias
        ];

        return view('frontend.pages.disenio2', compact('array'));
    }
    public function guardarSVG(Request $request)
    {
        $nombreCarpeta = uniqid();
        $rutaCarpeta = public_path('temp_herramienta/' . $nombreCarpeta);
    
        // Crear la carpeta
        if (!file_exists($rutaCarpeta)) {
            mkdir($rutaCarpeta, 0777, true);
        }
    
        // Obtener el contenido del SVG
        $contenidoSVG = $request->svg;
    
        $contenidoSVG = $this->cambiarColorRellenoSVG($contenidoSVG, 'black');
        $contenidoSVG = $this->reducirA2Path($contenidoSVG);
        // Generar un nombre único para el archivo SVG
        $nombreArchivo = uniqid() . '.svg';
    
        // Guardar el SVG en un archivo dentro de la carpeta
        $rutaArchivo = $rutaCarpeta . '/' . $nombreArchivo;
        file_put_contents($rutaArchivo, $contenidoSVG);
    
        // Devolver la ruta del archivo SVG guardado
        return Response::file($rutaArchivo, ['Content-Type' => 'image/svg+xml']);
    }
    
    private function cambiarColorRellenoSVG($contenidoSVG, $color)
    {
        // Cambiar todos los colores de relleno a un solo color
        $contenidoSVG = preg_replace('/fill="(.*?)"/', 'fill="' . $color . '"', $contenidoSVG);

        return $contenidoSVG;
    }
    private function reducirA2Path($contenidoSVG)
    {
        // Encontrar todos los elementos <path>
        preg_match_all('/<path[^>]*>/', $contenidoSVG, $matches);

        // Mantener solo los dos primeros elementos <path>
        $nuevosPaths = array_slice($matches[0], 0, 2);

        // Reemplazar los elementos <path> originales con los nuevos
        $contenidoSVG = preg_replace('/<path[^>]*>/', implode('', $nuevosPaths), $contenidoSVG);

        return $contenidoSVG;
    }

      
}
