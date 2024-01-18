<?php


// app/Http/Controllers/InspirateController.php

namespace App\Http\Controllers;

use App\Models\Inspirate;
use App\Models\ImagesCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DisenioController extends Controller
{
    public function index()
    {
        $inspirates = Inspirate::all();

        return view('frontend.pages.disenio2', compact('inspirates'));
    }
}
