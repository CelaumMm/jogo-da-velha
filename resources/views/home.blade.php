@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
      <div class="col-md-12 text-center">
        <h3>Vamos jogar?</h3>
      </div>
      <div class="col-md-8">
        <div class="accordion" id="menu">
          <div class="card">
            <div class="card-header text-center" id="headingOne">
              <a href="{{ route('jogos.iniciar') }}" class="btn btn-link btn-block" style="text-decoration: none;">Iniciar</a>
            </div>
          </div>

          <div class="card">
            <div class="card-header text-center" id="headingTwo" data-toggle="collapse" data-target="#collapseTwo" style="cursor: pointer;">
              <button class="btn btn-link" style="text-decoration: none;">Créditos</button>
            </div>
          
            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#menu">
              <div class="card-body">
                Projeto de um Jogo da velha <br>
                Desenvolvido por Marcelo Vaz de Camargo
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
</div>
@endsection
