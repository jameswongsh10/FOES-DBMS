
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
        Schema::create('staffs', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('title');
            $table->string('miri_id')->unique();
            $table->string('perth_id');
            $table->date('report_duty_date');
            $table->string('department');
            $table->string('position');
            $table->string('room_no');
            $table->string('ext_no');
            $table->string('status');
            $table->string('email');
            $table->string('appointment_level');
            $table->string('photocopy_id');
            $table->string('pigeonbox_no');
            $table->date('resigned_date')->nullable(true);
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
        Schema::dropIfExists('staffs');
    }
};
