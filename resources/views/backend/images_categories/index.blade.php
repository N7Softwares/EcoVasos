<!-- resources/views/images_categories/index.blade.php -->
{{-- 
@extends('backend.layouts.master')

@section('main-content') --}}
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<div class="card">
    <div class="card-header">
        <h1>Lista de Categorías</h1>
        <a href="{{ route('images_categories.create') }}" class="btn btn-success float-right">Nueva Categoría</a>
    </div>

    <div class="card-body">
        <ul class="list-group">
            @foreach ($categories as $category)
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    {{ $category->image_type }}
                    <div>
                        <a href="{{ route('images_categories.edit', $category->id) }}" class="btn btn-primary btn-sm">Editar</a>
                        <form action="{{ route('images_categories.destroy', $category->id) }}" method="post" style="display: inline;">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-danger btn-sm" onclick="return confirm('¿Estás seguro de eliminar esta categoría?')">Eliminar</button>
                        </form>
                    </div>
                </li>
            @endforeach
        </ul>
    </div>
</div>

{{-- @endsection --}}
