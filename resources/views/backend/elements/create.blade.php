<!-- resources/views/inspirate/create.blade.php -->

{{-- @extends('backend.layouts.master')

@section('main-content') --}}
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{asset('frontend/css/n7styles.css')}}">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>
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
            <form action="{{ route('elements.store') }}" method="post" enctype="multipart/form-data">
                @csrf
                <input type="hidden" id="svgString" name="svgString">

                <div class="form-group">
                    <label for="category_image_id">Categoría:</label>
                    <select class="form-control" name="category_image_id" required>
                        @foreach ($categories as $category)
                            <option value="{{ $category->id }}">{{ $category->image_type }}</option>
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
     <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="{{asset('js/scope/runtime-main.11747796.js')}}"></script>
    <script src="{{asset('js/scope/2.3a3362a2.chunk.js')}}"></script>
    <script src="{{asset('js/scope/main.f169c95d.chunk.js')}}"></script>
</body>

</html>
{{-- @endsection --}}
