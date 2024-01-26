<?php

// app/Http/Controllers/ImagesCategoryController.php

namespace App\Http\Controllers;

use App\Models\ImagesCategory;
use Illuminate\Http\Request;

class ImagesCategoryController extends Controller
{
    public function index()
    {
        $categories = ImagesCategory::all();

        return view('backend.images_categories.index', compact('categories'));
    }

    public function create()
    {
        return view('backend.images_categories.create');
    }

    public function show()
    {
        $categories = ImagesCategory::all();

        return view('backend.images_categories.create', compact('categories'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'image_type' => 'required|string|unique:images_categories',
        ]);

        ImagesCategory::create([
            'image_type' => $request->input('image_type'),
        ]);

        return redirect()->route('images_categories.index')->with('success', 'Categoría creada exitosamente.');
    }
    public function edit($id)
    {
        $category = ImagesCategory::findOrFail($id);

        return view('backend.images_categories.edit', compact('category'));
    }

    public function update(Request $request, $id)
    {
        $category = ImagesCategory::findOrFail($id);

        $request->validate([
            'image_type' => 'required|string|unique:images_categories,image_type,'.$id,
        ]);

        $category->update([
            'image_type' => $request->input('image_type'),
        ]);

        return redirect()->route('images_categories.index')->with('success', 'Categoría actualizada exitosamente.');
    }
    public function destroy($id)
    {
        $category = ImagesCategory::findOrFail($id);
        $category->delete();

        return redirect()->route('images_categories.index')->with('success', 'Categoría eliminada exitosamente.');
    }
}
