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

    // app/Http/Controllers/ImagesCategoryController.php

public function updateOrder(Request $request)
{
    $ids = $request->input('ids');

    if (!$ids || !is_array($ids)) {
        return response()->json(['error' => 'Datos inválidos'], 400);
    }

    // Actualiza el orden de las categorías en images_categories
    foreach ($ids as $index => $categoryId) {
        $category = ImagesCategory::find($categoryId);
        if ($category) {
            $category->order = $index;
            $category->save();
        }
    }

    return response()->json(['message' => 'Orden actualizado correctamente.']);
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
