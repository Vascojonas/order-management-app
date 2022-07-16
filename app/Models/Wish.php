<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wish extends Model
{
    use HasFactory;

    protected $table = 'wishes';
    protected $fillable=[
        'cliente_id',
        'produto_id',
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
