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
        Schema::create('research_awards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('staff_id')->constrained('staffs')->onUpdate('cascade')->onDelete('cascade');
            $table->string('type_of_grant');
            $table->string('project_title');
            $table->string('co_investigators')->nullable(true);
            $table->string('research_grant_scheme');
            $table->string('award_amount');
            $table->string('evidence_link')->nullable(true);
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
        Schema::dropIfExists('research_awards');
    }
};
