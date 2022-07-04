<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Funcionario extends Model
{
    use HasFactory;

    protected $table = 'funcionarios';
    
    protected $fillable=[
        'nome',
        'apelido',
        'bi',
        'cidade',
        'bairro',
        'quarteirao',
        'casa',
        'sexo',
        'dataNascimento',
        'user_id'
    ];

   
    public function user()
    {
        return $this->belongsTo(User::class) ;
    }
            
}
