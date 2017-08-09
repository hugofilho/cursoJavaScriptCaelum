$('#ajuda').one('click',buscaAjudaDoServidor);
function buscaAjudaDoServidor(){
    $.getJSON('http://ceep.herokuapp.com/cartoes/instrucoes',
              function(dados){
                    $.each(dados.instrucoes,function(){
                        var cartao = this;
                        console.log(cartao.conteudo);
                        controladorCartoes.cria(cartao.conteudo,cartao.cor);
                    });
              });
}
