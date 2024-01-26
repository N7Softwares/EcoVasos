@extends('backend.layouts.master')

@section('main-content')

<div class="card">
    <div class="container">
        <h2>Lista de Tipografías</h2>
        <!-- Botón para crear un nuevo registro -->
        <a href="{{ route('tipografias.create') }}" class="btn btn-success mt-3 mb-3">Cargar Nueva Tipografía</a>
        @if(count($tipografias) > 0)
            <table class="table table-hover table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Ruta del Archivo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($tipografias as $tipografia)
                        <tr>
                            <td>{{ $tipografia->id }}</td>
                            <td>{{ $tipografia->name }}</td>
                            <td>{{ $tipografia->file_path }}</td>
                            <td class="d-flex justify-content-around">
                                <!-- Coloca aquí los enlaces para editar y eliminar según tus rutas -->
                                <a class="btn btn-primary" href="{{ route('tipografias.edit', $tipografia->id) }}">Editar</a>
                                <form action="{{ route('tipografias.destroy', $tipografia->id) }}" method="POST">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-danger" onclick="return confirm('¿Estás seguro?')">Eliminar</button>
                                </form>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        @else
            <p>No hay tipografías registradas.</p>
        @endif
        

    </div>
</div>

@endsection
