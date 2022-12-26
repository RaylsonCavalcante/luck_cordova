document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}




                                                //FUNÇÕES JQUERY

//IR PARA TELA LISTA DE NOMES
function TelaLista() {

   	$(".divLista").addClass("mostraTelaLista");
   	
   	$(".divNovoPalpite").addClass("esconderTelaNovoPalpite");

	window.history.pushState({page:1}, 'TelaLista', 'Lista');

    $(".btn-lista").addClass("display");
    $(".btn-voltar").removeClass("display");
}

//VOLTAR PARA TELA ADICIONAR NOMES (Botao do Aplicativo)
function Voltar(){

    $(".divLista").removeClass("mostraTelaLista");	   	

    $(".divNovoPalpite").removeClass("esconderTelaNovoPalpite");
	
    $(".btn-lista").removeClass("display");
    $(".btn-voltar").addClass("display");

    history.go(-1);
};

//VOLTAR PARA TELA ADICIONAR NOMES (Botao de voltar do Telefone)
window.addEventListener('popstate', e => {
    
    $(".divLista").removeClass("mostraTelaLista");	   	

    $(".divNovoPalpite").removeClass("esconderTelaNovoPalpite");

    $(".btn-lista").removeClass("display");
    $(".btn-voltar").addClass("display");
    
});

//Alterar valor do input "Number"
$(document).ready(function(){
    $(".bi-chevron-up").click(function(e){
        e.preventDefault();
        var number = parseInt(document.getElementById("multiplier").value);
        var valor =  number + 1;

        $("#multiplier").val(valor);
    });
});

$(document).ready(function(){
    $(".bi-chevron-down").click(function(e){
        e.preventDefault();
        var number = parseInt(document.getElementById("multiplier").value);
        var valor =  number - 1;

        if(valor >= 1){
            $("#multiplier").val(valor);
        }
    });
});


                                            //ADICIONAR NOMES

'use strict'

// Cria array que representará nosso 'banco de dados' local
let banco = []

// Armazenar em constante array function que retorna os valores da chave 'todoList'
const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? []

// Armazenar em constante array function que define um valor da chave 'nomes' do nosso 'todoList'
const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco))

// CRIAR ITEM NA NOSSA LISTAGEM DE NOMES
const criarItem = (items, indice) => {
    
    // Criar elemento tr
    const item = document.createElement('tr');

    // Adicionar class 'th' ao elemento tr
    item.classList.add('th');

    // Variável contadora
    var indices = indice+1;

    // Pegar apenas duas string do nome
    var nameShort = items.name.split(' ');

    // Se existir 2 strings
    if (nameShort.slice("")[1]) {
        nameShort = nameShort.slice("")[0] + ' ' + nameShort.slice("")[1];
    }else{
        nameShort = nameShort.slice("")[0];
    }
    // Definir no conteudo do tbody
    item.innerHTML =  `
                            <th scope="row">`+indices+`</th>
                            <td style="width:160px;">${nameShort}</td>
                            <td>
                            <center>
                                <svg xmlns="http://www.w3.org/2000/svg" onclick="excluirNomes(${items.indice})" width="15" height="15" fill="currentColor" class="trash bi text-danger bi-trash-fill" viewBox="0 0 15 15">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                </svg>
                            </center>
                            </td>
        	
    `;   

    // Definir o novo item como filho do nosso todoList (tbody)    
    document.getElementById('tbody').appendChild(item)
}


// LIMPAR NOME

// Para evitar insercao duplica da lista toda quando chamamos a funcao atualizarTela()
const limparNomes = () => {
    // Elemento todoList que é a nossa lista
    const todoList = document.getElementById('tbody')

    // Enquanto todoList tiver um primeiro filho
    // Remova o ultimo filho que foi adicionado ao todoList
    // Lembrando que a lista é readicionada a cada nova insercao
    while (todoList.firstChild) { todoList.removeChild(todoList.lastChild) }
}

// ATUALIZAR TELA
const atualizarTela = () => {

    // Limpar nomes
    limparNomes()
    
    // Pega o Banco
    const banco = getBanco()

    //array
    var array = [];

    // Salva no array
    banco.forEach ( (item, indice) => {
        
        array.push({
            'name':item.name,
            'indice' :indice,
        });
    });
    
    //Ordem alfabetica
    array.sort((a,b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        return 0;
    });

    // Pega e adiciona os dados para criaItem()
    array.forEach ( (item, indice) => criarItem (item, indice));
    
    // Tamanho do todoList
    let dados = JSON.parse(localStorage.getItem('todoList')).length;

    //Pega elementos pelo id
    var mensagem = document.getElementById('mensagem');
    var luckImg = document.getElementById("luckImg");
    var erase = document.getElementById("erase");
    var svgTrash = document.getElementById("svgTrash");
    var formSearch = document.getElementById("formSearch");
    var list = document.getElementById("list");

    // Condição se exitir palpites ou não
    if(dados == 0){
        // Mostra mensagem (Não há Nomes);
        mensagem.style.display = 'block';

        // Esconde Trevo para sortear nomes
        luckImg.style.display = "none";

        // Mostra tag <Excluir>
        erase.style.display = 'block';

        // Esconde svgTrash
        svgTrash.style.display = 'none';

        // Esconde formSearch
        formSearch.style.display = 'none';

        // Esconde lista de nomes
        list.style.display = 'none';
    }else{
        // Esconde mensagem (Não há Nomes);
        mensagem.style.display = 'none';

        // Mostra formSearch
        formSearch.style.display = 'block';

        // Mosttra lista de nomes
        list.style.display = 'block';

        //Se existir mais de 1 nome
        if (dados > 1) {
            // Esconder tag <Excluir>
            erase.style.display = 'none';

            // Mostra svgTrash
            svgTrash.style.display = 'block';

            // Mostrar Trevo para sortear nomes
            luckImg.style.display = "grid";
        }else{
            
            if(dados == 1){
                // Esconder tag <Excluir>
                erase.style.display = 'block';

                // Mostra svgTrash
                svgTrash.style.display = 'none';

                // Esconde Trevo para sortear nomes
                luckImg.style.display = "none";
            }
        }
    }
}

// INSERIR ITEM NA LISTA DE NOMES
const inserirItem = (evento) => {

    // Verifica campos vazios
    if ($("#name").val() === "") {
        
        // SweetAlert2
        Swal.fire({
            text: 'Preencha o campo Nome!',
        });
    }else{
        
        // Valores dos campos
        const name = $("#name").val();
        const multiplier = parseInt($("#multiplier").val());

        
        // Pega o banco
        const banco = getBanco()

        //Loop de adição
        for (let i = 1; i <= multiplier; i++) {
            
            // Faça um push (adicione) de chave/valor do nome
            banco.push ({'name': name})
        }

        // Coloca a chave/valor no banco
        setBanco(banco)

        // SweetAlert2 ()
        Swal.fire({
            icon: 'success',
            text: 'Nome Adicionado!',
        });

        // Atualiza a tela
        atualizarTela()

        // Limpa o valor do evento do ultimo nome digitado no input
        $("#name").val("");
    }

}

// REMOVER ITEM por indice
function excluirNomes(indice) {

    //Alerta de Exclusao (SweetAlert2)
    Swal.fire({
        text: "Excluir Nome?",
        icon: 'question',
        cancelButtonText: 'Não',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim'
    }).then((result) => {
        if (result.value) {
            const banco = getBanco()

            // Faça um splice (corte) no seu (banco que eh um array) do indice, so uma posicao
            banco.splice (indice, 1)

            // Set do splice no seu banco, permitir a persistencia dos dados
            setBanco(banco)

            // Atualiza tela
            atualizarTela()
        }
    });
}

// Excluir todos os nomes
function excluirTodos() {

    //Alerta de Exclusao (SweetAlert2)
    Swal.fire({
        text: "Excluir Todos os Nomes?",
        icon: 'question',
        cancelButtonText: 'Não',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim'
    }).then((result) => {
        if (result.value) {
            const banco = getBanco()

            // Exclui todos os nomes
            banco.splice (0)

            // Set do splice no seu banco, permitir a persistencia dos dados
            setBanco(banco)

            // Atualiza tela
            atualizarTela()

            Swal.fire({
                text: "Exclusao bem sucedida?",
                icon: 'success',
            })
        }
    });
}

// Pegar o click de ADICIONAR nomes
document.getElementById('ADICIONAR').addEventListener('click', inserirItem);

// Atualiza a tela assim que abre o APP
atualizarTela();

//Pesquisa Dinâmica SEARCH

document.getElementById('search').addEventListener('keyup', search);

function search(event) {
    if (event.target.value != "") {

        limparNomes()

        // Pega o Banco
        const banco = getBanco()

        //array
        var array2 = [];

        // Salva no array
        banco.forEach ( (item,indice) => {
            if(item.name == event.target.value){
                array2.push({
                    'name':item.name,
                    'indice' :indice,
                });
            }
        });

        // Pega e adiciona os dados para criaItem()
        array2.forEach ( (item, indice) => searchItem (item, indice));

    }else{
        atualizarTela();
    }
}

const searchItem = (items, indice) => {
    
    // Criar elemento tr
    const item = document.createElement('tr');

    // Adicionar class 'th' ao elemento tr
    item.classList.add('th');

    // Variável contadora
    var indices = indice+1;

    // Pegar apenas duas string do nome
    var nameShort = items.name.split(' ');

    // Se existir 2 strings
    if (nameShort.slice("")[1]) {
        nameShort = nameShort.slice("")[0] + ' ' + nameShort.slice("")[1];
    }else{
        nameShort = nameShort.slice("")[0]
    }

    // Definir no conteudo do tbody
    item.innerHTML =  `
                            <th scope="row">`+indices+`</th>
                            <td style="width:160px;">${nameShort}</td>
                            <td>
                            <center>
                                <svg xmlns="http://www.w3.org/2000/svg" onclick="excluirNomes2(${items.indice})" width="15" height="15" fill="currentColor" class="trash bi text-danger bi-trash-fill" viewBox="0 0 15 15">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                </svg>
                            </center>
                            </td>
        	
    `;
    // Definir o novo item como filho do nosso todoList (tbody)    
    document.getElementById('tbody').appendChild(item)
}

// REMOVER ITEM por indice
function excluirNomes2(indice) {

    //Alerta de Exclusao (SweetAlert2)
    Swal.fire({
        text: "Excluir Nome?",
        icon: 'question',
        cancelButtonText: 'Não',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim'
    }).then((result) => {
        if (result.value) {
            const banco = getBanco()

            // Faça um splice (corte) no seu (banco que eh um array) do indice, so uma posicao
            banco.splice (indice, 1)

            // Set do splice no seu banco, permitir a persistencia dos dados
            setBanco(banco)

            // Atualiza tela
                
            if ($("#search").val() != "") {

                limparNomes()
        
                // Pega o Banco
                const banco = getBanco()
        
                //array
                var array2 = [];
        
                // Salva no array
                banco.forEach ( (item,indice) => {
                    if(item.name == $("#search").val()){
                        array2.push({
                            'name':item.name,
                            'indice' :indice,
                        });
                    }
                });
        
                // Pega e adiciona os dados para criaItem()
                array2.forEach ( (item, indice) => searchItem (item, indice));
        
            }else{
                atualizarTela();
            }
        }
    });
}

//Sortear Nomes
$(document).ready(function(){
    $(".luck").click(function(){

        // Pega o tamanho do todoList
        let length = JSON.parse(localStorage.getItem('todoList')).length;

        // Numero aleatório
        const number = Math.floor(Math.random() * length);

        // Pega o Banco
        const banco = getBanco()

        // Pega o determinado item, e tranforma em string
        let string = JSON.stringify(banco[number])

        // Transforma as strings em objetos
        const item = JSON.parse(string)

        // Exibe na tela o nome sorteado
        Swal.fire({
            text: 'Sorteando...',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading()
            },
        }).then((result) => {
            Swal.fire({
                title: 'O sorteado é:',
                html: '<center><h1>'+item.name+'</h2></center>',
                
            });
        });
    });
});
