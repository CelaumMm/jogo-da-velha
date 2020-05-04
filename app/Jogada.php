<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Jogada extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['jogo_id', 'jogador', 'x', 'y', 'numero_movimento'];

    /**
     * Relacionamento de N:1
     */
    public function jogo()
    {
        return $this->belongsTo(Jogo::class);
    }
}
