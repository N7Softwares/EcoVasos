<!DOCTYPE html>
<html>
<head>
    <title>Ver PDF</title>
    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <style>
        section{
            padding:40px 0;
        }
    </style>
</head>
<body>
    <section>
    <div class="container">
        <h3 class="text-center mb-3">{{ $pdf->nombre_archivo }}</h3>
        <table class="table table-hover table-striped table-bordered">
            <!-- <thead>
                <tr>
                    <th>Prop</th>
                </tr>
            </thead> -->

                <tr>
                    <td>ID</td>
                    <td>{{$pdf->id_pdf}}</td>
                </tr>
                <tr>
                    <td>Nombre Usuario</td>
                    <td>{{$pdf->nombre_usuario}}</td>
                </tr>
                <tr>
                    <td>Nombre Diseño</td>
                    <td>{{$pdf->nombre_diseno}}</td>
                </tr>
                <tr>
                    <td>Nombre Archivo</td>
                    <td>{{$pdf->nombre_archivo}}</td>
                </tr>
                <tr>
                    <td>Ruta del Archivo</td>
                    <td>storage/app/public/pdf/{{ $pdf->nombre_archivo }}</td>
                </tr>
        </table>
        
    <br>
    <div class="d-flex justify-content-around mt-3">
        
        <a href="{{ route('pdf.download', $pdf->id_pdf) }}" class="btn btn-success ">Descargar PDF</a>
        <a href="{{ route('pdf.index') }}" class="btn btn-primary">Volver a la Lista</a>
        <form action="{{ route('pdf.destroy', $pdf->id_pdf) }}" method="POST" style="display:inline;">
            @csrf
            @method('DELETE')
            <button type="submit" class="btn btn-danger" onclick="return confirm('¿Estás seguro de que deseas eliminar este PDF?')">Eliminar</button>
        </form>
    </div>
    </div>
    </section>
    <!-- Bootstrap -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>

</body>
</html>
