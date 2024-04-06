<!-- resources/views/elements/index.blade.php -->

{{-- @extends('backend.layouts.master')

@section('main-content') --}}
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<div class="card">
    <div class="card-header">
        <h1>Elementos</h1>
        <a href="{{ route('elements.create') }}" class="btn btn-success float-right">Crear Elemento</a>
    </div>

    <div class="card-body">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Imagen</th>
                    <th>Categoría</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($elements as $element)
                    <tr>
                        <td><img src="{{ asset($element->url) }}" alt="Inspiración" style="max-width: 100px;"></td>
                        <td>{{ $element->category->image_type }}</td>
                        <td>
                            <a href="{{ route('elements.edit', $element->id) }}" class="btn btn-primary btn-sm">Editar</a>
                            <form action="{{ route('elements.destroy', $element->id) }}" method="post" style="display:inline;">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-danger btn-sm" onclick="return confirm('¿Estás seguro?')">Eliminar</button>
                            </form>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</div>

{{-- @endsection --}}
