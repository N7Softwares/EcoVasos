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
        $svgString = $request->input('svgString');
    
        // Log::info('SVG String: ' . $svgString);

        $tempFile = tempnam(sys_get_temp_dir(), 'svg');
        file_put_contents($tempFile, $svgString);
    
        $imageName = time() . '_image.svg';
        $newLocation = public_path('images_elements') . '/' . $imageName;
        rename($tempFile, $newLocation);
    
        $imageUrl = 'images_elements/' . $imageName;
    
        Element::create([
            'url' => $imageUrl,
            'category_image_id' => $request->input('category_image_id'),
        ]);
    
        return redirect()->route('elements.index')->with('success', 'Imagen Element creada exitosamente.');
    }
    
    public function edit($id)
    {
        $elements = Element::findOrFail($id);
        $categories = ImagesCategory::all();

        return view('backend.elements.edit', compact('elements', 'categories'));
    }

    public function update(Request $request, $id)
    {
        Log::info('ID RECIBIDO: ' . $id);
        $element = Element::find($id);
    
        $svgString = $request->input('svgString');
    
        Log::info('SVG String: ' . $svgString);
    
        $tempFile = tempnam(sys_get_temp_dir(), 'svg');
        file_put_contents($tempFile, $svgString);
    
        $imageName = time() . '_image.svg';
        $newLocation = public_path('images_elements') . '/' . $imageName;
        rename($tempFile, $newLocation);
    
        $imageUrl = 'images_elements/' . $imageName;
    
        $element->update([
            'url' => $imageUrl,
            'category_image_id' => $request->input('category_image_id'),
        ]);
    
        return redirect()->route('elements.index')->with('success', 'Imagen Element actualizada exitosamente.');
    }
    

    public function destroy($id)
    {
        $elements = Element::findOrFail($id);
        $elements->delete();

        return redirect()->route('elements.index')->with('success', 'Imagen inspiradora eliminada exitosamente.');
    }

}
