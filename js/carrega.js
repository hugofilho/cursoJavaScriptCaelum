$.getJSON('http://ceep.herokuapp.com/cartoes/carregar?callback=?', {usuario:'fulano'},
         function(dados){
            $.each(dados.cartoes,function(){
                controladorCartoes.cria(this.conteudo,this.cor);
            });
});