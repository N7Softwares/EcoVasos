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
{public function index()
    {
        $inspirates = Inspirate::all();
        $colors = Color::all();
        $tipografias = Tipografia::all();
        
        // Obtener las categorías ordenadas por 'order' y cargar sus elementos ya ordenados
        $categories = ImagesCategory::orderBy('order', 'asc')
            ->with(['elements' => function ($query) {
                $query->orderBy('created_at', 'desc'); // Cambia 'created_at' si necesitas otro criterio
            }])
            ->get()
            ->filter(function ($category) {
                return $category->elements->isNotEmpty(); // Filtra las categorías que tienen al menos un elemento
            });
    
        // Pasar los datos a la vista en un solo array
        $array = [
            'inspirates' => $inspirates,
            'colors' => $colors,
            'tipografias' => $tipografias,
            'categories' => $categories, // Solo con categorías que tienen elementos
        ];
    
        return view('frontend.pages.disenio2', compact('array'));
    }
    
    
    
    
    public function guardarSVG(Request $request)
    {
        // Obtener el contenido del SVG
        $contenidoSVG = $request->svg;
    
        // Cambiar el color de relleno si es necesario
        $contenidoSVG = $this->cambiarColorRellenoSVG($contenidoSVG, 'black');
    
        // Reducir el SVG si es necesario (ej. simplificar el path)
        $contenidoSVG = $this->reducirA2Path($contenidoSVG);
        
        // Ajustar el tamaño del SVG a 200x200
        $contenidoSVG = $this->ajustarTamanioSVG($contenidoSVG, 1000, 1000); // Ajustar a 200x200
    
        // Devolver el contenido del SVG modificado
        return response($contenidoSVG, 200, ['Content-Type' => 'image/svg+xml']);
    }
    
    /**
     * Función para ajustar el tamaño del SVG
     */
    private function ajustarTamanioSVG($contenidoSVG, $ancho, $alto)
    {
        // Cargar el SVG en un objeto DOMDocument
        $dom = new \DOMDocument();
        $dom->loadXML($contenidoSVG);
    
        // Buscar el nodo <svg> para modificar los atributos width y height
        $svgElement = $dom->getElementsByTagName('svg')->item(0);
    
        // Establecer los nuevos atributos width y height si no existen o modificarlos
        if ($svgElement) {
            $svgElement->setAttribute('width', $ancho);
            $svgElement->setAttribute('height', $alto);
        }
    
        // Devolver el SVG modificado como string
        return $dom->saveXML($dom->documentElement);
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
    
        // Eliminar todos los elementos <path> del SVG original
        $contenidoSVG = preg_replace('/<path[^>]*>/', '', $contenidoSVG);
    
        // Insertar los dos primeros elementos <path> en el SVG
        $contenidoSVG = str_replace('</svg>', implode('', $nuevosPaths) . '</svg>', $contenidoSVG);
    
        return $contenidoSVG;
    }
    

      
}
