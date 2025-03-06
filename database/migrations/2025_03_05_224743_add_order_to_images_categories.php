<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('images_categories', function (Blueprint $table) {
            $table->integer('order')->nullable()->default(0);  // Agrega el campo 'order'
        });
    }
    
    public function down()
    {
        Schema::table('images_categories', function (Blueprint $table) {
            $table->dropColumn('order');  // Elimina el campo 'order' si deshaces la migración
        });
    }
    

    /**
     * Reverse the migrations.
     */
   
};
