<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('attachment_mobilities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mobility_id')->constrained('mobility')->onUpdate('cascade')->onDelete('cascade');
            $table->string('type');
            $table->string('description')->nullable(true);
            $table->string('path')->nullable(true);
            $table->string('file_name')->nullable(true);
            $table->string('content_type')->nullable(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('attachment_mobilities');
    }
};
