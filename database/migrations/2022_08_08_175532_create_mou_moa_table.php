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
        Schema::create('mou_moa', function (Blueprint $table) {
            $table->id();
            $table->string('country');
            $table->string('institution');
            $table->date('signed_date');
            $table->date('due_date');
            $table->string('area_of_collab');
            $table->string('progress');
            $table->string('type_of_agreement');
            $table->string('research')->nullable(true);
            $table->string('teaching')->nullable(true);
            $table->string('exchange')->nullable(true);
            $table->string('collab_and_partnerships')->nullable(true);
            $table->string('mutual_extension');
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
        Schema::dropIfExists('mou_moa');
    }
};
