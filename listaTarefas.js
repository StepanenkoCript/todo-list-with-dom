const criarTarefa = (evento) => {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || []; //transforma tudo que é string em objeto denovo
    const input = document.querySelector(".form-input"); // busca o elemento da caixa de texto
    const valor = input.value; // define o que será escrito na caixa de texto

    const calendario = document.querySelector(".form-date") // busca o elemento do calendario
    const data = moment(calendario.value) // pegar o valor que foi definido no calendario
    const horario = data.format('HH:mm')
    const dataFormatada = data.format('DD/MM') // formato de como aparecerá a data

    const concluida = false

    const dados = { // criei uma nova const com os valores que preciso pra sessionStorage e stringify
        valor,
        dataFormatada,
        horario,
        concluida
    }

    const tarefasAtualizadas = [...tarefas, dados]; //cria um array com o que foi digitado no const dados e tarefas

    localStorage.setItem("tarefas", JSON.stringify(tarefasAtualizadas)) // transforma objetos em strings e armazena no navegador

    carregaTarefa()
}

const removeDatasRepetidas = (datas) => {
    const datasUnicas = []
    datas.forEach((data => {
        if (datasUnicas.indexOf(data.dataFormatada) === -1) {
            datasUnicas.push(data.dataFormatada)
        }
    }))
    return datasUnicas
}

const ordenaDatas = (data) => {
    data.sort((a, b) => {
        const primeiraData = moment(a, 'DD/MM/YYY').format('YYYYMMDD')
        const segundaData = moment(b, 'DD/MM/YYY').format('YYYYMMDD')
        return primeiraData - segundaData
    })
}

const Tarefa = ({ valor, horario, concluida }, id) => {
    const tarefa = document.createElement('li') // alem de métodos pra percorrer o dom, existe outros pra criar elementos no dom, como o createElement, e estamos criando uma <li>

    const conteudo = `<div class="divp">${horario} - ${valor}</div>`; //inclui parágrafo no conteudo da LI. Poderia apenas incluir o valor sem o parágrafo mas perderia a formatação do parágrafo e o estilo css que será usado posteriormente.
    if (concluida) {
        tarefa.classList.add('done')//adiciona a classe de CSS que ja tinha antes nessa LI
    }

    tarefa.classList.add('task')
    tarefa.innerHTML = conteudo

    tarefa.appendChild(BotaoConclui(carregaTarefa, id));
    tarefa.appendChild(BotaoDeleta(carregaTarefa, id)); // coloca o botão na hierarquia da LI e já chama ele "()" assim que eu crio uma nova tarefa

    return tarefa
}

const carregaTarefa = () => {
    const lista = document.querySelector(".list");

    const tarefasCadastradas = JSON.parse(localStorage.getItem('tarefas')) || [];
    lista.innerHTML = ""
    const datasUnicas = removeDatasRepetidas(tarefasCadastradas)
    ordenaDatas(datasUnicas)
    datasUnicas.forEach((dia) => {
        lista.appendChild(criaData(dia))
    })
}

const criaData = (data) => {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
    const dataMoment = moment(data, 'DD/MM/YYY')
    const dataTopo = document.createElement('li')
    const conteudo = `<p class="content-data">${dataMoment.format('DD/MM/YYYY')}</p>`

    dataTopo.innerHTML = conteudo

    tarefas.forEach(((tarefa, id) => {
        const dia = moment(tarefa.dataFormatada, 'DD/MM/YYY')
        const diff = dataMoment.diff(dia)
        if (diff === 0) {
            dataTopo.appendChild(Tarefa(tarefa, id))
        }
    }))

    return dataTopo

}


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

const BotaoConclui = (atualiza, id) => { // criando um botão que irá concluir a tarefa e riscar ela assim que clicarmos
    const botaoConclui = document.createElement('button'); // cria um elemento button

    botaoConclui.classList.add('check-button'); // adicionamos a classe CSS    
    botaoConclui.innerText = 'done'; // da um texto pro botão

    botaoConclui.addEventListener('click', () => concluirTarefa(atualiza, id)); // ao clicar, chama o const concluirTarefa abaixo

    return botaoConclui;
}

const concluirTarefa = (atualiza, id) => {
    const tarefasCadastradas = JSON.parse(localStorage.getItem('tarefas'))

    tarefasCadastradas[id].concluida = !tarefasCadastradas[id].concluida
    localStorage.setItem('tarefas', JSON.stringify(tarefasCadastradas))

    atualiza()

}

const BotaoDeleta = (atualiza, id) => {
    const botaoDeleta = document.createElement('button');

    botaoDeleta.classList.add('delete-button');
    botaoDeleta.innerText = 'del';

    botaoDeleta.addEventListener('click', () => deletarTarefa(atualiza, id))

    return botaoDeleta;
}

const deletarTarefa = (atualiza, id) => {
    const index = id
    const tarefasCadastradas = JSON.parse(localStorage.getItem('tarefas'))
    tarefasCadastradas.splice(index, 1)
    localStorage.setItem('tarefas', JSON.stringify(tarefasCadastradas))
    atualiza()

}

carregaTarefa()





















