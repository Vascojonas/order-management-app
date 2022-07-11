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
        Schema::create('encomendas_itens', function (Blueprint $table) {
            $table->id();
            $table->longText('descricao');
            $table->string('imagem_ass')->default(' ');
            $table->integer('status')->default('0');
            $table->double('valor')->default(0);
            $table->timestamp('prazo')->useCurrent();
            $table->integer('quantidade')->default(1);
            $table->integer('user_id')->references('id')->on('users')->cascadeOnDelete()->cascadeOnUpdate();
            $table->integer('produto_id')->references('id')->on('produto')->cascadeOnDelete()->cascadeOnUpdate();
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
        Schema::dropIfExists('encomendas_itens');
    }
};
