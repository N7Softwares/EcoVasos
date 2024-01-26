@extends('backend.layouts.master')

@section('main-content')

<div class="card">
    <div class="container">
        <h2>Crear Nueva Tipografía</h2>

        <form action="{{ route('tipografias.store') }}" method="POST" enctype="multipart/form-data">
            @csrf

            <!-- Campo para el nombre de la fuente -->
            <div class="form-group">
                <label for="name">Nombre de la Fuente:</label>
                <input type="text" name="name" class="form-control" required>
            </div>

            <!-- Campo para cargar el archivo de la fuente -->
            <div class="form-group">
                <label for="file_path">Archivo de la Fuente:</label>
                <input type="file" name="file_path" class="form-control" accept=".ttf, .otf" required>
            </div>

            <!-- Botón para enviar el formulario -->
            <button type="submit" class="btn btn-primary">Guardar Tipografía</button>
        </form>

        <!-- Botón para volver a la lista de tipografías -->
        <a href="{{ route('tipografias.index') }}" class="btn btn-secondary mt-2">Volver a la Lista</a>
    </div>
</div>

@endsection
