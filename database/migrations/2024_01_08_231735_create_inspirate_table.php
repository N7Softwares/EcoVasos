<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInspirateTable extends Migration
{
    public function up()
    {
        Schema::create('inspirates', function (Blueprint $table) {
            $table->id();
            $table->string('url');
            $table->foreignId('category_image_id')->constrained('images_categories');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('inspirates');
    }
}
