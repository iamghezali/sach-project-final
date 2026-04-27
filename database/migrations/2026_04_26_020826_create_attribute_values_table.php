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
        Schema::create('attribute_values', function (Blueprint $table) {
            $table->id();

            $table->foreignId('attribute_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->string('value');
            $table->string('slug');
            $table->unsignedSmallInteger('position')->default(0);

            $table->timestamps();

            // A slug must be unique within its attribute (two attributes can both have "red")
            $table->unique(['attribute_id', 'slug'], 'uq_attribute_values_attribute_slug');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attribute_values');
    }
};
