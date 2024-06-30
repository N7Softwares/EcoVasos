<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de PDFs</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <style>
        .gap-3{
            gap:5px;
        }
    </style>
</head>
<body>
    <div class="container mt-5">
        <h1 class="text-center">Lista de PDFs</h1>
        <div class="mb-3">
            <a href="{{ route('pdf.create')}}" class="btn btn-primary">Agregar Nuevo PDF</a>

        </div>
        @if(session('success'))
            <div class="alert alert-success">
                {{ session('success') }}
            </div>
        @endif
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre de Usuario</th>
                    <th>Nombre del Diseño</th>
                    <th>Nombre del Archivo</th>
                    <th>Ruta del PDF</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                @foreach($pdfs as $pdf)
                    <tr>
                        <td>{{ $pdf->id_pdf }}</td>
                        <td>{{ $pdf->nombre_usuario }}</td>
                        <td>{{ $pdf->nombre_diseno }}</td>
                        <td>{{ $pdf->nombre_archivo }}</td>
                        <td>storage/app/public/pdf/{{ $pdf->nombre_archivo }}</td>
                        <td class="d-flex flex-column align-items-center gap-3">
                            <a href="{{ route('pdf.view',  $pdf->nombre_archivo)}}" class="btn btn-primary">Ver PDF</a>
                            
                            <a href="{{ route('pdf.download', $pdf->id_pdf) }}" class="btn btn-success ">Descargar PDF</a>

                            <form action="{{ route('pdf.destroy', $pdf->id_pdf) }}" method="POST" style="display:inline;">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-danger" onclick="return confirm('¿Estás seguro de que deseas eliminar este PDF?')">Eliminar</button>
                            </form>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</body>
</html>
