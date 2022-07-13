<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class EncomendaProduto extends Pivot
{
    use HasFactory;

    protected $table = 'encomenda_produto';
    
    protected $fillable=[
        'descricao',
        'imagem_ass',
        'quantidade',
        'status',
        'encomenda_id',
        'produto_id'
    ];

    
}
