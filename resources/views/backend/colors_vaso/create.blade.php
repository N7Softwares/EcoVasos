<!-- resources/views/colors_vaso/create.blade.php -->

@extends('backend.layouts.master')

@section('main-content')

<div class="card">
<div class="container">

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
    <h1>Crear Nuevo Color</h1>

    <form action="{{ route('colors.store') }}" method="post">
        @csrf
        
        <label for="name">Nombre:</label>
        <input type="text" name="name" id="name" required>
        <br>

        <label for="hex_code">Código Hex:</label>
        <input type="text" name="hex_code" id="hex_code" placeholder="#fafafa" required>
        <br>

        <label for="rgb_code">Código RGB:</label>
        <input type="text" name="rgb_code" id="rgb_code" placeholder="0,0,0" required>
        <br>
        <label for="colors_category_id">Seleccione la categoría del color:</label>
        <select name="colors_category_id" id="colors_category_id">
            @foreach($categories as $category)
                <option value="{{ $category->id }}">{{ $category->descripcion }}</option>
            @endforeach
        </select>
        <br>
        <label for="colorPreview">Previsualización:</label>
        <div id="colorPreview" style="width: 200px; height: 50px; border:1px solid #000; margin: 10px; display: flex; align-items: center; justify-content: center;"></div>

        <button class="btn btn-success" type="submit">Guardar</button>
    </form>
    <div class="" style="padding-top:20px;">
        <a href="{{ route('colors.index') }}" class="btn btn-primary">Lista de Colores</a>
    </div>
</div>

    <script>
    document.addEventListener('DOMContentLoaded', () => {
        const colorPreview = document.getElementById('colorPreview');

        // Función para sincronizar Hex a RGB
        document.getElementById('hex_code').addEventListener('input', () => {
            const hexValue = document.getElementById('hex_code').value;
            const rgbValue = hexToRgb(hexValue);
            document.getElementById('rgb_code').value = rgbValue;
            updateColorPreview(rgbValue);
        });

        // Función para sincronizar RGB a Hex
        document.getElementById('rgb_code').addEventListener('input', () => {
            const rgbValue = document.getElementById('rgb_code').value;
            const hexValue = rgbToHex(rgbValue);
            document.getElementById('hex_code').value = hexValue;
            updateColorPreview(rgbValue);
        });

        // Función para actualizar la vista previa de color
        const updateColorPreview = (rgbValue) => {
            if (isValidColor(rgbValue)) {
                colorPreview.style.backgroundColor = `rgb(${rgbValue})`;
                colorPreview.textContent = ''; // Limpiar el mensaje si el color es válido
            } else {
                colorPreview.style.backgroundColor = 'white'; // Color de fondo blanco si el color no es válido
                colorPreview.textContent = 'Color No Existente';
            }
        };

        // Función para verificar si un color es válido
        const isValidColor = (rgbValue) => {
            const [r, g, b] = rgbValue.split(',').map(Number);
            return !isNaN(r) && !isNaN(g) && !isNaN(b) && r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255;
        };

        // Función para convertir Hex a RGB
        const hexToRgb = (hex) => {
            const bigint = parseInt(hex.substring(1), 16);
            const r = (bigint >> 16) & 255;
            const g = (bigint >> 8) & 255;
            const b = bigint & 255;
            return `${r}, ${g}, ${b}`;
        };

        // Función para convertir RGB a Hex
        const rgbToHex = (rgb) => {
            const [r, g, b] = rgb.split(',').map(Number);
            const hex = ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
            return `#${hex}`;
        };
    });
    </script>

</div>

@endsection

