<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Encomenda extends Model
{
    use HasFactory;

    protected $table = 'encomendas';
    
    protected $fillable=[
        'cliente_id',
    ];

    public function cliente()
    {
        return $this->belongsTo(Cliente::class) ;
    }


    public function produtos()
    {
        return $this->belongsToMany(Produto::class)->using(EncomendaProduto::class);;
    }

   
}
