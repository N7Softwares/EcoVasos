<!-- resources/views/inspirate/edit.blade.php -->

@extends('backend.layouts.master')

@section('main-content')
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{asset('frontend/css/n7styles.css')}}">
</head>

<body>
    <div class="card">
        <div class="card-header">
            <h1>Editar Elemento</h1>
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
            <div id="root">
                <div class="grid-base">
                    <div class="grid-main">
                        <div class="grid-canvas">
                            <div class="grid-canvas-inner">
                                <div class="browse-btn-wrapper">
                                    <div><input type="file" accept="image/png,image/jpeg,image/jpg,image/svg+xml" multiple="" name="image"
                                            style="display: none;">
                                        <div class="files-dropzone-list">
                                            <button class="btn-wrap">
                                            </button></div>
                                    </div>
                                </div>
                                <div id="reduceSvg" style="display: none;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <form action="{{ route('elements.update', $elements->id) }}" method="post" enctype="multipart/form-data">
                @csrf
                @method('PUT')

                <input type="hidden" id="svgString" name="svgString">

                <div class="form-group">
                    <label for="category_image_id">Categoría:</label>
                    <select class="form-control" name="category_image_id" required>
                        @foreach ($categories as $category)
                            <option value="{{ $category->id }}" {{ $elements->category_image_id == $category->id ? 'selected' : '' }}>
                                {{ $category->image_type }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <button type="submit" id="sendForm" class="btn btn-primary">Guardar</button>
            </form>
        </div>
    </div>
    <script>
        document.addEventListener("DOMContentLoaded", () => {
            document.getElementById('sendForm').addEventListener('click', ()=> {
                let svgElement = document.getElementById('svgContent');
                let svgString = new XMLSerializer().serializeToString(svgElement);
                document.getElementById('svgString').value = svgString;
            });
        });
    </script>
    <script src="{{asset('js/scope/runtime-main.11747796.js')}}"></script>
    <script src="{{asset('js/scope/2.3a3362a2.chunk.js')}}"></script>
    <script src="{{asset('js/scope/main.f169c95d.chunk.js')}}"></script>

</body>

</html>
@endsection
