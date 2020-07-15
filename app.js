var rodada = 1;
var matrizJogo = Array(3);

matrizJogo ['a'] = Array(3);
matrizJogo ['b'] = Array(3);
matrizJogo ['c'] = Array(3);

matrizJogo ['a'][1] = 0;
matrizJogo ['a'][2] = 0;
matrizJogo ['a'][3] = 0;

matrizJogo ['b'][1] = 0;
matrizJogo ['b'][2] = 0;
matrizJogo ['b'][3] = 0;

matrizJogo ['c'][1] = 0;
matrizJogo ['c'][2] = 0;
matrizJogo ['c'][3] = 0;

$(document).ready(function(){ //funcao de carregamento da pagina

    $('#btnIniciarJogo').click(function(){

        //validacao de nicks
        if($('#entradaNick1').val() == ''){
            alert("Nick do jogador 1 nao foi preenchido");
            return false;
        }

        if($('#entradaNick2').val() == ''){
            alert("Nick do jogador 2 nao foi preenchido");
            return false;
        }
          
        //exibir os nicks
        $('#nick1').html($('#entradaNick1').val());
        $('#nick2').html($('#entradaNick2').val());

        //controla visualizacao de divs
        $('#paginaInicial').hide();
        $('#palcoJogo').show();
        
    });

    $('.jogada').click(function(){

        var idCampoClicado = this.id;
        $('#'+idCampoClicado).off();
        jogada(idCampoClicado);


    });

    function jogada(id){
        
        var icone = '';
        var ponto = 0;

        if((rodada % 2) == 1){
            icone = 'url("img/marcacao_1.png")';
            ponto = -1;
        }
        
        if((rodada % 2) == 0){
            icone = 'url("img/marcacao_2.png")';
            ponto = 1;
        }
        
        rodada++;
        if(rodada > 9){
            location.reload();
        }

        $('#'+id).css('background-image',icone);

        var linhaColuna = id.split('');

        matrizJogo[linhaColuna[0]][linhaColuna[1]] = ponto;

        verificaCombinacao();
        
    }

    function verificaCombinacao(){

        var pontos = 0;

        //verifica na horizontal
        for(var i = 1; i<= 3; i++){
            pontos = pontos + matrizJogo['a'][i];
        }
        ganhador(pontos);

        pontos = 0;
        for(var i = 1; i<= 3; i++){
            pontos = pontos + matrizJogo['b'][i];
        }
        ganhador(pontos);

        pontos = 0;
        for(var i = 1; i<= 3; i++){
            pontos = pontos + matrizJogo['c'][i];
        }
        ganhador(pontos);

        //verifica na vertical
        for(var l = 1; l <= 3; l++){
            pontos = 0;
            pontos += matrizJogo['a'][l];
            pontos += matrizJogo['b'][l];
            pontos += matrizJogo['c'][l];

            ganhador(pontos);
        }

        //verificar na diagonal
        pontos = 0;

        pontos = matrizJogo['a'][1] + matrizJogo['b'][2] + matrizJogo['c'][3];
        ganhador(pontos);

        pontos = 0;
        pontos = matrizJogo['a'][3] + matrizJogo['b'][2] + matrizJogo['c'][1];
        ganhador(pontos);

    }

    function ganhador(pontos){
        
        if(pontos == -3){
            var jogador1 = $('#entradaNick1').val();
            alert(jogador1 + " venceu a partida");
            $('.jogada').off();
            location.reload();
        }else if(pontos == 3){
            var jogador2 = $('#entradaNick2').val();
            alert(jogador2 + " venceu a partida");
            $('.jogada').off();
            location.reload();
        }
        
    }
    
    
});
