<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Publicidade extends Model
{
    use HasFactory;

    protected $table = 'publicidades';
    
    protected $fillable=[
       'titulo',
       'descricao',
       'imagem',       
    ];

    
    
    

}
