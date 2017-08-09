(function(){
    var botaoLayout = document.querySelector('#mudaLayout');
    var mural = document.querySelector('.mural');
    
    function efetuaMudancaLinhaLayout() {
    mural.classList.toggle('mural--linhas');
}

    botaoLayout.addEventListener('click', efetuaMudancaLinhaLayout);
    botaoLayout.addEventListener('click', function () {
        if (mural.classList.contains('mural--linhas')) {
            botaoLayout.textContent = 'Blocos';
        } else {
            botaoLayout.textContent = 'Linhas';
        }
    });
    
})();


