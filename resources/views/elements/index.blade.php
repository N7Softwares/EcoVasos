<!-- resources/views/elements/index.blade.php -->

@extends('layouts.app')

@section('content')
    <h1>Imágenes Elements</h1>

    @foreach ($elements as $element)
        <div>
            <img src="{{ asset($element->url) }}" alt="Inspiración">
            <p>Categoría: {{ $element->category->image_type }}</p>

            <a href="{{ route('elements.edit', $element->id) }}">Editar</a>
            
            <form action="{{ route('elements.destroy', $element->id) }}" method="post" style="display:inline;">
                @csrf
                @method('DELETE')
                <button type="submit" onclick="return confirm('¿Estás seguro?')">Eliminar</button>
            </form>
        </div>
    @endforeach
@endsection
