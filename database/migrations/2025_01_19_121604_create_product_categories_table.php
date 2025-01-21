<?php
// database/migrations/{timestamp}_create_product_categories_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('product_categories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('establishment_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->foreignId('parent_id')->nullable()->constrained('product_categories')->onDelete('set null');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('product_categories');
    }
};