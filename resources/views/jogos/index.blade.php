@extends('layouts.app')

@section('content')
<div class="container">
    <h3>Partidas jogadas</h3>
    <table class="table table-bordered table-striped">
        <tr>
            <th width=10%>Código</th>
            <th width=30%>Nivel</th>
            <th width=30%>Resultado</th>
            <th width=30%>Data</th>
        </tr>        
        @forelse ($data as $row)
            <tr>
                <td>{{ $row->id }}</td>
                <td>@if($row->nivel == 1) {{ 'Fácil' }} @endif @if($row->nivel == 2) {{ 'Médio' }} @endif @if($row->nivel == 3) {{ 'Difício' }} @endif</td>
                <td>{{ $row->resultado }}</td>
                <td>{{ $row->created_at->diffForHumans() }}</td>
            </tr>
        @empty
            <tr>
                <td colspan="4">
                    Nenhuma partida encontrada!
                </td>
            </tr> 
            </div>
        @endforelse
    </table>
    <div class="row justify-content-center">
        {!! $data->links() !!}
    </div>
</div>
@endsection
