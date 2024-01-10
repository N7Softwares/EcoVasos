<!-- resources/views/inspirate/edit.blade.php -->

@extends('layouts.app')

@section('content')
    <h1>Editar Imagen Inspiradora</h1>

    @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{ route('inspirate.update', $inspirate->id) }}" method="post" enctype="multipart/form-data">
        @csrf
        @method('PUT')
        
        <label for="image">Imagen:</label>
        <input type="file" name="image" accept="image/*">

        <label for="category_image_id">Categoría:</label>
        <select name="category_image_id" required>
            @foreach ($categories as $category)
                <option value="{{ $category->id }}" {{ $inspirate->category_image_id == $category->id ? 'selected' : '' }}>
                    {{ $category->image_type }}
                </option>
            @endforeach
        </select>

        <button type="submit">Guardar</button>
    </form>
@endsection
