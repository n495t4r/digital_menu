<?php 

// database/migrations/{timestamp}_create_establishments_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('establishments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->text('description');
            $table->string('slug')->unique();
            $table->string('currency', 3)->default('NGN');
            $table->text('address');
            $table->string('phone');
            $table->enum('color_theme', ['light', 'dark'])->default('light');
            $table->string('color')->nullable();
            $table->string('logo')->nullable();
            $table->string('bg_image')->nullable();
            $table->string('wifi_pass')->nullable();
            $table->boolean('can_make_orders')->default(false);
            $table->string('google_maps_link')->nullable();
            $table->string('tiktok')->nullable();
            $table->string('instagram')->nullable();
            $table->string('facebook')->nullable();
            $table->string('twitter')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('establishments');
    }
};