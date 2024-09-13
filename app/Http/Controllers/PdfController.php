<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pdf;
use App\Models\PdfHerramienta;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use setasign\Fpdi\Fpdi;
use setasign\FpdiProtection\FpdiProtection;

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
    //=================================PDF CON CONTRASEÑA=================================================

    public function agregarProteccionPdf(Request $request)
    {
        // Validar que el archivo PDF sea enviado en el request
        $request->validate([
            'pdf' => 'required|file|mimes:pdf',
        ]);
    
        // Obtener el PDF subido
        $pdfFile = $request->file('pdf');
        $pdfInputPath = $pdfFile->getPathname(); // Ruta temporal del PDF
        $pdfOutputPath = public_path('pdfs-clientes/creacion-personalizada.pdf'); // Ruta donde se guardará el PDF protegido en public
    
        // Contraseñas para proteger el PDF
        $userPassword = 'ecoingenio2024'; // Contraseña para abrir el PDF
        $ownerPassword = 'ownerpass'; // Contraseña del propietario
    
        // Lógica para agregar la contraseña al PDF
        $this->protegerPdf($pdfInputPath, $pdfOutputPath, $userPassword, $ownerPassword);
    
        // Forzar la descarga del archivo PDF
        return response()->download($pdfOutputPath, 'creacion-personalizada.pdf', [
            'Content-Type' => 'application/pdf',
        ]);
    }
    
    
    
    private function protegerPdf($pdfInputPath, $pdfOutputPath, $userPassword, $ownerPassword)
    {
        // Crear una instancia de FPDI Protection para modificar el PDF
        $pdf = new FpdiProtection();

        // Cargar el PDF existente
        $pageCount = $pdf->setSourceFile($pdfInputPath);

        // Copiar todas las páginas del PDF original
        for ($pageNo = 1; $pageNo <= $pageCount; $pageNo++) {
            $templateId = $pdf->importPage($pageNo);
            $size = $pdf->getTemplateSize($templateId);

            // Crear una página nueva con el tamaño original
            $pdf->AddPage($size['orientation'], [$size['width'], $size['height']]);

            // Usar el template importado
            $pdf->useTemplate($templateId);
        }

        // Configurar las opciones de protección del PDF
        $permissions = [
            'modify',            // Permitir modificaciones
            'copy',              // Permitir copiar contenido
            'print',             // Permitir impresión
            'annot-forms'        // Permitir anotaciones y formularios
        ];

        // Establecer la contraseña del usuario y del propietario
        $pdf->setProtection($permissions, $userPassword, $ownerPassword);

        // Guardar el PDF protegido con contraseña
        $pdf->Output($pdfOutputPath, 'F');
    }
}