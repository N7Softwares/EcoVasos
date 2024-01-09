<!-- resources/views/images_categories/edit.blade.php -->

@extends('layouts.app')

@section('content')
    <h1>Editar Categoría</h1>

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
        <label for="image_type">Tipo de Imagen:</label>
        <input type="text" name="image_type" value="{{ $category->image_type }}" required>
        <button type="submit">Actualizar</button>
    </form>
@endsection
