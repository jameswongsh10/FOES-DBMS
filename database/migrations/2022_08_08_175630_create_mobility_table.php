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
        Schema::create('mobility', function (Blueprint $table) {
            $table->id();
            $table->string('staff_or_student');
            $table->string('in_or_out_bound');
            $table->string('name');
            $table->string('attendee_id');
            $table->string('program');
            $table->string('name_of_university');
            $table->string('country');
            $table->string('duration');
            $table->date('from_date');
            $table->date('to_date');
            $table->string('remark')->nullable(true);
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
        Schema::dropIfExists('mobility');
    }
};
