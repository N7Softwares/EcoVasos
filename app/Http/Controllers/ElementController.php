<?php

// app/Http/Controllers/ElementController.php

namespace App\Http\Controllers;

use App\Models\Element;
use App\Models\ImagesCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ElementController extends Controller
{
    public function index()
    {
        $elements = Element::all();

        return view('elements.index', compact('elements'));
    }

    public function show($id)
    {
        $elements = Element::findOrFail($id);

        return view('elements.show', compact('elements'));
    }
    public function create()
    {
        $categories = ImagesCategory::all();

        return view('elements.create', compact('categories'));
    }

    public function store(Request $request)
    {
        $image = $request->file('image');

        $imageName = time() . '_' . $image->getClientOriginalName();

        $image->move(public_path('images_elements'), $imageName);

        $imageUrl = 'images_elements/' . $imageName;

        Element::create([
            'url' => $imageUrl,
            'category_image_id' => $request->input('category_image_id'),
        ]);

        return redirect()->route('elements.create')->with('success', 'Imagen Element creada exitosamente.');
    }

    public function edit($id)
    {
        $elements = Element::findOrFail($id);
        $categories = ImagesCategory::all();

        return view('elements.edit', compact('elements', 'categories'));
    }

    public function update(Request $request, $id)
    {
        $elements = Element::findOrFail($id);

        // $request->validate([
        //     'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        //     'category_image_id' => 'required|exists:images_categories,id',
        // ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('images_elements'), $imageName);
            $imageUrl = 'images_elements/' . $imageName;

            $elements->update(['url' => $imageUrl]);
        }

        $elements->update([
            'category_image_id' => $request->input('category_image_id'),
        ]);

        return redirect()->route('elements.index')->with('success', 'Imagen inspiradora actualizada exitosamente.');
    }

    public function destroy($id)
    {
        $elements = Element::findOrFail($id);
        $elements->delete();

        return redirect()->route('elements.index')->with('success', 'Imagen inspiradora eliminada exitosamente.');
    }

}
