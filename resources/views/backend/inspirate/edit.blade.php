<!-- resources/views/inspirate/edit.blade.php -->

@extends('backend.layouts.master')

@section('main-content')

<div class="card">
    <div class="card-header">
        <h1>Editar Tema</h1>
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

        <form action="{{ route('inspirate.update', $inspirate->id) }}" method="post" enctype="multipart/form-data">
            @csrf
            @method('PUT')

            <div class="form-group">
                <label for="image">Imagen:</label>
                <input type="file" class="form-control-file" name="image" accept="image/*">
            </div>

            <div class="form-group">
                <label for="category_image_id">Categoría:</label>
                <select class="form-control" name="category_image_id" required>
                    @foreach ($categories as $category)
                        <option value="{{ $category->id }}" {{ $inspirate->category_image_id == $category->id ? 'selected' : '' }}>
                            {{ $category->image_type }}
                        </option>
                    @endforeach
                </select>
            </div>

            <button type="submit" class="btn btn-primary">Guardar</button>
        </form>
    </div>
</div>

@endsection
