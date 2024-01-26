<!-- resources/views/inspirate/index.blade.php -->

@extends('backend.layouts.master')

@section('main-content')

<div class="card">
    <div class="card-header">
        <h1>Temas</h1>
        <a href="{{ route('inspirate.create') }}" class="btn btn-success float-right">Nuevo Tema</a>
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
                @foreach ($inspirates as $inspirate)
                    <tr>
                        <td><img src="{{ asset($inspirate->url) }}" alt="Inspiración" style="max-width: 100px;"></td>
                        <td>{{ $inspirate->category->image_type }}</td>
                        <td>
                            <a href="{{ route('inspirate.edit', $inspirate->id) }}" class="btn btn-primary btn-sm">Editar</a>
                            <form action="{{ route('inspirate.destroy', $inspirate->id) }}" method="post" style="display:inline;">
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

@endsection
