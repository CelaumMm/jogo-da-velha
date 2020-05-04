<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Jogo extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['nivel', 'resultado'];

    /**
     * Relacionamento de 1:N
     */
    public function jogadas()
    {
        return $this->hasMany(Jogada::class);
    }
}
