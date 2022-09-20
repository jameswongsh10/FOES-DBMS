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
        Schema::create('assets', function (Blueprint $table) {
            $table->id();
            $table->string('physical_check');
            $table->string('asset_tag_number');
            $table->string('item');
            $table->string('description');
            $table->string('serial_no');
            $table->string('year_purchased');
            $table->string('warranty');
            $table->integer('quantity');
            $table->string('location');
            $table->string('original_cost');
            $table->string('condition_of_asset');
            $table->string('grant');
            $table->string('brand');
            $table->string('model_no');
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
        Schema::dropIfExists('assets');
    }
};
