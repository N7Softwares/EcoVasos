<?php

// app/Http/Controllers/ElementController.php

namespace App\Http\Controllers;

use App\Models\Element;
use App\Models\ImagesCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class ElementController extends Controller
{
    public function index()
    {
        $elements = Element::all();

        return view('backend.elements.index', compact('elements'));
    }

    public function indexApi()
    {
        $elements = Element::all();

        return response()->json($elements);
    }

    public function show($id)
    {
        $elements = Element::findOrFail($id);

        return view('backend.elements.show', compact('elements'));
    }
    public function create()
    {
        $categories = ImagesCategory::all();

        return view('backend.elements.create', compact('categories'));
    }

    public function store(Request $request)
    {
        // Obtener el contenido SVG desde el formulario
        $svgString = $request->input('svgString');
    
        // Generar un nombre único para el archivo SVG
        $imageName = time() . '_image.svg';
    
        // Ruta final deseada en public_html/images_elements/
        $finalImagePath = base_path('public_html/images_elements/' . $imageName);
    
        // Asegurarse de que la carpeta public_html/images_elements exista antes de guardar el archivo
        if (!is_dir(base_path('public_html/images_elements'))) {
            mkdir(base_path('public_html/images_elements'), 0755, true); // Crear la carpeta si no existe
        }
    
        // Guardar el contenido SVG en el archivo
        file_put_contents($finalImagePath, $svgString);
    
        // Registrar la ubicación del archivo guardado en los logs
        Log::info('SVG stored at: ' . $finalImagePath);
    
        // Crear la entrada en la base de datos
        $imageUrl = 'images_elements/' . $imageName;
    
        try {
            Element::create([
                'url' => $imageUrl, // Guardar solo el nombre relativo del archivo
                'category_image_id' => $request->input('category_image_id'),
            ]);
    
            Log::info('SVG entry created in database.');
    
            // Redirigir con un mensaje de éxito
            return redirect()->route('elements.index')->with('success', 'Imagen Element creada exitosamente.');
        } catch (\Exception $e) {
            Log::error('Error al guardar los detalles del SVG en la base de datos: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Error al guardar los detalles del SVG en la base de datos.');
        }
    }

    
    
    public function edit($id)
    {
        $elements = Element::findOrFail($id);
        $categories = ImagesCategory::all();

        return view('backend.elements.edit', compact('elements', 'categories'));
    }

    public function update(Request $request, $id)
    {
        // Buscar el elemento por su ID
        $element = Element::find($id);
        if (!$element) {
            return redirect()->back()->with('error', 'El elemento no existe.');
        }
    
        // Obtener el contenido SVG desde el formulario
        $svgString = $request->input('svgString');
    
        // Generar un nombre único para el archivo SVG
        $imageName = time() . '_image.svg';
    
        // Ruta final deseada en public_html/images_elements/
        $finalImagePath = base_path('public_html/images_elements/' . $imageName);
    
        // Asegurarse de que la carpeta public_html/images_elements exista antes de guardar el archivo
        if (!is_dir(base_path('public_html/images_elements'))) {
            mkdir(base_path('public_html/images_elements'), 0755, true); // Crear la carpeta si no existe
        }
    
        // Guardar el contenido SVG en el archivo
        file_put_contents($finalImagePath, $svgString);
    
        // Registrar la ubicación del archivo guardado en los logs
        Log::info('SVG updated and stored at: ' . $finalImagePath);
    
        // Actualizar la entrada en la base de datos
        $imageUrl = 'images_elements/' . $imageName;
    
        try {
            $element->update([
                'url' => $imageUrl, // Guardar solo el nombre relativo del archivo
                'category_image_id' => $request->input('category_image_id'),
            ]);
    
            Log::info('SVG entry updated in database.');
    
            // Redirigir con un mensaje de éxito
            return redirect()->route('elements.index')->with('success', 'Imagen Element actualizada exitosamente.');
        } catch (\Exception $e) {
            Log::error('Error al actualizar los detalles del SVG en la base de datos: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Error al actualizar los detalles del SVG en la base de datos.');
        }
    }

    

    public function destroy($id)
    {
        $elements = Element::findOrFail($id);
        $elements->delete();

        return redirect()->route('elements.index')->with('success', 'Imagen inspiradora eliminada exitosamente.');
    }

}
