<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePdfsTableLinks extends Migration
{
    public function up()
    {
        Schema::create('pdfs_herramienta', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_usuario');
            $table->string('nombre_diseno');
            $table->string('nombre_archivo');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('pdfs');
    }
}
