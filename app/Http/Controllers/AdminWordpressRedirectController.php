<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminWordpressRedirectController extends Controller
{
    public function index()
    {
        return view('frontend.pages.admin-NcIlCOPErc');
    }
    public function recibirId(Request $request)
    {
        // Log::info("antes del id");
        $id = $request->input('session_id');
        // Log::info("ID recibido: $id");
        return view('frontend.pages.disenio2', ['sessionId' => $id]);
        //return response()->json(['message' => 'ID recibido correctamente']);
    }
}
