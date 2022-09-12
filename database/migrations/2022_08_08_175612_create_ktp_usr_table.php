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
        Schema::create('ktp_usr', function (Blueprint $table) {
            $table->id();
            $table->string('category');
            $table->date('date');
            $table->string('program_name');
            $table->string('community_industry_name');
            $table->string('location');
            $table->string('lead_by');
            $table->string('faculty');
            $table->string('cm_driven');
            $table->string('partner_name');
            $table->string('no_of_staff');
            $table->string('no_of_student');
            $table->string('internal_funding');
            $table->string('external_funding');
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
        Schema::dropIfExists('ktp_usr');
    }
};
