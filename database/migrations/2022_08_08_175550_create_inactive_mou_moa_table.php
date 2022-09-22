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
        Schema::create('inactive_mou_moa', function (Blueprint $table) {
            $table->id();
            $table->string('collaborators');
            $table->date('signed_date');
            $table->string('effective_period');
            $table->date('due_date');
            $table->string('agreement');
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
        Schema::dropIfExists('inactive_mou_moa');
    }
};
