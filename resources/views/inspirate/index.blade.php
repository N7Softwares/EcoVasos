<!-- resources/views/inspirate/index.blade.php -->

@extends('layouts.app')

@section('content')
    <h1>Imágenes Inspiradoras</h1>

    @foreach ($inspirates as $inspirate)
        <div>
            <img src="{{ asset($inspirate->url) }}" alt="Inspiración">
            <p>Categoría: {{ $inspirate->category->image_type }}</p>

            <a href="{{ route('inspirate.edit', $inspirate->id) }}">Editar</a>
            
            <form action="{{ route('inspirate.destroy', $inspirate->id) }}" method="post" style="display:inline;">
                @csrf
                @method('DELETE')
                <button type="submit" onclick="return confirm('¿Estás seguro?')">Eliminar</button>
            </form>
        </div>
    @endforeach
@endsection
