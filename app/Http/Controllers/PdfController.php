<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pdf;
use Illuminate\Support\Facades\Storage;

class PdfController extends Controller
{
    public function index()
    {
        $pdfs = Pdf::all(); // Asegúrate de usar el modelo Pdf
        return view('backend.pdf.index', compact('pdfs'));
    }
    public function create()
    {
        return view('frontend.pages.create-pdf');
    }

    public function store(Request $request)
    {
        // Validar la solicitud
        $request->validate([
            'nombre_usuario' => 'required|string|max:255',
            'nombre_pdf' => 'required|string|max:255',
            'pdf_file' => 'required|file|mimes:pdf|max:16384', // 16 MB
        ]);

        // Obtener los datos del formulario
        $nombre_usuario = $request->input('nombre_usuario');
        $nombre_diseno = $request->input('nombre_pdf');
        $pdf_file = $request->file('pdf_file');

        // Generar el nombre del archivo sin espacios, reemplazando espacios por guiones bajos
        $nombre_archivo = str_replace(' ', '_', $nombre_usuario . '-' . $nombre_diseno . '-' . uniqid() . '.' . $pdf_file->getClientOriginalExtension());

        // Guardar el archivo en la carpeta public/storage/pdf
        $path = $pdf_file->storeAs('public/pdf', $nombre_archivo);

        // Crear un nuevo registro en la base de datos
        $pdf = Pdf::create([
            'nombre_usuario' => $nombre_usuario,
            'nombre_diseno' => $nombre_diseno,
            'nombre_archivo' => $nombre_archivo,
        ]);

        // Generar el enlace para ver el PDF
        $link = route('pdf.view', ['filename' => $pdf->nombre_archivo]);

        // Retornar una respuesta JSON
        return response()->json([
            'message' => 'PDF subido correctamente. Enlace Copiado al Portapapeles',
            'link' => $link
        ]);
    }


    public function view($filename)
    {
        $pdf = Pdf::where('nombre_archivo', $filename)->firstOrFail();
        return view('backend.pdf.view', compact('pdf'));
    }

    public function download($id)
    {
        $pdf = Pdf::findOrFail($id);
        $filePath = 'public/pdf/' . $pdf->nombre_archivo;
        return Storage::download($filePath);
    }

    public function destroy($id)
    {
        // Buscar el registro en la base de datos
        $pdf = Pdf::findOrFail($id);
        $filePath = 'public/pdf/' . $pdf->nombre_archivo;

        // Eliminar el archivo del sistema de almacenamiento
        if (Storage::exists($filePath)) {
            Storage::delete($filePath);
        }

        // Eliminar el registro de la base de datos
        $pdf->delete();
    
        return redirect()->route('pdf.index')->with('success', 'PDF eliminado correctamente');  
    }
}