<?php

use App\Features\CustomOrder\ClothingOrder\Enums\ClothingOrderItemStatus;
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
        Schema::create('clothing_order_items', function (Blueprint $table) {
            $table->id();

            $table->foreignId('clothing_order_id')->constrained()->cascadeOnDelete();
            $table->foreignId('tailor_id')->nullable()->constrained('users')->nullOnDelete();

            // Information
            $table->string('title');
            $table->string('gender');
            $table->string('looking_for');
            $table->text('description');
            $table->unsignedInteger('quantity');
            $table->date('preferred_due_date');

            // Measurements
            $table->string('measurement_type');
            $table->string('size')->nullable();
            $table->decimal('shoulder', 6, 2)->nullable();
            $table->decimal('height', 6, 2)->nullable();
            $table->decimal('waist', 6, 2)->nullable();
            $table->decimal('chest', 6, 2)->nullable();
            $table->string('fitting_preferrence')->nullable();

            $table->string('status')->default(ClothingOrderItemStatus::Pending->value);

            $table->decimal('offer_price', 10, 2)->nullable();
            $table->date('offer_due_date')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clothing_order_items');
    }
};
