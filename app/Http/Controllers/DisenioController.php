<?php


// app/Http/Controllers/InspirateController.php

namespace App\Http\Controllers;

use App\Models\Inspirate;
use App\Models\Element;
use App\Models\ImagesCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DisenioController extends Controller
{
    public function index()
    {
        $inspirates = Inspirate::all();
        $elements = Element::all();

        $array = [
            'inspirates' => $inspirates,
            'elements' => $elements
        ];

        return view('frontend.pages.disenio2', compact('array'));
    }
}
