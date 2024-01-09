<!-- resources/views/images_categories/index.blade.php -->

@extends('layouts.app')

@section('content')
    <h1>Lista de Categorías</h1>

    <ul>
        @foreach ($categories as $category)
            <li>
                {{ $category->image_type }}
                <a href="{{ route('images_categories.edit', $category->id) }}">Editar</a>
                <form action="{{ route('images_categories.destroy', $category->id) }}" method="post" style="display: inline;">
                    @csrf
                    @method('DELETE')
                    <button type="submit" onclick="return confirm('¿Estás seguro de eliminar esta categoría?')">Eliminar</button>
                </form>
            </li>
        @endforeach
    </ul>
@endsection
