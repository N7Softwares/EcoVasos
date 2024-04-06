<?php

namespace App\Http\Controllers;

use App\Models\Color;
use App\Models\ColorsCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
class ColorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $colors = Color::all(); // Obtener todos los colores
        $categories = ColorsCategory::all(); 
        return view('backend.colors_vaso.index', compact('colors', 'categories'));
    }
    public function indexApi()
    {
        $colors = Color::all();
        return response()->json($colors);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = ColorsCategory::all(); 
        return view('backend.colors_vaso.create', compact('categories'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Color::create($request->all());

        // return redirect()->route('colors.index')->with('success', 'Color almacenado exitosamente.');
        return redirect()->route('colors.create')->with('success', 'Color almacenado exitosamente.');

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Por ahora no
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $color = Color::with('category')->find($id); // Cargar la relación category
        $categories = ColorsCategory::all(); 
        return view('backend.colors_vaso.edit', compact('color', 'categories'));
    }    

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Log::info('Request data: ' . json_encode($request->all(), JSON_PRETTY_PRINT));
        $color = Color::find($id);
        $color->update($request->all());

        return redirect()->route('colors.index')->with('success', 'Color actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Lógica para eliminar el color con el ID proporcionado
    $color = Color::findOrFail($id);
    $color->delete();

    // Redirigir o realizar cualquier acción necesaria después de la eliminación
    return redirect()->route('colors.index')->with('success', 'Color eliminado exitosamente.');
    }
}
