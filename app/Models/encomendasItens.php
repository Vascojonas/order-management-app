<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class encomendasItens extends Model
{
    use HasFactory;


    protected $table = 'encomendas_itens';
    
    protected $fillable=[
        'descricao',
        'imagem_ass',
        'quantidade',
        'status',
        'encomenda_id',
        'produto_id',
        'user_id'
    ];

    public function produtos()
    {
        return $this->hasMany(Produto::class);
    }

    public function encomendas()
    {
        return $this->hasMany(Encomenda::class);
    }
}
