<!-- resources/views/images_categories/create.blade.php -->

{{-- @extends('backend.layouts.master')

@section('main-content') --}}
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<div class="card">
    <div class="card-header">
        <h1>Crear Categoría</h1>
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

        <form action="{{ route('images_categories.store') }}" method="post">
            @csrf

            <div class="form-group">
                <label for="image_type">Tipo de Imagen:</label>
                <input type="text" class="form-control" name="image_type" required>
            </div>

            <button type="submit" class="btn btn-primary">Guardar</button>
        </form>
    </div>
</div>
{{-- 
@endsection --}}
