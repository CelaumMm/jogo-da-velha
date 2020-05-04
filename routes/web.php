<?php

use Illuminate\Support\Facades\Route;

Auth::routes();

Route::get('/', 'HomeController@index')->name('home');
Route::get('/jogo', 'JogoController@iniciar')->name('jogos.iniciar');

Route::resource('jogos', 'JogoController');
Route::resource('jogadas', 'JogadaController');
