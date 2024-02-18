<!-- resources/views/colors_vaso/index.blade.php -->

@extends('backend.layouts.master')

@section('main-content')

<div class="card">
<div class="container">

    <h1>Lista de Colores</h1>
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
    <div class="" style="padding:30px;">
        <a href="{{ route('colors.create') }}" class="btn btn-primary">Agregar Nuevo Color</a>
    </div>
    <div class="d-flex justify-content-around" style="flex-wrap:wrap; gap:20px;">
    @if(count($colors) > 0)
    @foreach($colors as $color)
    <div class="color-container border bg-white" style="padding:10px; border-radius:5px;">
        <!-- <ul>
                <li> -->
                    <div style="width: 200px; height: 40px; border:1px solid #ccc; border-radius:5px; margin:auto; background-color: {{ $color->hex_code }}"></div>
                    <strong>Nombre:</strong> {{ $color->name }}<br>
                    <strong>Categoría:</strong> {{ $color->category ? $color->category->descripcion : 'Sin categoría' }}<br>
                    <strong>Código Hex:</strong> {{ $color->hex_code }}<br>
                    <strong>Código RGB:</strong> {{ $color->rgb_code }}
                    <!-- Botón para ir a la ruta de edición -->
                    <div class="mt-1 d-flex justify-content-around">
                        <a href="{{ route('colors.edit', $color->id) }}" class="btn btn-primary">Editar</a>
                        <!-- Botón para eliminar -->
                        <form action="{{ route('colors.destroy', $color->id) }}" method="post" style="display: inline;"  onsubmit="return confirm('¿Estás seguro de que deseas eliminar este color?');">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-danger">Eliminar</button>
                        </form>
                    </div>
                <!-- </li>
            </ul> -->
    </div>
            @endforeach
    @else
        <p>No hay colores en la base de datos.</p>
    @endif
    </div>

</div>
</div>

@endsection

