<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJogadasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jogadas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('jogo_id');
            $table->string('jogador');
            $table->integer('x')->unsigned();
            $table->integer('y')->unsigned();
            $table->integer('numero_movimento')->unsigned();
            $table->timestamps();

            $table->foreign('jogo_id')->references('id')->on('jogos')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('jogadas');
    }
}
