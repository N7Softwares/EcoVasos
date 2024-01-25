<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tipografias', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Nombre de la fuente
            $table->string('file_path'); // Ruta del archivo de la fuente
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tipografias');
    }
};
