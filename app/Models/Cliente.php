<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;

    protected $table = 'clientes';
    
    protected $fillable=[
        'nome',
        'apelido',
        'telefone',
        'email',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class) ;
    }

    public function carrinho()
    {
        return $this->hasOne(Carrinho::class);
    }

    public function wish()
    {
        return $this->hasOne(Wish::class);
    }

    public function encomenda()
    {
        return $this->hasOne(Encomenda::class);
    }
}
