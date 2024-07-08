<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pdf;
use App\Models\PdfHerramienta;
use Illuminate\Support\Facades\Log;
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

    public function uploadPdf(Request $request)
    {
        Log::info('uploadPdf called.');
    
        // Validación de los datos recibidos
        $request->validate([
            'nombre_usuario' => 'required|string|max:255',
            'nombre_pdf' => 'required|string|max:255',
            'pdf' => 'required|file|mimes:pdf'
        ]);
    
        // Obtención de los datos del formulario
        $nombre_usuario = $request->input('nombre_usuario');
        $nombre_diseno = $request->input('nombre_pdf');
        $pdf = $request->file('pdf');
    
        // Registro del nombre del PDF recibido
        Log::info('PDF received: ' . $pdf->getClientOriginalName());
    
        // Generación de un nombre único para el archivo PDF
        $pdfName = str_replace(' ', '_', $nombre_usuario . '-' . $nombre_diseno . '-' . uniqid() . '.pdf');
    
        // Ruta final deseada en la carpeta public/pdf/
        $finalPdfPath = public_path('pdf/' . $pdfName);
    
        // Almacenamiento del PDF en la carpeta public/pdf/
        if (!$pdf->move(public_path('pdf'), $pdfName)) {
            Log::error('Failed to move PDF to public/pdf/');
            return response()->json(['error' => 'Error al guardar el archivo PDF.'], 500);
        }
    
        // Registro de la ubicación donde se almacenó el PDF
        Log::info('PDF stored at: ' . $finalPdfPath);
    
        // Guardado de los detalles del PDF en la base de datos
        try {
            $pdfEntry = PdfHerramienta::create([
                'nombre_usuario' => $nombre_usuario,
                'nombre_diseno' => $nombre_diseno,
                'nombre_archivo' => $pdfName, // Guardar solo el nombre del archivo
            ]);
    
            Log::info('PDF entry created in database.');
    
            // Generación del enlace para ver el PDF
            $link = url('pdf/' . $pdfName);
    
            return response()->json([
                'message' => 'PDF subido correctamente.',
                'link' => $link
            ]);
        } catch (\Exception $e) {
            Log::error('Error al guardar los detalles del PDF en la base de datos: ' . $e->getMessage());
            return response()->json(['error' => 'Error al guardar los detalles del PDF en la base de datos.'], 500);
        }
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