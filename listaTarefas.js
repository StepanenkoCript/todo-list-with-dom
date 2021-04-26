const criarTarefa = (evento) => {
    const lista = document.querySelector(".list") // busca o elemento da <UL>
    const input = document.querySelector(".form-input"); // busca o elemento da caixa de texto
    const valor = input.value; // define o que será escrito na caixa de texto

    const tarefa = document.createElement('li'); // alem de métodos pra percorrer o dom, existe outros pra criar elementos no dom, como o createElement, e estamos criando uma <li>
    tarefa.classList.add('task') //adiciona a classe de CSS que ja tinha antes nessa LI

    const conteudo = `<p class="content">${valor}</p>`; //inclui parágrafo no conteudo da LI. Poderia apenas incluir o valor sem o parágrafo mas perderia a formatação do parágrafo e o estilo css que será usado posteriormente.
    tarefa.innerHTML = conteudo;

    tarefa.appendChild(BotaoDeleta());
    tarefa.appendChild(BotaoConclui()); // coloca o botão na hierarquia da LI e já chama ele "()" assim que eu crio uma nova tarefa
    //tarefa.insertBefore(BotaoConclui(),tarefa.childNodes[0]); // coloca o botão DELETE primeiro antes de tudo, da lista, e do outro botão (CARALHO MANO EU TO MTO FELIZ)

    lista.appendChild(tarefa); // o APPENDCHILD vai colocar sempre o item no fim do nó (elemento filho), ou seja, na proxima linha.
}

//const novaTarefa = document.querySelector(".form-button"); forma antiga que não valida o campo em branco
//novaTarefa.addEventListener('click', criarTarefa); forma antiga que não valida o campo em branco


document.getElementById("form").addEventListener("submit", (e) => { // pega o FORM (UL) e clia um "escutador" pra quando enviar
    e.preventDefault()    // evita que o UL dê um refresh na tela
    const input = document.getElementById("input") // const do input que vai criar a LI

    if (!input.value.trim()) {
        input.style.border = "solid 1px #ff0000"
        alert("Preencha o Input")
    } else {
    input.style.border = "solid 1px #000"
    criarTarefa(input.value)
    input.value = ""
    input.focus() 
    }
})

const BotaoConclui = () => { // criando um botão que irá concluir a tarefa e riscar ela assim que clicarmos
    const botaoConclui = document.createElement('button'); // cria um elemento button

    botaoConclui.classList.add('check-button'); // adicionamos a classe CSS
    botaoConclui.innerText = 'concluir'; // da um texto pro botão

    botaoConclui.addEventListener('click', concluirTarefa); // ao clicar, chama o const concluirTarefa abaixo

    return botaoConclui;
}

const concluirTarefa = (evento) => {
    const botaoConclui = evento.target; // eu quero saber em quem eu cliquei, isso porque vamos usar uma estratégia de subir um nó na arvore do DOM, pq vou colocar o estilo de rabisco na LI

    const tarefaCompleta = botaoConclui.parentElement; // pega o pai do elemento que eu cliquei, ou seja, o pai do botão. O pai do botão é a LI.

    tarefaCompleta.classList.toggle('done'); // o método toggle executa uma classe CSS a partir do momento que eu clicar no botão. Dá um booleano de verdadeiro ou falso.
}

const BotaoDeleta = () => {
    const botaoDeleta = document.createElement('button');

    botaoDeleta.classList.add('delete-button');
    botaoDeleta.innerText = 'deletar';

    botaoDeleta.addEventListener('click', deletarTarefa)

    return botaoDeleta;
}

const deletarTarefa = (evento) => {
    const botaoDeleta = evento.target;

    const tarefaCompleta = botaoDeleta.parentElement;

    tarefaCompleta.remove();
}





















