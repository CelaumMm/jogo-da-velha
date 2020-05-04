@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-12 text-center mb-2">
                <button id="btn-iniciar" type="button" class="btn btn-success" onclick="salvarJogo()">Iniciar Partida</button>

                {{-- @method('PATCH') --}}

                <div class="btn-group">                
                    <select name="nivel" id="nivel" class="custom-select">
                        <option value="1">Fácil</option>
                        <option value="2">Médio</option>
                        <option value="3">Difícil</option>
                    </select>
                </div>
            </div>

            <div class="col-md-12">
                <!-- tabuleiro -->
                <div class="tabuleiro">
                    <ul>
                        <!-- linha 1 -->
                        <li id="0_0" class="tb-item tb-border-bottom tb-border-right" onclick="jogar(0, 0)"></li>
                        <li id="0_1" class="tb-item tb-border-bottom tb-border-right" onclick="jogar(0, 1)"></li>
                        <li id="0_2" class="tb-item tb-border-bottom" onclick="jogar(0, 2)"></li>

                        <!-- linha 2 -->
                        <li id="1_0" class="tb-item tb-border-bottom tb-border-right" onclick="jogar(1, 0)"></li>
                        <li id="1_1" class="tb-item tb-border-bottom tb-border-right" onclick="jogar(1, 1)"></li>
                        <li id="1_2" class="tb-item tb-border-bottom" onclick="jogar(1, 2)"></li>
                        
                        <!-- linha 3 -->
                        <li id="2_0" class="tb-item tb-border-right" onclick="jogar(2, 0)"></li>
                        <li id="2_1" class="tb-item tb-border-right" onclick="jogar(2, 1)"></li>
                        <li id="2_2" class="tb-item" onclick="jogar(2, 2)"></li>
                    </ul>
                </div>
                <!-- fim tabuleiro -->
            </div>  
        </div>
    </div>
@endsection

@push('css')
    <link href="{{ asset('lib/toastr/css/toastr.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/jogo.css') }}" rel="stylesheet">

    <style>
        .img-x {
            background-image: url('{{ asset("img/x.png")}}');
        }
        .img-o {
            background-image: url('{{ asset("img/o.png")}}');
        }
    </style>
@endpush

@push('js')
    <script src="{{ asset('lib/toastr/js/toastr.min.js') }}"></script>
    <script src="{{ asset('js/jogo.js') }}"></script>

    <script>
        let _token = $('meta[name="csrf-token"]').attr('content');
        let _url_jogo = "{{ route('jogos.store') }}";
        let _url_jogada = "{{ route('jogadas.store') }}";
    </script>
@endpush