<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use App\Models\Tipografia;

class Modelo3DController extends Controller
{
    public function guardarModelo(Request $request)
    {
        // Obtener los datos JSON de la solicitud
        $jsonData = $request->input('data');
        
        // Generar un nombre de archivo único
        $fileName = 'modelo3d_' . uniqid() . '.json';
        
        // Guardar los datos JSON en el almacenamiento temporal (por ejemplo, en la carpeta 'temp')
        Storage::put('temp/' . $fileName, $jsonData);
        
        // Obtener la fecha y hora actual
        $now = Carbon::now();
        
        // Calcular la fecha y hora de expiración (24 horas después)
        $expiration = $now->addHours(24);
        
        // Almacenar la fecha y hora de expiración en el almacenamiento temporal
        Storage::put('temp/' . $fileName . '.expiration', $expiration);
        
        // Retornar una respuesta, por ejemplo, un enlace para visualizar el modelo
        return response()->json(['success' => true, 'link' => route('modelo3d.visualizar', ['fileName' => $fileName])]);
        // return view('modelo3d.visualizar', ['fileName' => $fileName]);


    }

    public function visualizarModelo($fileName) {
        // Construir la ruta del archivo
        $filePath = storage_path('app/temp/' . $fileName . '.json');
        // echo $filePath;
        // echo "<br>";
        // Verificar si el archivo existe
        $tipografias = Tipografia::all();

        $array = [
            
            'tipografias' => $tipografias
        ];
        if (file_exists($filePath)) {
            // Obtener el contenido del archivo
            $jsonContent = file_get_contents($filePath);
            // echo $jsonContent;
            // die;
            // Pasar los datos del JSON a la vista
            return view('frontend.pages.modelo3d', ['jsonContent' => $jsonContent], compact('array'));
        } else {
            // Manejar el caso en que el archivo no existe
            abort(404, 'El archivo JSON no fue encontrado');
        }
    }
    
    
    
    
}
