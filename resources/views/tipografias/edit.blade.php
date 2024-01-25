@extends('layouts.app') <!-- Ajusta esto según tu estructura de plantilla principal -->

@section('content')
    <div class="container">
        <h2>Editar Tipografía</h2>

        <form action="{{ route('tipografias.update', $tipografia->id) }}" method="POST" enctype="multipart/form-data">
            @csrf
            @method('PUT')

            <!-- Campo para el nombre de la fuente -->
            <div class="form-group">
                <label for="name">Nombre de la Fuente:</label>
                <input type="text" name="name" class="form-control" value="{{ old('name', $tipografia->name) }}" required>
            </div>

            <!-- Campo para cargar el nuevo archivo de la fuente -->
            <div class="form-group">
                <label for="file_path">Nuevo Archivo de la Fuente:</label>
                <input type="file" name="file_path" class="form-control" accept=".ttf, .otf, .woff, .woff2, .eot">
            </div>

            <!-- Botón para enviar el formulario -->
            <button type="submit" class="btn btn-success">Guardar Cambios</button>
        </form>

        <!-- Botón para volver a la lista de tipografías -->
        <a href="{{ route('tipografias.index') }}" class="btn btn-secondary mt-2">Volver a la Lista</a>
    </div>
@endsection
