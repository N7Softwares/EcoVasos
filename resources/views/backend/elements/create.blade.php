<!-- resources/views/inspirate/create.blade.php -->

@extends('backend.layouts.master')

@section('main-content')

<div class="card">
    <div class="card-header">
        <h1>Crear Elemento</h1>
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

        @if (session('success'))
            <div class="alert alert-success">
                {{ session('success') }}
            </div>
        @endif

        <form action="{{ route('elements.store') }}" method="post" enctype="multipart/form-data">
            @csrf

            <div class="form-group">
                <label for="image">Imagen (Solo subir imagenes SVG):</label>
                <input type="file" class="form-control-file" name="image" accept=".svg" required>
            </div>

            <div class="form-group">
                <label for="category_image_id">Categoría:</label>
                <select class="form-control" name="category_image_id" required>
                    @foreach ($categories as $category)
                        <option value="{{ $category->id }}">{{ $category->image_type }}</option>
                    @endforeach
                </select>
            </div>

            <button type="submit" class="btn btn-primary">Guardar</button>
        </form>
    </div>
</div>

@endsection
