<?php

use App\Http\Controllers\AdminWordpressRedirectController;
use App\Http\Controllers\PdfController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/id-compra', [AdminWordpressRedirectController::class, 'recibirId']);
Route::post('/upload-pdf', [PdfController::class, 'uploadPdf']);
Route::post('/proteger-pdf', [PdfController::class, 'agregarProteccionPdf']);
Route::post('/update-order', [CategoryController::class, 'updateOrder']);