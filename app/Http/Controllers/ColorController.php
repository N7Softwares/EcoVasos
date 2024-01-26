<?php

namespace App\Http\Controllers;

use App\Models\Color;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ColorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $colors = Color::all(); // Obtener todos los colores
        return view('backend.colors_vaso.index', compact('colors'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('backend.colors_vaso.create');
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
        $color = Color::find($id); // Obtener el color por ID
        return view('backend.colors_vaso.edit', compact('color'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
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
