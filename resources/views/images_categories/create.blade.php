<!-- resources/views/images_categories/create.blade.php -->

@extends('layouts.app')

@section('content')
    <h1>Crear Categoría</h1>

    @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{ route('images_categories.store') }}" method="post">
        @csrf
        <label for="image_type">Tipo de Imagen:</label>
        <input type="text" name="image_type" required>
        <button type="submit">Guardar</button>
    </form>
@endsection
