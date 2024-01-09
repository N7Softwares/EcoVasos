<!-- resources/views/inspirate/create.blade.php -->

@extends('layouts.app')

@section('content')
    <h1>Crear Imagen Inspiradora</h1>

    @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    @if (session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
    @endif

    <form action="{{ route('inspirate.store') }}" method="post" enctype="multipart/form-data">
        @csrf
        <label for="image">Imagen:</label>
        <input type="file" name="image" accept="image/*" required>
        
        <label for="category_image_id">Categoría:</label>
        <select name="category_image_id" required>
            @foreach ($categories as $category)
                <option value="{{ $category->id }}">{{ $category->image_type }}</option>
            @endforeach
        </select>

        <button type="submit">Guardar</button>
    </form>
@endsection
