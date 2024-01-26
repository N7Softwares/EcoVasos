<?php

// app/Http/Controllers/InspirateController.php

namespace App\Http\Controllers;

use App\Models\Inspirate;
use App\Models\ImagesCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class InspirateController extends Controller
{
    public function index()
    {
        $inspirates = Inspirate::all();

        return view('backend.inspirate.index', compact('inspirates'));
    }

    public function show($id)
    {
        $inspirate = Inspirate::findOrFail($id);

        return view('backend.inspirate.show', compact('inspirate'));
    }
    public function create()
    {
        $categories = ImagesCategory::all();

        return view('backend.inspirate.create', compact('categories'));
    }

    public function store(Request $request)
    {
        $image = $request->file('image');

        $imageName = time() . '_' . $image->getClientOriginalName();

        $image->move(public_path('images_inspirate'), $imageName);

        $imageUrl = 'images_inspirate/' . $imageName;

        Inspirate::create([
            'url' => $imageUrl,
            'category_image_id' => $request->input('category_image_id'),
        ]);

        return redirect()->route('inspirate.create')->with('success', 'Imagen inspiradora creada exitosamente.');
    }

    public function edit($id)
    {
        $inspirate = Inspirate::findOrFail($id);
        $categories = ImagesCategory::all();

        return view('backend.inspirate.edit', compact('inspirate', 'categories'));
    }

    public function update(Request $request, $id)
    {
        $inspirate = Inspirate::findOrFail($id);

        // $request->validate([
        //     'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        //     'category_image_id' => 'required|exists:images_categories,id',
        // ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('images_inspirate'), $imageName);
            $imageUrl = 'images_inspirate/' . $imageName;

            $inspirate->update(['url' => $imageUrl]);
        }

        $inspirate->update([
            'category_image_id' => $request->input('category_image_id'),
        ]);

        return redirect()->route('inspirate.index')->with('success', 'Imagen inspiradora actualizada exitosamente.');
    }

    public function destroy($id)
    {
        $inspirate = Inspirate::findOrFail($id);
        $inspirate->delete();

        return redirect()->route('inspirate.index')->with('success', 'Imagen inspiradora eliminada exitosamente.');
    }

}
