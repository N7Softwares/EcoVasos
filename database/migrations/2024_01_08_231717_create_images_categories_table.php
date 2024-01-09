<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateImagesCategoriesTable extends Migration
{
    public function up()
    {
        Schema::create('images_categories', function (Blueprint $table) {
            $table->id();
            $table->string('image_type');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('images_categories');
    }
}
