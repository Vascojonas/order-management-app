<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Carrinho extends Model
{
    use HasFactory;


    protected $table = 'carrinhos';
    
    protected $fillable=[
        'cliente_id',
    ];

    public function cliente()
    {
        return $this->belongsTo(Cliente::class) ;
    }

    public function produtos()
    {
        return $this->belongsToMany(Produto::class);
    }
}
