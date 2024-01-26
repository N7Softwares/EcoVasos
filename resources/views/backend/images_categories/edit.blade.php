<!-- resources/views/images_categories/edit.blade.php -->

@extends('backend.layouts.master')

@section('main-content')

<div class="card">
    <div class="card-header">
        <h1>Editar Categoría</h1>
    </div>

    <div class="card-body">
        @if ($errors->any())
            <div class="alert alert-danger">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form action="{{ route('images_categories.update', $category->id) }}" method="post">
            @csrf
            @method('PUT')

            <div class="form-group">
                <label for="image_type">Tipo de Imagen:</label>
                <input type="text" class="form-control" name="image_type" value="{{ $category->image_type }}" required>
            </div>

            <button type="submit" class="btn btn-primary">Actualizar</button>
        </form>
    </div>
</div>

@endsection