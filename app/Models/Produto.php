<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produto extends Model
{
    use HasFactory;
    protected $table = 'produtos';
    
    protected $fillable=[
       'categoria',
        'nome',
        'descricao',
        'preco',
        'quantidade',
        'imagem',
    ];

    public function carrinhos()
    {
        return $this->belongsToMany(Carrinho::class);
    }

    public function whishes()
    {
        return $this->belongsToMany(Whish::class);
    }

    public function encomendas()
    {
        return $this->belongsToMany(Encomenda::class);
    }

    public function encomendasitens()
    {
        return $this->belongsTo(encomendasitens::class);
    }
}
