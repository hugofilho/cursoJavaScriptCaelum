var controladorCartoes = (function ($) {
    'use strict';
    var mural = document.querySelector('.mural');
    var contador = $('.cartao').length;

    function decideTipoCartao(texto) {
        var quebras = texto.split('<br>').length - 1;
        var semQuebras = texto.replace(/<br>/g, ' ');
        var letras = semQuebras.length;
        var palavras = semQuebras.split(' ');
        var tamanhoMaiorPalavra = 0;

        $.each(palavras, function () {
            var palavra = this;
            if (palavra.length > tamanhoMaiorPalavra) {
                tamanhoMaiorPalavra = palavra.length;
            }
        });

        if (quebras < 5 && letras < 55 && tamanhoMaiorPalavra < 9) {
            return "cartao--textoGrande";
        } else if (quebras < 6 && letras < 75 && tamanhoMaiorPalavra < 12) {
            return "cartao--textoMedio";
        }
        return "cartao--textoPequeno";
    }

    function criaCartao(conteudo, cor = 'purple') {
        contador++;
        var timer;
        var conteudoNovoCartao = $('<p>').addClass('cartao-conteudo')
                                         .attr('contenteditable', true)
                                         .html(conteudo).on('input', function () {
                                             clearTimeout(timer);
                                             timer = setTimeout(function(){
                                                 $(document).trigger('precisaSincronizar');
                                             },1000);
                                             
                                         });
        var botaoRemove = $('<button>').addClass('opcoesDoCartao-opcao opcoesDoCartao-remove').text('Remove').click(removeCartao).attr('data-cartao', contador);
        var opcoesDeCores  = opcoesDeCoresDoCartao('cartao'+contador);
        var opcoesDoCartao = $('<div>').addClass('opcoesDoCartao').append(botaoRemove).append(opcoesDeCores);
        var tipoCartao = decideTipoCartao(conteudo);
        $('<div>').addClass('cartao').addClass(tipoCartao).append(opcoesDoCartao).append(conteudoNovoCartao).attr('id', 'cartao' + contador).css('background-color', cor).prependTo('.mural');

    }

    function removeCartao() {
        var idDoCartao = this.dataset.cartao;
        var cartao = document.querySelector('#cartao' + idDoCartao);
        cartao.classList.add('cartao--some');
        setTimeout(function () {
            cartao.remove();
            $(document).trigger('precisaSincronizar');
        }, 3000);
    }

    return {
        cria: criaCartao
    }
    
    function opcoesDeCoresDoCartao(idDoCartao) {
        var cores = [
            { nome: "Padrão", codigo: "#EBEF40" },
            { nome: "Importante", codigo: "#F05450" },
            { nome: "Tarefa", codigo: "#92C4EC" },
            { nome: "Inspiração", codigo: "#76EF40" }
        ];

        var opcoesDeCor = $("<div>").addClass("opcoesDoCartao-cores");

        $.each(cores, function () {
            var cor = this;

            var idRadioCor = "cor" + cor.nome + "-" + idDoCartao;

            var radioCor = $("<input>")
                .addClass("opcoesDoCartao-radioCor")
                .val(cor.codigo)
                .attr({
                    type: "radio",
                    id: idRadioCor,
                    name: "corDoCartao" + idDoCartao
                });
            
            radioCor.change(function(){
                var cor = $(this).val();
                
                var cartao = $(this).closest('.cartao');
                
                cartao.css('background-color',cor);
                
                $(document).trigger('precisaSincronizar');
                
            });

            var labelRadioCor = $("<label>")
                .addClass("opcoesDoCartao-opcao opcoesDoCartao-cor")
                .text(cor.nome)
                .css("color", cor.codigo)
                .attr("for", idRadioCor);

            opcoesDeCor.append(radioCor).append(labelRadioCor);
        });

        return opcoesDeCor;
    }

})(jQuery);