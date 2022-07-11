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
        Schema::create('encomenda_produto', function (Blueprint $table) {
            $table->id();
            $table->longText('descricao');
            $table->string('imagem_ass')->default(' ');
            $table->integer('status')->default('0');
            $table->double('valor')->default(0);
            $table->timestamp('prazo')->useCurrent();
            $table->integer('quantidade')->default(1);
            $table->integer('encomenda_id')->unsigned();
            $table->integer('produto_id')->unsigned();
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
        Schema::dropIfExists('encomenda_produto');
    }
};
