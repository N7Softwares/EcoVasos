<?php

namespace App\Http\Controllers;

use App\Models\Tipografia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class TipografiaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tipografias = Tipografia::all();
        return view('tipografias.index', compact('tipografias'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('tipografias.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    
    public function store(Request $request)
    {
        // Validación de la solicitud
        $request->validate([
            'name' => 'required',
            'file_path' => 'required|file|max:4096|', // Añade las extensiones que necesites
        ]);
    
        // Procesamiento del archivo
        $file = $request->file('file_path');
    
        // Verificar el tamaño del archivo
        $maxFileSize = 4096; // Tamaño máximo en kilobytes (4 MB)
        if ($file->getSize() > $maxFileSize * 1024) {
            return redirect()->route('tipografias.create')->with('error', 'El tamaño del archivo excede el límite permitido (4 MB).');
        }
    
        // Procesamiento del archivo y almacenamiento en la carpeta public/fonts/
        $fileName = $file->getClientOriginalName(); // Obtener el nombre original del archivo
        $fileExtension = $file->getClientOriginalExtension(); // Obtener la extensión del archivo
    
        // Definir la ruta donde se almacenará el archivo en public/fonts/
        $filePath = 'fonts/' . $fileName;
    
        // Mover el archivo al directorio correspondiente
        $file->move(public_path('fonts'), $fileName);
    
        // Crear un nuevo registro en la base de datos
        Tipografia::create([
            'name' => $request->input('name'),
            'file_path' => $filePath, // Almacenar la ruta en la base de datos
        ]);
    
        // Redireccionamiento después del éxito
        return redirect()->route('tipografias.index')->with('success', 'Tipografía añadida exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // Obtener la tipografía por su ID
        $tipografia = Tipografia::findOrFail($id);

        // Mostrar el formulario de edición con los detalles actuales de la tipografía
        return view('tipografias.edit', compact('tipografia'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Validación de la solicitud
        $request->validate([
            'name' => 'required',
            'file_path' => 'file|max:4096', // Añade las extensiones que necesites
        ]);

        // Obtener la tipografía por su ID
        $tipografia = Tipografia::findOrFail($id);

        // Obtener la ruta del archivo anterior
        $oldFilePath = $tipografia->file_path;

        // Actualizar el nombre de la tipografía
        $tipografia->update([
            'name' => $request->input('name'),
        ]);

        // Si se proporciona un nuevo archivo, eliminar el archivo anterior, actualizar la ruta del nuevo archivo
        if ($request->hasFile('file_path')) {
            // Eliminar el archivo anterior
            if (File::exists(public_path($oldFilePath))) {
                File::delete(public_path($oldFilePath));
            }

            $file = $request->file('file_path');
            $fileName = $file->getClientOriginalName();
            $filePath = 'fonts/' . $fileName;
            $file->move(public_path('fonts'), $fileName);
            
            // Actualizar la ruta del archivo en la base de datos
            $tipografia->update([
                'file_path' => $filePath,
            ]);
        }

        // Redireccionar después de la actualización
        return redirect()->route('tipografias.index')->with('success', 'Tipografía actualizada exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Obtener la tipografía por su ID
        $tipografia = Tipografia::findOrFail($id);

        // Obtener la ruta del archivo
        $filePath = $tipografia->file_path;

        // Eliminar la tipografía de la base de datos
        $tipografia->delete();

        // Verificar y eliminar el archivo en public/fonts/
        if (File::exists(public_path($filePath))) {
            File::delete(public_path($filePath));
        }

        // Redireccionar después de la eliminación
        return redirect()->route('tipografias.index')->with('success', 'Tipografía eliminada exitosamente.');
    }
}
